import PlayerController from "../Controller/PlayerController";
import quat = cc.quat;
import GameManager from "../Manager/GameManager";
import ProjectileController from "../Controller/ProjectileController";
import {ProjectileAttr} from "./Attributes";
import resources = cc.resources;
import Game = cc.Game;
import BUILTIN_NAME = cc.Material.BUILTIN_NAME;
import WaveManager from "../Manager/WaveManager";
import {loadResource} from "./utils";

export class IBuff {
    public showName: string;
    public description: string;
    public id: string;

    public get isAvailable(): boolean { return this._coolDownTimer === 0 || this._coolDown == 0; }

    protected _coolDown: number = 0;
    protected _coolDownTimer: number = 0;

    public constructor(coolDown: number) {
        this._coolDown = coolDown;
    }

    /*
    * 建議 PlayerController.applyBuff 套用 Buff。
    * 否則不會觸發事件＆不會被記錄在 PlayerController.appliedBuff 中。
     */
    public _apply(player: PlayerController): void {}

    public intoCoolDown(player: PlayerController) {
        this._coolDownTimer = 1;
        player.schedule(() => this._coolDownTimer = 0, this._coolDown);
    }
}

export class EffectOnce extends IBuff {
    constructor(coolDown) {super(coolDown)};
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
    public showName = "〈傳說技能〉 狂躁\n"
    public description = "當累計殺死十個敵人，大幅增加傷害和跑速，持續五秒。效果可以疊加。\n"
    public id = "GetExited";

    private readonly _killToEnable: number;
    private readonly _duration: number;
    private readonly _damageFactor: number;
    private readonly _speedFactor: number;

    killCount: number = 0;

    constructor(killToEnable: number = 10, duration: number = 5, damageFactor: number = 150, speedFactor: number = 200) {
        super(0);
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
    public showName = "〈傳說技能〉 走為上策\n"
    public description = "當你受傷，立即重置衝刺的冷卻時間。冷卻時間一秒。"
    public id = "RunAway";

    constructor(coolDown: number = 1) {
        super(coolDown);
    }

    public _apply(player: PlayerController) {
        super._apply(player);

        player.event.on(PlayerController.PLAYER_HURT, () => {

            if (this._coolDownTimer > 0) return;

            this.intoCoolDown(player);
            this.showBuffTriggered(player);

            player.dashCountDown = 0;
        })
    }
}

class Guinsoo extends EffectOnce {
    public showName = "〈傳說技能〉 鬼索的狂暴之拳\n"
    public description = "當傷害敵人，增加攻擊速度，持續五秒。效果疊加最多五次。\n"
    public id = "Guinsoo";

    private readonly _duration: number;
    private readonly _attackSpeedFactor: number = 20;
    private readonly _maxStack: number = 5;
    private curStack: number = 0;

    constructor(duration: number = 5, attackSpeedFactor: number = 20, maxStack: number = 5) {
        super(0);
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

class Tiamat extends EffectOnce {
    public showName = "〈傳說技能〉 提亞瑪特\n"
    public description = "當傷害敵人，對周圍敵人造成傷害。冷卻時間 0.5 秒。\n"
    public id = "Tiamat";

    private readonly _prefabPath = 'Prefab/Projectile/Tiamat'
    private _prefab: cc.Prefab;


    private readonly _dealDamagePercentage: number = 20;

    constructor(coolDown: number = 0.5 ,damageFactor: number = 20) {
        super(coolDown);
        this._dealDamagePercentage = damageFactor;
    }

    public _apply(player: PlayerController) {
        super._apply(player);
        loadResource(this._prefabPath, cc.Prefab).then(
            (prefab) => this._prefab = prefab as unknown as cc.Prefab
        );
        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_HIT, ({enemyPosition, killByUid}) => {
            if (killByUid != player.uid) return;
            if (this._coolDownTimer > 0) return;

            this.intoCoolDown(player);
            this.showBuffTriggered(player);

            const proj = GameManager.instance.poolManager
                .createPrefab(this._prefab)
                .getComponent(ProjectileController);

            proj.node.setPosition(enemyPosition);
            proj.node.parent = GameManager.instance.bulletLayer;
            proj.init(
                new ProjectileAttr(
                    0, 200,
                    0.5, 0,
                    0, true),
            );
            proj.shootToDirection(cc.Vec2.ZERO);
        })
    }
}

class GA extends EffectOnce {
    public showName = "〈傳說技能〉 守護天使\n"
    public description = "當你受到致命傷害，立即回復所有生命值，並且無敵一秒。冷卻時間 100 秒。\n"
    public id = "GA";

    private _invincibleTime: number;

    constructor(invincibleTime: number = 1 ,coolDown: number = 100) {
        super(coolDown);
        this._invincibleTime = invincibleTime;
    }

    public _apply(player: PlayerController) {
        super._apply(player);
        player.event.on(PlayerController.PLAYER_HURT, (damageInfo) => {
            if (this._coolDownTimer > 0) return;
            if (player.currentHP.value > damageInfo.damage) return;

            this.intoCoolDown(player);
            this.showBuffTriggered(player);
            damageInfo.damage = 0;
            player.recover(player.maxHp.value);
            player.isInvincible++;
            player.scheduleOnce(() => {player.isInvincible--}, this._invincibleTime);
        })
    }
}



let BuffsList: (typeof IBuff)[] = [GetExited, RunAway, Guinsoo, Tiamat, GA];

export let Buffs = {};
export let BuffsName: {[key: string]: string} = {};

for (let i = 0; i < BuffsList.length; i++) {
    const inst = new BuffsList[i](0);
    Buffs[inst.id] = BuffsList[i];
    BuffsName[inst.id] = inst.showName;
}