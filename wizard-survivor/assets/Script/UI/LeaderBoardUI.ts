import {api} from "../Helper/utils";
import GameManager from "../Manager/GameManager";
import InputManager, {Input, InputType} from "../Manager/InputManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderBoardUI extends cc.Component {
    /**
     * @description 排行榜數據
     * @param queryLimit {number} - 查詢數量
     * @return {Promise<UserData>}
     * */
    public async getScoreBoard(queryLimit = 8) {
        return await api("GET", `/scoreboard?limit=${queryLimit}`)
    }

    onLoad() {

    }

    onEnable() {
        GameManager.instance.inputManager.event.on(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }

    onDisable() {
        GameManager.instance.inputManager.event.off(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }

    start() {

    }

    // HELPERS
    private onInput(input: Input) {
        if (input.type == InputType.BUTTON_DOWN && input.btnCode === 'A') {
            // GameManager.instance.changeScene(GameManager.SCENE_LOBBY);
        }
    }
}
