import GameManager from "./GameManager";
import PlayerController from "../Controller/PlayerController";
import InputManager, {Input, InputType} from "./InputManager";

const {ccclass, property} = cc._decorator;

/*
1. 管理所有 Player Instance
2. 提供靜態的方法取得 Player Instance
 */
@ccclass
export default class PlayerManager extends cc.Component {
    public event: cc.EventTarget = new cc.EventTarget();
    public static PLAYER_CREATED: string = 'PLAYER_CREATED';

    public get allPlayerIDs(): string[]{
        return Object.keys(this.players);
    }

    private players: {[id: string]: PlayerController} = {};


    // LIFE-CYCLE CALLBACKS:
    start () {
        // listen to Input Manager
        GameManager.instance.inputManager.event.on(InputManager.ON_INPUT, this.onInput, this);
    }


    // PUBLIC METHODS
    public getPlayerNodeByID(id: string): cc.Node{
        return this.players[id].node;
    }

    public getPlayer(id: string): PlayerController{
        return this.players[id];
    }

    /*
    實例化一個 Player，設定主武器和 Buff，並加入場景樹
     */
    public createPlayer(id: string){
        cc.resources.load('Prefab/Player', cc.Prefab, (err, prefab) => {
            const player = (cc.instantiate(prefab) as unknown as cc.Node).getComponent(PlayerController);
            player.node.parent = GameManager.instance.node;
            this.players[id] = player;
            this.event.emit(PlayerManager.PLAYER_CREATED, id);
        });
    }


    // HELPERS
    private onInput(input: Input){
        if (input.type == InputType.STICK){
            this.players[input.uid].setMovingDir(cc.v2(input.lX/1000, input.lY/1000));
        }
        else if (input.type == InputType.BUTTON_DOWN){
            if (input.btnCode == 'A'){
                this.players[input.uid].dash();
            }
        }
    }
}
