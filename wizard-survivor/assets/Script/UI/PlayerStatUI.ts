import PlayerController from "../Controller/PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerStatUI extends cc.Component {

    public player: PlayerController = null;

    private label;

    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        this.label = this.node.getChildByName('AttrLabel').getComponent(cc.Label);
        console.log('PlayerStatUI.onLoad, this.label', this.label)
    }

    // PUBLIC METHODS:
    public init(player: PlayerController){
        this.player = player;
        this.player.event.on(PlayerController.PLAYER_ATTR_CHANGE, this.updateUI, this);
        this.updateUI();
    }


    // HELPERS:
    private updateUI(){

        this.label.string =
                        // `current HP: ${this.player.currentHP.toString()}\n` +
                        `移動速度: ${this.player.moveSpeed.value}\n` +
                        `最大生命: ${this.player.maxHp.value}\n` +
                        `經驗增益: ${this.player.expGainPercentage.value}%\n` +
                        `衝刺冷卻時間: ${this.player.dashCoolDown.value}\n` +
                        // `dash speed: ${this.player.dashSpeed.toString()}\n` +
                        `攻擊速度: ${this.player.mainWeapon.attackSpeed.value}\n` +
                        // `shot per attack: ${this.player.mainWeapon.shotPerAttack.toString()}\n` +
                        // `shoot speed: ${this.player.mainWeapon.shootSpeed.toString()}\n` +
                        `基礎傷害: ${this.player.mainWeapon.projectileAttr.damage.value}\n` +
                        `子彈飛行速度: ${this.player.mainWeapon.projectileAttr.flySpeed.value}\n`;
                        // `exist duration: ${this.player.mainWeapon.projectileAttr.existDuration.toString()}\n`;
                        // `bounce on enemy times: ${this.player.mainWeapon.projectileAttr.bounceOnEnemyTimes.toString()}\n` +
                        // `penetrate times: ${this.player.mainWeapon.projectileAttr.penetrateTimes.toString()}\n`
        // label.string += `\nBuffs:\n`;
        // for (const buff of this.player.appliedBuff){
        //     label.string += `${buff.description}\n`;
        // }
    }
}
