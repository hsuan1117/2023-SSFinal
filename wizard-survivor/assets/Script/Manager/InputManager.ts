const {ccclass, property} = cc._decorator;

export enum InputType {
    STICK = 'STICK',
    BUTTON_DOWN = 'BUTTON_DOWN',
    BUTTON_UP = 'BUTTON_UP'
}

export class Input {
    public uid: string

    public type: InputType

    /* 其中之一： "X" | "Y" | "A" | "B" */
    public btnCode: string

    /* L 搖桿向量 x 座標，0 ~ 1000 的整數 */
    public lX: number

    /* L 搖桿向量 y 座標，0 ~ 1000 的整數 */
    public lY: number

    constructor(uid: string, type: InputType, btnCode: string, lX: number, lY: number) {
        this.uid = uid
        this.type = type
        this.btnCode = btnCode
        this.lX = Math.ceil(lX)
        this.lY = Math.ceil(lY)
    }

    public toString(): string {
        return `uid: ${this.uid}, type: ${this.type}, btnCode: ${this.btnCode}, LXScaleBy1000: ${this.lX}, LYScaleBy1000: ${this.lY}`
    }

    public serialize(): string {
        return JSON.stringify(this)
    }
}

export type ControllerConversion = { [keyCode: number]: string }

export const WASD_TO_CONTROLLER: ControllerConversion = {
    [cc.macro.KEY.w]: 'L_UP',
    [cc.macro.KEY.s]: 'L_DOWN',
    [cc.macro.KEY.a]: 'L_LEFT',
    [cc.macro.KEY.d]: 'L_RIGHT',
    [cc.macro.KEY.space]: 'A'
}

export const ARROW_TO_CONTROLLER: ControllerConversion = {
    [cc.macro.KEY.up]: 'L_UP',
    [cc.macro.KEY.down]: 'L_DOWN',
    [cc.macro.KEY.left]: 'L_LEFT',
    [cc.macro.KEY.right]: 'L_RIGHT',
    [cc.macro.KEY.enter]: 'A'
}


@ccclass
export default class InputManager extends cc.Component {
    public event: cc.EventTarget = new cc.EventTarget();

    /*
    此為 Input Manager 的事件型別

    在任何輸入發生時 emit

    callbackFn: (input: Input) => void
    */
    public static readonly ON_INPUT: string = "ON_INPUT";

    private conversionOfUid: Map<string, { [keyCode: number]: string }> = new Map();
    private _currentLStick: Map<string, cc.Vec2> = new Map();
    private _isPressing: Map<string, Map<string, boolean>> = new Map();


    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.event.on(InputManager.ON_INPUT, (input: Input) => {
            console.log(input.toString())
            // console.log(Object.fromEntries(this._isPressing.get(input.uid)))
        }, this);
    }

    // PUBLIC METHODS:
    /*
     * @param playerConversion: { [uid: string]: ControllerConversion } - 每個本地玩家的鍵盤 - 控制器對應表
     */
    public init(playerConversion: { [uid: string]: ControllerConversion }) {
        for (const [uid, conversion] of Object.entries(playerConversion)) {
            this.conversionOfUid.set(uid, conversion);
            this._currentLStick.set(uid, cc.v2(0, 0));
            this._isPressing.set(
                uid,
                new Map([['X', false], ['Y', false], ['A', false], ['B', false], ['L_UP', false], ['L_DOWN', false], ['L_LEFT', false], ['L_RIGHT', false]])
            );
        }
    }

    /*
    回傳該使用者的某個 btnCode 是否按下，
    btnCode 可為 'X' | 'Y' | 'A' | 'B'
     */
    public isPressing(uid: string, btnCode: string): boolean {
        return this._isPressing.get(uid).get(btnCode)?? false;
    }

    /*
    回傳該使用者現在的搖桿方向
    回傳值為 cc.Vec2，x 與 y 座標皆為 0 ~ 1000
     */
    public lStick(uid: string): cc.Vec2 {
        return this._currentLStick.get(uid);
    }


    // HELPERS:
    private onKeyDown({keyCode}) {
        for (const [uid, conversion] of this.conversionOfUid) {
            if (!conversion[keyCode]) continue;
            if (this._isPressing.get(uid).get(conversion[keyCode])) continue;

            this._isPressing.get(uid).set(conversion[keyCode], true)

            if (conversion[keyCode] == 'A' || conversion[keyCode] == 'B' || conversion[keyCode] == 'X' || conversion[keyCode] == 'Y') {
                this.event.emit(
                    InputManager.ON_INPUT,
                    new Input(uid, InputType.BUTTON_DOWN, conversion[keyCode], 0, 0)
                )
            } else if (conversion[keyCode] == 'L_UP' || conversion[keyCode] == 'L_DOWN' || conversion[keyCode] == 'L_LEFT' || conversion[keyCode] == 'L_RIGHT') {
                this.updateStick(uid);
                this.event.emit(
                    InputManager.ON_INPUT,
                    new Input(uid, InputType.STICK, '', this._currentLStick.get(uid).x, this._currentLStick.get(uid).y)
                )
            }
        }
    }

    private onKeyUp({keyCode}) {
        // console.log("!!!! KeyUp !!!!")

        for (const [uid, conversion] of this.conversionOfUid) {
            // console.log(`uid: ${uid}, keycode: ${keyCode}, conversion: `, conversion)
            if (!conversion[keyCode]) continue;

            this._isPressing.get(uid).set(conversion[keyCode], false)
            // console.log(`set ${conversion[keyCode]} to false, this Key is Pressed: ${this._isPressing.get(uid).get(conversion[keyCode])}`)

            if (conversion[keyCode] == 'A' || conversion[keyCode] == 'B' || conversion[keyCode] == 'X' || conversion[keyCode] == 'Y') {
                this.event.emit(
                    InputManager.ON_INPUT,
                    new Input(uid, InputType.BUTTON_UP, conversion[keyCode], 0, 0)
                )
            } else if (conversion[keyCode] == 'L_UP' || conversion[keyCode] == 'L_DOWN' || conversion[keyCode] == 'L_LEFT' || conversion[keyCode] == 'L_RIGHT') {
                this.updateStick(uid);
                this.event.emit(
                    InputManager.ON_INPUT,
                    new Input(uid, InputType.STICK, '', this._currentLStick.get(uid).x, this._currentLStick.get(uid).y)
                )
            }
        }
    }

    private updateStick(uid: string) {
        this._currentLStick.get(uid).x =
            (-this._isPressing.get(uid).get('L_LEFT')) +
            (+this._isPressing.get(uid).get('L_RIGHT'));
        this._currentLStick.get(uid).y =
            (-this._isPressing.get(uid).get('L_DOWN')) +
            (+this._isPressing.get(uid).get('L_UP'));
        this._currentLStick.get(uid).normalizeSelf().mulSelf(1000);
    }
}
