import PlayerController from "../Controller/PlayerController";
import quat = cc.quat;
import GameManager from "../Manager/GameManager";
import ProjectileController from "../Controller/ProjectileController";
import {ProjectileAttr} from "./Attributes";
import resources = cc.resources;
import Game = cc.Game;

export interface IBuff {
    description: string;
    /*
    * 建議 PlayerController.applyBuff 套用 Buff。
    * 否則不會觸發事件＆不會被記錄在 PlayerController.appliedBuff 中。
     */
    _apply(Any): void;
}

class IncreaseAttackSpeed implements IBuff {
    public  get description(): string {
        return `Increase attack speed by ${this.addPercentage}%`;
    }

    private readonly addPercentage: number = 0;

    constructor(addPercentage: number) {
        this.addPercentage = addPercentage;
    }

    public _apply(player: PlayerController): void {
        player.mainWeapon.attackSpeed.percentageFactor += this.addPercentage;
    }
}

class IncreaseMaxHP implements IBuff{
    public get description(): string {
        return `Increase max HP by ${this.incHP}`;
    }

    private readonly incHP: number = 0;

    public _apply(player: PlayerController) {
        player.maxHp.addFactor += this.incHP;
        player.currentHP.addFactor += this.incHP;
    }
}

class ExplosionOnDash implements IBuff {
    private readonly DAMAGE: number = 100;
    private readonly DURATION: number = 0.3;
    private prefabPath: string = "Prefab/Projectile/Explosion";
    private prefab: cc.Prefab = null;

    public get description(): string {
        return `Explosion on dash`;
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
            proj.node.parent = GameManager.instance.node;
            proj.init(
                new ProjectileAttr(0, this.DAMAGE,
                    this.DURATION, 0, 0),
                null,
                0
            );
            proj.shootToDirection(cc.Vec2.ZERO);
        }, this);
    }
}

export let Buffs= {
    IncreaseAttackSpeed: IncreaseAttackSpeed,
    IncreaseMaxHP: IncreaseMaxHP,
    ExplosionOnDash: ExplosionOnDash,
}

export let BuffsName = {
    IncreaseAttackSpeed: '增加攻速',
    IncreaseMaxHP: '加HP',
    ExplosionOnDash: '移動時爆炸',
}
