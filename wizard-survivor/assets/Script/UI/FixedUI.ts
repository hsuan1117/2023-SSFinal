import GameManager from "../Manager/GameManager";
import Game = cc.Game;
import PlayerManager from "../Manager/PlayerManager";
import PlayerController from "../Controller/PlayerController";
import PlayerStatUI from "./PlayerStatUI";

const {ccclass, property} = cc._decorator;

/*
實例化 GO 出來後，
會在 GameManager 生成 Player 之後，
顯示對應數量的 PlayerStatUI
 */
@ccclass
export default class FixedUI extends cc.Component {

    private _timer: number;
    private _timerLabel: cc.Label;
    private coinLabel: cc.Label;
    private uids: string[];


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.coinLabel = this.node.getChildByName('Coin')
            .getChildByName('Label')
            .getComponent(cc.Label);
        this._timerLabel =
            this.node.getChildByName('Timer')
            .getChildByName('Label')
            .getComponent(cc.Label);
        this._timer = 0;
    }

    onEnable(){
        GameManager.instance.event.on(GameManager.ON_GAME_LOGIC_READY,  this.onGameReady, this);
        GameManager.instance.event.on(GameManager.ON_GAME_STAT_CHANGE,  this.onGameStatChange, this);
    }

    onDisable(){
        GameManager.instance.event.off(GameManager.ON_GAME_LOGIC_READY,  this.onGameReady, this);
        GameManager.instance.event.off(GameManager.ON_GAME_STAT_CHANGE,  this.onGameStatChange, this);
        this.unschedule(this.updateTimer);
    }


    // HELPERS:
    private onGameReady(){
        let childIdx = 1;
        for (let id of GameManager.instance.playerManager.allPlayerIDs){
            this.enablePlayerStatUIForPlayer(id, childIdx++);
        }
        this.onGameStatChange();
        this.schedule(this.updateTimer, 1);
    }

    private enablePlayerStatUIForPlayer(uid: string, childIdx: number){
        let player = GameManager.instance.playerManager.getPlayer(uid)
        if (!player) return;
        let playerStatUI = this.node.getChildByName(`PlayerStatUI${childIdx}`).getComponent(PlayerStatUI);
        playerStatUI.node.parent = this.node;
        playerStatUI.init(player);
    }

    private onGameStatChange(){
        this.coinLabel.string = `X ${GameManager.instance.coinCnt.value.toString()}`;
    }

    private updateTimer(){
        this._timer++;
        this._timerLabel.string = this._timer.toString();
    }
}
