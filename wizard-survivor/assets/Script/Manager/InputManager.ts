const {ccclass, property} = cc._decorator;

@ccclass
export default class InputManager extends cc.Component {
    public event: cc.EventTarget = new cc.EventTarget();
    private isPressing: {} = {};

    public isKeyPressing(keyCode: number): boolean{
        return this.isPressing[keyCode];
    }

    onLoad(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e)=>{
            this.event.emit(cc.SystemEvent.EventType.KEY_DOWN, e);
            this.isPressing[e.keyCode] = true;
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e)=>{
            this.event.emit(cc.SystemEvent.EventType.KEY_UP, e);
            this.isPressing[e.keyCode] = false;
        }, this);
    }
}
