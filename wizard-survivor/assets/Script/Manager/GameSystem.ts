import Game = cc.Game;
import {Input} from "./InputManager";
import GameManager from "./GameManager";
import Echo from "laravel-echo";
import {GameInfo} from "../UI/MainMenuUI";

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

class RemoteGameSystem extends GameSystem {
    public echoInstance: Echo;

    // TODO: 將 emit 改到 listener 裡面
    private readonly PUSHER_CONFIG = {
        broadcaster: 'pusher',
        key: "app-key",
        cluster: "mt1",
        forceTLS: false,
        wsHost: "final.hsuan.app",
        wsPath: "/websockets",
        wsPort: ""
    }

    private createEchoInstanceFromToken(token) {
        localStorage.setItem('token', token)
        this.echoInstance = new Echo({
            ...this.PUSHER_CONFIG,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        fetch('/broadcasting/auth', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                socket_id: socketId,
                                channel_name: channel.name
                            })
                        }).then(res => res.json()).then(response => {
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
        fetch('https://final.hsuan.app/api/', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
        this.event.emit(GameSystem.ON_INPUT, {input: input});
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

    /**
     * 登入用戶，並儲存 token
     * @param email
     * @param password
     * */
    public login(email: string, password: string) {
        fetch('https://final.hsuan.app/api/sanctum/token', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(res => res.json()).then(response => {
            localStorage.setItem('token', response.token);
            this.createEchoInstanceFromToken(response.token);
        })
    }

    /**
     * 註冊用戶，並儲存 token
     * @param name
     * @param email
     * @param password
     * */
    public register(name:string, email: string, password: string) {
        fetch('https://final.hsuan.app/api/sanctum/token', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(res => res.json()).then(response => {
            localStorage.setItem('token', response.token);
            this.createEchoInstanceFromToken(response.token);
        })
    }
}

export function createGameSystem(gameInfo: GameInfo): GameSystem {
    return new GameSystem();
}
