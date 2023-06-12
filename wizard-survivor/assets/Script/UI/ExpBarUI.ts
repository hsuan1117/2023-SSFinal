import GameManager from "../Manager/GameManager";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExpBarUI extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        GameManager.instance.event.on(GameManager.ON_GAME_STAT_CHANGE, this.updateExpBar, this);
    }

    onDisable() {
        GameManager.instance.event.off(GameManager.ON_GAME_STAT_CHANGE, this.updateExpBar, this);
    }

    start(){
        this.updateExpBar();
    }

    // HELPERS:
    private updateExpBar() {
        const expBar = this.node.getComponent(cc.ProgressBar);
        expBar.progress = GameManager.instance.exp.value / GameManager.instance.upgradeExp.value;
        const levelLabel = this.node.getChildByName('Level').getComponent(cc.Label);
        levelLabel.string = GameManager.instance.level.value.toString();
    }
}
