import PlayerController from "../Controller/PlayerController";
import quat = cc.quat;
import GameManager from "../Manager/GameManager";
import ProjectileController from "../Controller/ProjectileController";
import {ProjectileAttr} from "./Attributes";
import resources = cc.resources;
import Game = cc.Game;
import BUILTIN_NAME = cc.Material.BUILTIN_NAME;

export class IBuff {
    showName: string;
    description: string;
    id: string;
    /*
    * 建議 PlayerController.applyBuff 套用 Buff。
    * 否則不會觸發事件＆不會被記錄在 PlayerController.appliedBuff 中。
     */
    _apply(Any): void {}
}

class IncreaseAttackSpeed implements IBuff {
    public readonly id = "IncreaseAttackSpeed";
    public readonly showName: string = "提升攻擊速度";
    public get description(): string {
        return `Increase attack speed by ${this.addPercentage}%`;
    }

    private readonly addPercentage: number = 0;

    constructor(addPercentage: number = 20) {
        this.addPercentage = addPercentage;
    }

    public _apply(player: PlayerController): void {
        player.mainWeapon.attackSpeed.percentageFactor += this.addPercentage;
    }
}

class IncreaseMaxHP implements IBuff{
    public readonly id = "IncreaseMaxHP";
    public readonly showName: string = "增加最大血量";

    public get description(): string {
        return `Increase max HP by ${this.incHP}`;
    }

    private readonly incHP: number = 0;

    constructor(incHP: number = 1) {
        this.incHP = incHP;
    }

    public _apply(player: PlayerController) {
        player.maxHp.addFactor += this.incHP;
        player.currentHP.addFactor += this.incHP;
    }
}

class ExplosionOnDash implements IBuff {
    public readonly id = "ExplosionOnDash";
    public readonly showName: string = "衝刺時炸傷周圍敵軍";
    private readonly damage: number = 0;
    private readonly DURATION: number = 0.3;
    private prefabPath: string = "Prefab/Projectile/Explosion";
    private prefab: cc.Prefab = null;

    public get description(): string {
        return `Explosion on dash`;
    }

    constructor(damage: number = 10) {
        this.damage = damage;
    }

    public _apply(player: PlayerController): void {
        cc.resources.load(this.prefabPath, cc.Prefab, (err, prefab: cc.Prefab) => {
            this.prefab = prefab;
        })

        player.event.on(PlayerController.PLAYER_DASH, ()=> {
            const proj = GameManager.instance.poolManager
                .createPrefab(this.prefab)
                .getComponent(ProjectileController);

            proj.node.position = player.node.position;
            // proj.node.parent = GameManager.instance.node;
            proj.node.parent = GameManager.instance.bulletLayer;
            proj.init(
                new ProjectileAttr(0, this.damage,
                    this.DURATION, 0, 0),
                null,
                0
            );
            proj.shootToDirection(cc.Vec2.ZERO);
        }, this);
    }
}

let BuffsList: (typeof IBuff)[] = [IncreaseAttackSpeed, IncreaseMaxHP, ExplosionOnDash];
let Buffs = {};
let BuffsName: {[key: string]: string} = {};

for (let i = 0; i < BuffsList.length; i++) {
    const inst = new BuffsList[i]();
    Buffs[inst.id] = BuffsList[i];
    BuffsName[inst.id] = inst.showName;
}

export {Buffs, BuffsName};