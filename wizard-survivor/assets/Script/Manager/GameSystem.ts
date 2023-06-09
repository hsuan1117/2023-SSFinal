import Game = cc.Game;
import {Input} from "./InputManager";
import GameManager from "./GameManager";

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

    /*事件：玩家經驗值改變

    passed event data: {deltaExp: number} */
    public static readonly ON_EXP_CHANGE: string = "ON_EXP_CHANGE";

    /*事件：玩家金幣改變

    passed event data: {deltaCoin: number} */
    public static readonly ON_COIN_CHANGE: string = "ON_COIN_CHANGE";

    /*事件：玩家輸入

    passed event data: {input: Input} */
    public static readonly ON_INPUT: string = "ON_INPUT";

    /*事件：玩家創建

    注意！！！這個事件會廣播給所有 client，但是只有 remote client 需要處理這個事件

    passed event data: {uid: string, charaId: string}
     */
    public static readonly ON_CREATE_PLAYER: string = "ON_CREATE_PLAYER";

    /*事件：遊戲開始

    passed event data: null
     */
    public static readonly ON_GAME_START: string = "ON_GAME_START";

    private buffReadyToApply: {uid: string, buffId: string}[] = [];

    constructor() {
        this.event = new cc.EventTarget();
    }


    // === PUBLIC METHODS ===
    public emitApplyBuff(uid: string, buffId: string): void {
        console.log('buffReadyToApply: ', this.buffReadyToApply);

        this.buffReadyToApply.push({uid: uid, buffId: buffId});

        // TODO: GameSystem should not know how many players there are
        if (this.buffReadyToApply.length >= GameManager.instance.playerManager.allPlayerIDs.length) {
            for (let bf of this.buffReadyToApply){
                this.event.emit(GameSystem.ON_BUFF_APPLY, bf);
            }
            this.buffReadyToApply = [];
        }
    }

    public emitPlayerHPChange(uid: string, deltaHP: number): void{
        this.event.emit(GameSystem.ON_PLAYER_HP_CHANGE, {uid: uid, deltaHP: deltaHP});
    }

    public emitExpChange(deltaExp: number){
        // emit exp change
        this.event.emit(GameSystem.ON_EXP_CHANGE, {deltaExp: deltaExp});
    }

    public emitCoinChange(deltaCoin: number){
        // emit coin change
        this.event.emit(GameSystem.ON_COIN_CHANGE, {deltaCoin: deltaCoin});
    }

    public emitInput(input: Input){
        this.event.emit(GameSystem.ON_INPUT, {input: input});
    }

    public emitCreatePlayer(uid: string, charaId: string){
        this.event.emit(GameSystem.ON_CREATE_PLAYER, {uid: uid, charaId: charaId});
    }

    public emitGameStart(){
        this.event.emit(GameSystem.ON_GAME_START);
    }
    //public emitCreatePlayer(uid: string, charaId: string){
    //      this event is broadcast to all client,
    //      but client handel this event only if it is from remote
    //      this.event.emit(GameSystem.ON_CREATE_PLAYER, {uid: uid, charaId: charaId});
}

class RemoteGameSystem extends GameSystem{
    public emitInput(input: Input){
        this.event.emit(GameSystem.ON_INPUT, {input: input});
        // then broadcast to other players
    }
}
