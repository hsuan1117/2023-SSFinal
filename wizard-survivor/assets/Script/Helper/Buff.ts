import PlayerController from "../Controller/PlayerController";
import quat = cc.quat;
import GameManager from "../Manager/GameManager";
import ProjectileController from "../Controller/ProjectileController";
import {ProjectileAttr} from "./Attributes";
import resources = cc.resources;
import Game = cc.Game;
import BUILTIN_NAME = cc.Material.BUILTIN_NAME;
import WaveManager from "../Manager/WaveManager";

export class IBuff {
    public showName: string;
    public description: string;
    public id: string;

    public constructor() {}
    /*
    * 建議 PlayerController.applyBuff 套用 Buff。
    * 否則不會觸發事件＆不會被記錄在 PlayerController.appliedBuff 中。
     */
    public _apply(Any): void {}
}

export class EffectOnce extends IBuff {
    constructor() {super()};
    public _apply(player: PlayerController): void {
        if (player.appliedBuff.find((buff) => buff.id === this.id)) {
            return;
        }
    }
}

export class GetExited extends EffectOnce {
    public showName = "〈傳說技能〉狂躁\n"
    public description = "當累計殺死十個敵人，大幅增加傷害和跑速，持續五秒\n"
    public id = "GetExited";

    private readonly killToEnable: number;
    private readonly duration: number;
    private readonly damageFactor: number;
    private readonly speedFactor: number;

    killCount: number = 0;

    constructor(killToEnable: number = 10, duration: number = 5, damageFactor: number = 150, speedFactor: number = 200) {
        super();
        this.killToEnable = killToEnable;
        this.duration = duration;
        this.damageFactor = damageFactor;
        this.speedFactor = speedFactor;
    }

    _apply(player: PlayerController) {
        super._apply(player);
        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_DIE, () => {

            console.log('GetExited.onEnemyDie: ', this.killCount)

            this.killCount++;

            if (this.killCount > 0 && this.killCount % this.killToEnable == 0){

                console.log('GetExited Triggered!')

                player.mainWeapon.projectileAttr.damage.addFactor += this.damageFactor;
                player.moveSpeed.addFactor += this.speedFactor;

                console.log(player.moveSpeed.value);

                player.scheduleOnce(() => {
                    player.mainWeapon.projectileAttr.damage.addFactor -= this.damageFactor;
                    player.moveSpeed.addFactor -= this.speedFactor;
                }, this.duration)
            }
        })
    }
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

let BuffsList: (typeof IBuff)[] = [GetExited];

export let Buffs = {};
export let BuffsName: {[key: string]: string} = {};

for (let i = 0; i < BuffsList.length; i++) {
    const inst = new BuffsList[i]();
    Buffs[inst.id] = BuffsList[i];
    BuffsName[inst.id] = inst.showName;
}