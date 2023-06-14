import {Input} from "./InputManager";
import GameManager from "./GameManager";
import Echo from "laravel-echo";
import {GameInfo} from "../UI/MainMenuUI";
import {api, CURRENT_ENV} from "../Helper/utils";

/*
1. 負責轉發需要和其他客戶端、伺服器同步的事件。
 */
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

    passed event data: {uid: string, charaId: string, isLocal: boolean}
     */
    public static readonly ON_CREATE_PLAYER: string = "ON_CREATE_PLAYER";

    /*事件：遊戲開始

    passed event data: null
     */
    public static readonly ON_GAME_START: string = "ON_GAME_START";

    /*事件：遊戲結束

    passed event data: null
     */
    public static readonly ON_GAME_END: string = "ON_GAME_END";

    private buffReadyToApply: { uid: string, buffId: string }[] = [];

    constructor() {
        this.event = new cc.EventTarget();
    }


    // === PUBLIC METHODS ===
    public emitApplyBuff(uid: string, buffId: string): void {
        this.buffReadyToApply.push({uid: uid, buffId: buffId});

        // TODO: GameSystem should not know how many players there are
        if (this.buffReadyToApply.length >= GameManager.instance.playerManager.allPlayerIDs.length) {
            for (let bf of this.buffReadyToApply) {
                this.event.emit(GameSystem.ON_BUFF_APPLY, bf);
            }
            this.buffReadyToApply = [];
        }
    }

    public emitPlayerHPChange(uid: string, deltaHP: number): void {
        this.event.emit(GameSystem.ON_PLAYER_HP_CHANGE, {uid: uid, deltaHP: deltaHP});
    }

    public emitExpChange(deltaExp: number) {
        // emit exp change
        this.event.emit(GameSystem.ON_EXP_CHANGE, {deltaExp: deltaExp});
    }

    public emitCoinChange(deltaCoin: number) {
        // emit coin change
        this.event.emit(GameSystem.ON_COIN_CHANGE, {deltaCoin: deltaCoin});
    }

    public emitInput(input: Input) {
        this.event.emit(GameSystem.ON_INPUT, {input: input});
    }

    public emitCreatePlayer(uid: string, charaId: string) {
        this.event.emit(GameSystem.ON_CREATE_PLAYER, {uid: uid, charaId: charaId, isLocal: true});
    }

    public emitGameStart() {
        this.event.emit(GameSystem.ON_GAME_START);
    }

    //public emitCreatePlayer(uid: string, charaId: string){
    //      this event is broadcast to all client,
    //      but client handel this event only if it is from remote
    //      this.event.emit(GameSystem.ON_CREATE_PLAYER, {uid: uid, charaId: charaId});
}

export class RemoteGameSystem extends GameSystem {
    public echoInstance: Echo;

    // TODO: 將 emit 改到 listener 裡面
    private room = null;

    private createEchoInstanceFromToken(token) {
        localStorage.setItem('token', token)
        this.echoInstance = new Echo({
            ...CURRENT_ENV.PUSHER_CONFIG,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        api("POST", '/broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name
                        }).then(response => {
                            callback(null, response);
                        }).catch(error => {
                            callback(error);
                        });
                    }
                };
            },
        });
    }

    constructor() {
        super();
        this.createEchoInstanceFromToken(localStorage.getItem('token'))
        this.echoInstance.join('game.' + this.room).listenForWhisper('input', (e) => {

        })
    }

    // === PUBLIC METHODS ===
    public emitApplyBuff(uid: string, buffId: string): void {
        // TODO
    }

    public emitPlayerHPChange(uid: string, deltaHP: number): void {
        fetch('https://final.hsuan.app/api/', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
        // this.event.emit(GameSystem.ON_PLAYER_HP_CHANGE, {uid: uid, deltaHP: deltaHP});
    }

    public emitExpChange(deltaExp: number) {
        fetch('https://final.hsuan.app/api/', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
        this.event.emit(GameSystem.ON_EXP_CHANGE, {deltaExp: deltaExp});
    }

    public emitCoinChange(deltaCoin: number) {
        fetch('https://final.hsuan.app/api/', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
        this.event.emit(GameSystem.ON_COIN_CHANGE, {deltaCoin: deltaCoin});
    }

    public emitInput(input: Input) {
        this.event.emit(GameSystem.ON_INPUT, {input: input});
        this.echoInstance.join('game.' + this.room).whisper('input', input);
    }

    public emitCreatePlayer(uid: string, charaId: string) {
        fetch('https://final.hsuan.app/api/', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
        this.event.emit(GameSystem.ON_CREATE_PLAYER, {uid: uid, charaId: charaId});
    }

    public emitGameStart() {
        fetch('https://final.hsuan.app/api/', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
        this.event.emit(GameSystem.ON_GAME_START);
    }
}

export function createGameSystem(gameInfo: GameInfo): GameSystem {
    return new GameSystem();
}
