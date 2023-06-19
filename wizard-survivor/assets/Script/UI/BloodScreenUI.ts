import GameManager from "../Manager/GameManager";
import Game = cc.Game;
import PlayerController from "../Controller/PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BloodScreenUI extends cc.Component {

    private _anim: cc.Animation = null;

    onLoad() {
        this._anim = this.getComponent(cc.Animation);
    }

    onEnable() {
        GameManager.instance.event.on(GameManager.ON_GAME_LOGIC_READY, this.onGameLogicReady, this);
    }

    onDisable() {
        GameManager.instance.event.on(GameManager.ON_GAME_LOGIC_READY, this.onGameLogicReady, this);
    }

    start() {
        this.node.opacity = 0;
    }

    private onGameLogicReady(){
        for (let uid of GameManager.instance.localUids){
            const player = GameManager.instance.playerManager.getPlayer(uid);
            player.event.on(PlayerController.PLAYER_HURT, this.playBloodScreenEffect, this)
        }
    }

    private playBloodScreenEffect(){
        this._anim.play();
    }
}
