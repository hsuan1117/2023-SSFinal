import Game = cc.Game;

export class GameSystem {

    // === Define Events ===
    public event: cc.EventTarget;

    /* 事件：玩家獲得 Buff
    passed event data: {uid: string, buffId: string} */
    public static readonly ON_BUFF_APPLY: string = "ON_BUFF_ADD";

    /*事件：玩家 HP 改變
    passed event data: {uid: string, deltaHP: number}
     */
    public static readonly ON_PLAYER_HP_CHANGE: string = "ON_PLAYER_HP_CHANGE";


    constructor() {
        this.event = new cc.EventTarget();
    }


    // === PUBLIC METHODS ===
    public emitApplyBuff(uid: string, buffId: string): void {
        this.event.emit(GameSystem.ON_BUFF_APPLY, {uid: uid, buffId: buffId});
    }

    public emitPlayerHPChange(uid: string, deltaHP: number): void{
        this.event.emit(GameSystem.ON_PLAYER_HP_CHANGE, {uid: uid, deltaHP: deltaHP});
    }
}

class RemoteGameSystem extends GameSystem{

}
