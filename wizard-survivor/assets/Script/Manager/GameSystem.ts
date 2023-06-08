export class GameSystem {

    public event: cc.EventTarget;

    /* 事件：玩家獲得 Buff
    passed event data: {uid: string, buffId: string} */
    public static readonly ON_BUFF_APPLY: string = "ON_BUFF_ADD";

    constructor() {
        this.event = new cc.EventTarget();
    }

    public emitApplyBuff(uid: string, buffId: string): void {
        this.event.emit(GameSystem.ON_BUFF_APPLY, {uid: uid, buffId: buffId});
    }
}

class RemoteGameSystem {

}
