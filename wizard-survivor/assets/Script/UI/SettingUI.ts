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

    onLoad() {
        this.settingPopUp = this.node.getChildByName('SettingPopUp');
        this.playerFocus = this.node.getComponent(PlayerFocus);
        this.playerFocus.init(
            this.settingPopUp.children,
            cc.v2(0, 20).add(ignoreZ(this.settingPopUp.position)),
            true
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
            // TODO: toggle music
            console.log('In Setting: ToggleMusic')
        }
        this.command['ToggleSoundEffect'] = () => {
            // TODO: toggle sound effect
            console.log('In Setting: ToggleSoundEffect')
        }
        this.popDown();
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.getComponent(PlayerController);
        if (player) {
            this.isCollide[player.uid] = true;
            console.log(`SettingUI collide with ${player.uid}`)
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.getComponent(PlayerController);
        if (player) {
            this.isCollide[player.uid] = false;
            console.log(`SettingUI end collide with ${player.uid}`)
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
        for (let uid of GameManager.instance.playerManager.localUids) {
            this.playerFocus.removeFocus(uid);
        }
        this.isOn = false;
        this.settingPopUp.active = false;
    }

    private popUp() {
        this.isOn = true;
        this.settingPopUp.active = true;
        for (let uid of GameManager.instance.playerManager.localUids) {
            this.playerFocus.focusOnIndex(uid, 0);
        }
        console.log('Local Uids', GameManager.instance.playerManager.localUids)
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
