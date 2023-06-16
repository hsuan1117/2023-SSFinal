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

    protected showBuffTriggered(player: PlayerController) {
        console.log(this.showName);
    }
}

export class GetExited extends EffectOnce {
    public showName = "〈傳說技能〉狂躁\n"
    public description = "當累計殺死十個敵人，大幅增加傷害和跑速，持續五秒。效果可以疊加。\n"
    public id = "GetExited";

    private readonly _killToEnable: number;
    private readonly _duration: number;
    private readonly _damageFactor: number;
    private readonly _speedFactor: number;

    killCount: number = 0;

    constructor(killToEnable: number = 10, duration: number = 5, damageFactor: number = 150, speedFactor: number = 200) {
        super();
        this._killToEnable = killToEnable;
        this._duration = duration;
        this._damageFactor = damageFactor;
        this._speedFactor = speedFactor;
    }

    public _apply(player: PlayerController) {
        super._apply(player);
        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_DIE, () => {

            console.log('GetExited.onEnemyDie: ', this.killCount)

            this.killCount++;

            if (this.killCount > 0 && this.killCount % this._killToEnable == 0){

                this.showBuffTriggered(player);

                player.mainWeapon.projectileAttr.damage.percentageFactor += this._damageFactor;
                player.moveSpeed.addFactor += this._speedFactor;

                player.scheduleOnce(() => {
                    player.mainWeapon.projectileAttr.damage.percentageFactor -= this._damageFactor;
                    player.moveSpeed.addFactor -= this._speedFactor;
                }, this._duration)
            }
        })
    }
}

class RunAway extends EffectOnce {
    public showName = "〈傳說技能〉走為上策\n"
    public description = "當你受傷，立即重置衝刺的冷卻時間。冷卻時間一秒。"
    public id = "RunAway";

    private readonly _coolDown: number = 1;
    private _coolDownTimer: number = 0;

    constructor(coolDown: number = 1) {
        super();
        this._coolDown = coolDown;
    }

    public _apply(player: PlayerController) {
        super._apply(player);

        player.event.on(PlayerController.PLAYER_HURT, () => {

            if (this._coolDownTimer > 0) return;
            this.showBuffTriggered(player);

            player.dashCountDown = 0;

            this._coolDownTimer = 1;
            player.scheduleOnce(() => {
                this._coolDownTimer = 0;
            }, this._coolDown)
        })
    }
}

class Guinsoo extends EffectOnce {
    public showName = "鬼索的狂暴之拳\n"
    public description = "當傷害敵人，增加攻擊速度，持續五秒。效果疊加最多五次。\n"
    public id = "Guinsoo";

    private readonly _duration: number;
    private readonly _attackSpeedFactor: number = 20;
    private readonly _maxStack: number = 5;
    private curStack: number = 0;

    constructor(duration: number = 5, attackSpeedFactor: number = 20, maxStack: number = 5) {
        super();
        this._attackSpeedFactor = attackSpeedFactor;
        this._maxStack = maxStack;
        this._duration = duration;
    }

    public _apply(player: PlayerController) {
        super._apply(player);

        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_HIT, ({enemyPosition, killByUid}) => {
            if (this.curStack >= this._maxStack) return;
            if (killByUid != player.uid) return;

            this.showBuffTriggered(player);
            this.curStack++;
            player.mainWeapon.attackSpeed.percentageFactor += this._attackSpeedFactor;

            player.scheduleOnce(() => {
                this.curStack--;
                player.mainWeapon.attackSpeed.percentageFactor -= this._attackSpeedFactor;
            }, this._duration)
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

let BuffsList: (typeof IBuff)[] = [GetExited, RunAway, Guinsoo];

export let Buffs = {};
export let BuffsName: {[key: string]: string} = {};

for (let i = 0; i < BuffsList.length; i++) {
    const inst = new BuffsList[i]();
    Buffs[inst.id] = BuffsList[i];
    BuffsName[inst.id] = inst.showName;
}