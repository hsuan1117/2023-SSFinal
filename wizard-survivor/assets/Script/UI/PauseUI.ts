import GameManager from "../Manager/GameManager";
import InputManager, {Input, InputType} from "../Manager/InputManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PauseUI extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onEnable() {
        GameManager.instance.inputManager.event.on(InputManager.ON_LOCAL_INPUT, this.onLocalInput, this);
    }

    onDisable() {
        GameManager.instance.inputManager.event.off(InputManager.ON_LOCAL_INPUT, this.onLocalInput, this);
    }

    start() {
        this.updateUI();
    }

    private onLocalInput(input: Input) {
        if (input.type == InputType.BUTTON_DOWN && input.btnCode === 'B'){
            if (GameManager.instance.isPaused)
                GameManager.instance.resumeGame();
            else
                GameManager.instance.pauseGame();
            this.updateUI();
        }
    }

    private updateUI() {
        if (GameManager.instance.isPaused)
            this.node.opacity = 255;
        else
            this.node.opacity = 0;
    }
}
