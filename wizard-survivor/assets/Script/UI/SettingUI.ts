import GameManager from "../Manager/GameManager";
import InputManager, {Input, InputType} from "../Manager/InputManager";
import PlayerController from "../Controller/PlayerController";
import PlayerFocus from "./PlayerFocus";
import {ignoreZ} from "../Helper/utils";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingUI extends cc.Component {

    private isOn: boolean = false;
    private command: { [name: string]: () => void } = {};
    private isCollide: { [uid: string]: boolean } = {};
    private settingPopUp: cc.Node = null;
    private playerFocus: PlayerFocus = null;
    private _toFocus: string[] = ['Exit', 'ToggleMusic', 'ToggleSoundEffect'];
    private _interactableHint: cc.Node = null;

    private _bgmVolume: number = 0;
    private _soundEffectVolume: number = 0;

    onLoad() {
        this._interactableHint = this.node.getChildByName('InteractableHint');
        this._interactableHint.opacity = 0;
        this.settingPopUp = this.node.getChildByName('SettingPopUp');
        this.playerFocus = this.node.getComponent(PlayerFocus);
        this.playerFocus.init(
            this._toFocus.map(name => this.settingPopUp.getChildByName(name)),
            cc.v2(80, 5).add(ignoreZ(this.settingPopUp.position)),
            false
        )
    }

    onEnable() {
        GameManager.instance.inputManager.event.on(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }

    onDisable() {
        GameManager.instance.inputManager.event.on(InputManager.ON_LOCAL_INPUT, this.onInput, this);
    }


    onDestroy() {
        GameManager.instance.inputManager.event.off(
            InputManager.ON_INPUT, this.onInput, this
        )
    }

    start() {
        this.playerFocus.event.on(PlayerFocus.ON_CONFIRM, this.onConfirm, this);

        this.command['Exit'] = () => {
            this.popDown();
        }
        this.command['ToggleMusic'] = () => {
            GameManager.instance.audioManager.bgmVolume = (
                GameManager.instance.audioManager.bgmVolume == 0 ? 1 : 0
            );
        }
        this.command['ToggleSoundEffect'] = () => {
            GameManager.instance.audioManager.effectVolume = (
                GameManager.instance.audioManager.effectVolume == 0 ? 1 : 0
            );
        }
        this.popDown();
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.getComponent(PlayerController);
        if (player) {
            this.isCollide[player.uid] = true;
            this._interactableHint.opacity = 255;
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.getComponent(PlayerController);
        if (player) {
            this.isCollide[player.uid] = false;
            this._interactableHint.opacity = 0;
        }
    }

    private onInput(input: Input) {
        // console.log('SettingUI onInput', input)
        // console.log('is Local', GameManager.instance.playerManager.isLocal(input.uid));
        // if (!GameManager.instance.playerManager.isLocal(input.uid))
        //     return;
        if (!this.isCollide[input.uid])
            return;
        if ((!this.isOn) && input.type == InputType.BUTTON_DOWN && input.btnCode == 'A')
            this.popUp()
    }

    private onConfirm({node}: { node: cc.Node }) {
        this.command[node.name]();
    }

    private popDown() {
        GameManager.instance.resumeGame();
        for (let uid of GameManager.instance.localUids) {
            this.playerFocus.removeFocus(uid);
        }
        this.isOn = false;
        this.settingPopUp.opacity = 0
    }

    private popUp() {
        this.isOn = true;
        this.settingPopUp.opacity = 255;
        for (let uid of GameManager.instance.localUids) {
            this.playerFocus.focusOnIndex(uid, 1);
        }
        GameManager.instance.pauseGame();
    }


    /*
    onInput(input):
        if not local:
            return
        if is not collide with user that pressed button (test aabb):
            return
        if input.isApresseed && is off:
            this.popUp();
     */

    /*
    onConfirm({node}):
        this.command[node.name]()
     */

    /*
    this.popUp():
        this.isOn = true;
        this.node.active = true;

     */
}
