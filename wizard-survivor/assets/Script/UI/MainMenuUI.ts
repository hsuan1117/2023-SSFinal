import PlayerFocus from "./PlayerFocus";
import GameManager from "../Manager/GameManager";
import {api} from "../Helper/utils";

const {ccclass, property} = cc._decorator;

/*
給定 uid，
使得該 uid 可以根據事先註冊好的 input 事件來操作 MainMenuUI：
1. 登入
2. 創建房間
3. 加入房間
並回傳 uid
 */

export type GameInfo = {
    localUids: string[];
}

@ccclass
export default class MainMenuUI extends cc.Component {
    /*
    事件：當玩家選擇好遊戲模式後（線上、離線...）

    callbackFn: ({gameInfo: GameInfo}) => void
     */
    public static readonly ON_AUTH_COMPLETED: string = "ON_START_GAME_INFO_PREPARED";
    public event: cc.EventTarget;

    private readonly child: string[] = ['OnlineWithNewRoom', 'OnlineJoinRoom', 'Offline1p', 'Offline2p', 'Leaderboard'];
    private uid: string;

    private playerFocus: PlayerFocus;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.playerFocus = this.node.getComponent(PlayerFocus);
        this.event = new cc.EventTarget();
    }

    public init(performerUid: string) {
        this.uid = performerUid;

        const focusTarget = [];
        for (let i = 0; i < this.child.length; i++) {
            focusTarget.push(this.node.getChildByName(this.child[i]));
        }

        this.playerFocus.init(focusTarget, cc.v2(0, 50), true);
        this.playerFocus.focusOnIndex(this.uid, 0);

        this.playerFocus.event.on(PlayerFocus.ON_CONFIRM, this.onConfirm, this);
    }

    /*
     */
    // public async getStartGameInfo(): Promise<GameInfo> {
    //     // let res: GameInfo = {
    //     //     localUids: ['p1', 'p2']
    //     // }
    //     // return res;
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve({
    //                 localUids: ['p1', 'p2']
    //             })
    //         }, 500000)
    //     })
    // }


    // HELPERS:
    private onConfirm({uid, node}) {
        const execute = {};
        execute['OnlineWithNewRoom'] = this.onlineWithNewRoom.bind(this);
        execute['OnlineJoinRoomId'] = this.onlineJoinRoomId.bind(this);
        execute['Offline1p'] = this.offline1p.bind(this);
        execute['Offline2p'] = this.offline2p.bind(this);
        execute['Leaderboard'] = this.leaderboard;

        execute[node.name]();
    }

    private offline1p(): void {
        const gameInfo: GameInfo = {
            localUids: ['p1']
        }
        this.event.emit(MainMenuUI.ON_AUTH_COMPLETED, {gameInfo: gameInfo})
    }

    private offline2p(): void {
        const gameInfo: GameInfo = {
            localUids: ['p1', 'p2']
        }
        this.event.emit(MainMenuUI.ON_AUTH_COMPLETED, {gameInfo: gameInfo})
    }

    private async auth(email: string, password: string) {
        const {token} = await api("POST", "/sanctum/token", {
            email,
            password
        })
        localStorage.setItem("token", token);
    }

    private showAuthUI() {
        // show a dialog to login or register
        console.log('auth')
    }

    private onlineWithNewRoom(): GameInfo {
        console.log('yes')
        this.showAuthUI();
        // get room

        return null;
    }

    private onlineJoinRoomId(): GameInfo {
        console.log('yes')
        this.showAuthUI();
        return null;
    }

    private leaderboard() {

    }
}
