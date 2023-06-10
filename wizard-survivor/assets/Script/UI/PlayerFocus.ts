import InputManager, {Input} from "../Manager/InputManager";
import GameManager from "../Manager/GameManager";
import {Direction, padZ} from "../Helper/utils";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

/*
init with nodes to be focus

listen onInput
    emit event: confirm, uid, node
    select left
    select right

focus on (uid, node)
remove focus(uid)
 */

@ccclass
export default class PlayerFocus extends cc.Component {
    public event: cc.EventTarget;
    /*
    某位使用者按下 A 鍵 confirm
    callbackFn({uid: string, node: cc.Node}): void
     */
    public static readonly ON_CONFIRM: string = "CONFIRM";

    private readonly SPACING_Y: number = 0;

    private focusTarget: cc.Node[];
    private pointerContainer: {[tid: number]: cc.Node};
    private focus: {[uid: string]: number};
    private pointer: {[uid: string]: cc.Node};
    private isLock: {[uid: string]: boolean} = {};


    onLoad() {
        this.event = new cc.EventTarget();
        GameManager.instance.inputManager.event.on(InputManager.ON_INPUT, this.onInput, this);
    }

    onDestroy() {
        GameManager.instance.inputManager.event.off(InputManager.ON_INPUT, this.onInput, this);
    }

    public init(focusTarget: cc.Node[], offSet: cc.Vec2, sortByPosition=false){
        this.focus = {};
        this.focusTarget = [...focusTarget];
        this.pointerContainer = {};
        this.pointer = {};
        this.isLock = {};
        if (sortByPosition){
            this.focusTarget.sort((a, b) => {
                if (a.position.x < b.position.x) return -1;
                if (a.position.y < b.position.y) return -1;
                return 0;
            })
        }


        for (let tid in this.focusTarget){
            this.pointerContainer[tid] = new cc.Node(`PointerContainer${tid}`);

            const layout = this.pointerContainer[tid].addComponent(cc.Layout);
            layout.type = cc.Layout.Type.VERTICAL
            layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
            layout.spacingY = this.SPACING_Y;

            this.pointerContainer[tid].parent = this.node;
            this.pointerContainer[tid].setPosition(this.focusTarget[tid].position.add(padZ(offSet)));
            this.pointerContainer[tid].group = 'FixedUI';
        }
    }

    public focusOnNode(uid: string, node: cc.Node){
        for (let tid in this.focusTarget){
            if (this.focusTarget[tid] === node){
                this.focus[uid] = parseInt(tid);
                break;
            }
        }
        this.updateView();
    }

    public focusOnIndex(uid: string, tid: number) {
        this.focus[uid] = tid;
        this.isLock[uid] = false;
        this.updateView();
    }

    public removeFocus(uid: string){
        delete this.focus[uid];
        this.pointer[uid].destroy();
        delete this.pointer[uid];
        delete this.isLock[uid];
        this.updateView();
    }

    public removeFocusAll(){
        for (let uid in this.focus){
            this.removeFocus(uid);
        }
    }

    public lock(uid: string) {
        this.isLock[uid] = true;
        if (!this.pointer){
            this.pointer[uid] = new cc.Node(`Pointer${uid}`);
        }
        const label =  this.pointer[uid].addComponent(cc.Label);
        label.string = `<<${uid}>>`;
        label.fontSize = 10;
        label.lineHeight = 0;
        label.node.color = cc.Color.BLACK;
        this.updateView();
    }

    private onInput(input: Input){
        if (!this.focus.hasOwnProperty(input.uid)) return;

        if (this.isLock[input.uid]) return;

        const uid = input.uid;
        const dir = InputManager.lrOfStick(cc.v2(input.lX, input.lY));

        if (input.btnCode === 'A'){
            this.event.emit(PlayerFocus.ON_CONFIRM, {uid: uid, node: this.focusTarget[this.focus[uid]]});
        } else if (dir == Direction.LEFT){
            this.focus[uid] = (this.focus[uid] - 1 + this.focusTarget.length) % this.focusTarget.length;
            this.updateView();
        } else if (dir == Direction.RIGHT){
            this.focus[uid] = (this.focus[uid] + 1) % this.focusTarget.length;
            this.updateView();
        }
    }

    private updateView(){
        for (let uid in this.focus){
            if (!this.pointer[uid]){
                this.pointer[uid] = new cc.Node(`Pointer${uid}`);
                const label =  this.pointer[uid].addComponent(cc.Label);
                label.string = `<  ${uid}  >`;
                label.fontSize = 10;
                label.lineHeight = 0;
                label.node.color = cc.Color.RED;
            }
            this.pointer[uid].parent = this.pointerContainer[this.focus[uid]];
            this.pointer[uid].setPosition(0, 0);
            this.pointerContainer[this.focus[uid]].getComponent(cc.Layout).updateLayout()
        }
    }
}
