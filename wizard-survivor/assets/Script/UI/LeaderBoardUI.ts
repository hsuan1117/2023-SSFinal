import {api} from "../Helper/utils";
import GameManager from "../Manager/GameManager";
import InputManager, {Input, InputType} from "../Manager/InputManager";
import PlayerController from "../Controller/PlayerController";
import {GameStartType} from "./MainMenuUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderBoardUI extends cc.Component {

    private _interactableHint: cc.Node = null;
    private _leaderBoard: cc.Node = null;
    private _isCollide: { [uid: string]: boolean } = {};
    private _isOn: boolean = false;

    /**
     * @description 排行榜數據
     * @param queryLimit {number} - 查詢數量
     * @return {Promise<UserData>}
     * */
    public async getScoreBoard(queryLimit = 8) {
        return await api("GET", `/scoreboard?limit=${queryLimit}`)
    }

    async onLoad() {
        this._leaderBoard = this.node.getChildByName('Leaderboard');
        this._interactableHint = this.node.getChildByName('InteractableHint');
        this._interactableHint.opacity = 0;
        this._leaderBoard.getChildByName('Coin').getChildByName("CoinIcon").opacity = 0;
        if (GameManager.instance.gameSystem.gameInfo.gameType === 0) {
            let rank = (await this.getScoreBoard()).map((userData: any) => (
                `[${userData.email.split("@")[0].padEnd(8, " ")}] 最高等級 ${userData.level} | ${new Date(userData.updated_at).toLocaleDateString()}`
            ));
            if (rank.length > 8) rank = rank.slice(0, 8);
            this._leaderBoard.getChildByName('Coin').getChildByName("CoinLabel").getComponent(cc.Label).string = rank.join('\n');
        } else {
            let rank = JSON.parse(localStorage.getItem('gameHistory') ?? '{}').sort(x => x.level).map((record: any) => (
                `[離線模式    ] 最高等級 ${record.level} | ${new Date(record.created_at).toLocaleDateString()}`
            ));
            if (rank.length > 8) rank = rank.slice(0, 8);
            this._leaderBoard.getChildByName('Coin').getChildByName("CoinLabel").getComponent(cc.Label).string = rank.join('\n');

        }
    }

    onEnable() {
        GameManager.instance.inputManager.event.on(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }

    onDisable() {
        GameManager.instance.inputManager.event.off(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }

    start() {
        this.popDown();
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.node.getComponent(PlayerController);
        if (player) {
            this._isCollide[player.uid] = true;
            this._interactableHint.opacity = 255;
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.node.getComponent(PlayerController);
        if (player) {
            this._isCollide[player.uid] = false;
            this._interactableHint.opacity = 0;
        }
    }

    // HELPERS
    private onInput(input: Input) {
        if (!this._isOn && this._isCollide[input.uid] && input.type == InputType.BUTTON_DOWN && input.btnCode == 'A')
            this.popUp();
        else if (this._isOn && input.type == InputType.BUTTON_DOWN && input.btnCode == 'A')
            this.popDown();
    }

    private popUp() {
        this._isOn = true;
        this._leaderBoard.opacity = 255;
        // GameManager.instance.pauseGame();
    }

    private popDown() {
        this._isOn = false;
        this._leaderBoard.opacity = 0;
        // GameManager.instance.resumeGame();
    }
}
