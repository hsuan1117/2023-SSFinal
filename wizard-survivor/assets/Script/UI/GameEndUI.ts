import GameManager from "../Manager/GameManager";
import InputManager, {Input, InputType} from "../Manager/InputManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameEndUI extends cc.Component {
    private anim: cc.Animation;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        this.anim.play('GameEndUIHide');
        // this.node.getChildByName('ContinueHint').opacity = 0;
    }

    slowlyShowUp() {
        return new Promise<void>((resolve, reject) => {
            this.node.setSiblingIndex(1000);
            this.anim.play('GameEndUIShow');
            this.anim.on('finished', () => {
                this.waitForContinue()
                    .then(resolve)
            }, this);
        });
    }

    private async waitForContinue() {
        console.log('waitForContinue')
        this.node.getChildByName('ContinueHint').getComponent(cc.Animation).play('ContinueHintFlicker')
        return new Promise<void>((resolve, reject) => {
            function onInput(input: Input){
                if (input.type === InputType.BUTTON_DOWN && input.btnCode === 'A') {
                    resolve();
                    GameManager.instance.inputManager.event.off(InputManager.ON_LOCAL_INPUT, onInput, this);
                }
            }
            GameManager.instance.inputManager.event.on(InputManager.ON_LOCAL_INPUT, onInput, this);
        })
    }
}
