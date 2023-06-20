import PlayerController from "../Controller/PlayerController";
import {loadResource} from "../Helper/utils";
import {IBuff} from "../Helper/Buff";
import GameManager from "../Manager/GameManager";
import BuffIconUI from "./BuffIconUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerStatUI extends cc.Component {

    public player: PlayerController = null;

    private _buffIconPrefab: cc.Prefab = null;
    private label;
    private buffIconContainer: cc.Node;
    private showedBuff: IBuff[] = [];

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.label = this.node.getChildByName('AttrLabel').getComponent(cc.Label);
        this.buffIconContainer = this.node.getChildByName('Buff');
        loadResource('Prefab/UI/BuffIcon', cc.Prefab)
            .then((prefab: cc.Prefab) => this._buffIconPrefab = prefab);
    }

    // PUBLIC METHODS:
    public init(player: PlayerController) {
        this.node.opacity = 255;
        this.player = player;
        this.player.event.on(PlayerController.PLAYER_ATTR_CHANGE, this.updateUI, this);
        this.updateUI();
    }


    // HELPERS:
    private async updateUI() {

        this.label.string =
            // `current HP: ${this.player.currentHP.toString()}\n` +
            `移動速度: ${this.player.moveSpeed.value}\n` +
            // `最大生命: ${this.player.maxHp.value}\n` +
            `經驗增益: ${this.player.expGainPercentage.value}%\n` +
            `衝刺冷卻: ${this.player.dashCoolDown.value}\n` +
            // `dash speed: ${this.player.dashSpeed.toString()}\n` +
            `攻擊速度: ${this.player.mainWeapon.attackSpeed.value}\n` +
            // `shot per attack: ${this.player.mainWeapon.shotPerAttack.toString()}\n` +
            // `shoot speed: ${this.player.mainWeapon.shootSpeed.toString()}\n` +
            `基礎傷害: ${this.player.mainWeapon.projectileAttr.damage.value}\n`;
            // `子彈飛行速度: ${this.player.mainWeapon.projectileAttr.flySpeed.value}\n`;
        // `exist duration: ${this.player.mainWeapon.projectileAttr.existDuration.toString()}\n`;
        // `bounce on enemy times: ${this.player.mainWeapon.projectileAttr.bounceOnEnemyTimes.toString()}\n` +
        // `penetrate times: ${this.player.mainWeapon.projectileAttr.penetrateTimes.toString()}\n`
        // label.string += `\nBuffs:\n`;
        // for (const buff of this.player.appliedBuff){
        //     label.string += `${buff.description}\n`;
        // }

        let toAdds: IBuff[] = [];
        let i = 0;
        while (i < this.showedBuff.length && this.showedBuff[i] === this.player.appliedBuff[i]) i++;
        toAdds = this.player.appliedBuff.slice(i);
        this.showedBuff = [...this.showedBuff, ...toAdds];

        for (const toAdd of toAdds) {
            const buffIcon =
                GameManager.instance.poolManager.createPrefab(this._buffIconPrefab)
                    .getComponent(BuffIconUI);
            await buffIcon.init(toAdd);
            buffIcon.node.parent = this.buffIconContainer;
        }
    }
}
