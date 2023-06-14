import PlayerFocus from "./PlayerFocus";
import GameManager from "../Manager/GameManager";

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

    private readonly child: string[] = ['Login', 'Offline1p', 'Offline2p', 'Leaderboard']
    private uid: string;

    private playerFocus: PlayerFocus;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playerFocus = this.node.getComponent(PlayerFocus);
    }

    public init(performerUid: string){
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
    public async getStartGameInfo(): Promise<GameInfo> {

    }


    // HELPERS:
    private onConfirm({uid, node}){
        const execute = {};
        execute['OnlineWithNewRoom'] = this.onlineWithNewRoom;
        execute['OnlineJoinRoomId'] = this.onlineJoinRoomId;
        execute['Offline1p'] = this.offline1p;
        execute['Offline2p'] = this.offline2p;
        execute['Leaderboard'] = this.leaderboard;

        execute[node.name]();
    }

    private offline1p(): GameInfo {
        return null;
    }
    private offline2p() : GameInfo{
        return null;
    }
    private onlineWithNewRoom(): GameInfo {
        return null;
    }
    private onlineJoinRoomId() : GameInfo{
        return null;
    }
    private leaderboard(){

    }
}
