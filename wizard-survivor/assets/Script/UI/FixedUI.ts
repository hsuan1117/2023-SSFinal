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

    private coinLabel: cc.Label = null;

    onLoad () {
        GameManager.instance.playerManager.event.on(PlayerManager.PLAYER_INSTANTIATED, () => {
            let childIdx = 1;
            for (let id of GameManager.instance.playerManager.allPlayerIDs){
                this.enablePlayerStatUIForPlayer(id, childIdx++);
            }
        }, this);

        GameManager.instance.event.on(GameManager.ON_GAME_STAT_CHANGE,  this.onGameStatChange, this);

        this.coinLabel = this.node.getChildByName('Coin')
            .getChildByName('CoinLabel')
            .getComponent(cc.Label);
    }

    start () {

    }


    // HELPERS:
    private enablePlayerStatUIForPlayer(id: string, childIdx: number){
        let player = GameManager.instance.playerManager.getPlayer(id)
        if (!player) return;
        let playerStatUI = this.node.getChildByName(`PlayerStatUI${childIdx}`).getComponent(PlayerStatUI);
        playerStatUI.node.parent = this.node;
        playerStatUI.init(player);
    }

    private onGameStatChange(){
        this.coinLabel.string = `X ${GameManager.instance.coinCnt.value.toString()}`;
    }
}
