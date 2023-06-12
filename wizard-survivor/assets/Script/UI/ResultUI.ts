// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import InputManager, {Input, InputType} from "../Manager/InputManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResultUI extends cc.Component {

    private coinLabel: cc.Label = null;

    onLoad() {
        this.coinLabel = this.node.getChildByName('Coin')
            .getChildByName("CoinLabel").getComponent(cc.Label);
    }

    onEnable() {
        GameManager.instance.inputManager.event.on(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }

    onDisable() {
        GameManager.instance.inputManager.event.off(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }

    start() {
        this.coinLabel.string = `X ${GameManager.instance.coinCnt.value}`;
    }


    // HELPERS
    private onInput(input: Input) {
        if (input.type == InputType.BUTTON_DOWN && input.btnCode === 'A') {
            GameManager.instance.changeScene(GameManager.SCENE_LOBBY);
        }
    }
}
