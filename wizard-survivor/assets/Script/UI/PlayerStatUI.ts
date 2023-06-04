import PlayerController from "../Controller/PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerStatUI extends cc.Component {
    @property()
    public player: PlayerController = null;

    // PUBLIC METHODS:
    public init(player: PlayerController){
        this.player = player;
        this.player.event.on(PlayerController.PLAYER_ATTR_CHANGE, this.updateUI, this);
        this.updateUI();
    }


    // HELPERS:
    private updateUI(){
        const label = this.node.getComponent(cc.Label);
        label.string = `current HP: ${this.player.currentHP.toString()}\n` +
                        `move speed: ${this.player.moveSpeed.toString()}\n` +
                        `max HP: ${this.player.maxHp.toString()}\n` +
                        `exp gain: ${this.player.expGainPercentage.toString()}\n` +
                        `dash cool down: ${this.player.dashCoolDown.toString()}\n` +
                        `dash speed: ${this.player.dashSpeed.toString()}\n` +
                        `attack speed: ${this.player.mainWeapon.attackSpeed.toString()}\n` +
                        `shot per attack: ${this.player.mainWeapon.shotPerAttack.toString()}\n` +
                        `shoot speed: ${this.player.mainWeapon.shootSpeed.toString()}\n` +
                        `damage: ${this.player.mainWeapon.projectileAttr.damage.toString()}\n` +
                        `fly speed: ${this.player.mainWeapon.projectileAttr.flySpeed.toString()}\n` +
                        `exist duration: ${this.player.mainWeapon.projectileAttr.existDuration.toString()}\n` +
                        `bounce on enemy times: ${this.player.mainWeapon.projectileAttr.bounceOnEnemyTimes.toString()}\n` +
                        `penetrate times: ${this.player.mainWeapon.projectileAttr.penetrateTimes.toString()}\n`;
    }
}
