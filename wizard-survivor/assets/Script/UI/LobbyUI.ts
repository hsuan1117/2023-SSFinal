import PlayerFocus from "./PlayerFocus";
import PlayerController from "../Controller/PlayerController";
import GameManager from "../Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LobbyUI extends cc.Component {

    public event: cc.EventTarget;
    public static readonly ON_CHARA_CHOSEN: string = "onCharaChosen";

    private previewCharas: cc.Node[] = [];
    private playerFocus: PlayerFocus = null;
    private chooseResult: { [uid: string]: string } = {};
    private uids: string[] = [];

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.event = new cc.EventTarget();
        this.playerFocus = this.node.getComponent(PlayerFocus);
    }


    // PUBLIC METHODS:
    public init(uids: string[]) {
        this.uids = [...uids];
        for (let chara of this.node.children) {
            if (chara.getComponent(PlayerController))
                this.previewCharas.push(chara);
        }
    }

    public chooseCharaFor(): Promise<void> {
        if (!this.uids || this.uids.length == 0) {
            return Promise.reject("No uid to choose");
        }

        console.log('LobbyUI.previewCharas', this.previewCharas);
        console.log('LobbyUI.uids', this.uids);

        this.playerFocus.init(this.previewCharas, cc.v2(0, 20), true);

        for (let uid of this.uids) {
            this.playerFocus.focusOnIndex(uid, 0);
        }

        console.log('LobbyUI.chooseCharaFor, uids', this.uids);

        let chooseResult = {};

        return new Promise(resolve => {
            this.playerFocus.event.on(PlayerFocus.ON_CONFIRM, ({uid, node}) => {
                for (let res of Object.values(chooseResult)) {
                    if (res == node.name)
                        return;
                }

                this.playerFocus.lock(uid);
                chooseResult[uid] = node.name;

                if (Object.keys(chooseResult).length == this.uids.length) {
                    this.playerFocus.removeFocusAll();
                    this.chooseResult = chooseResult;
                    resolve();
                }
            })
        });
    }

    public async createCharaFromChooseResult() {
        let promises = [];
        for (let uid of this.uids) {
            GameManager.instance.playerManager.createPlayerLocally(uid, this.chooseResult[uid]);
            promises.push(
                GameManager.instance.playerManager.instantiatePlayer(uid)
                    .then((player) => {
                        for (let chara of this.previewCharas) {
                            if (chara.name == this.chooseResult[uid]) {
                                player.node.position = chara.position;
                                chara.destroy();
                                break;
                            }
                        }
                    })
            );
        }
        await Promise.all(promises);
    }
}