import {api} from "../Helper/utils";
import GameManager from "../Manager/GameManager";
import InputManager, {Input, InputType} from "../Manager/InputManager";
import PlayerController from "../Controller/PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderBoardUI extends cc.Component {

    private _interactableHint: cc.Node = null;;
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

    onLoad() {
        this._leaderBoard = this.node.getChildByName('Leaderboard');
        this._interactableHint = this.node.getChildByName('InteractableHint');
        this._interactableHint.opacity = 0;
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
            this._isCollide[player.uid] = true;
            this._interactableHint.opacity = 0;
        }
    }

    // HELPERS
    private onInput(input: Input) {
        if (!this._isCollide[input.uid]) return;
        if (input.type != InputType.BUTTON_DOWN) return;

        if ((!this._isOn)) this.popUp();
        else this.popDown();
    }

    private popUp(){
        this._isOn = true;
        this._leaderBoard.opacity = 255;
        // GameManager.instance.pauseGame();
    }

    private popDown(){
        this._isOn = false;
        this._leaderBoard.opacity = 0;
        // GameManager.instance.resumeGame();
    }
}
