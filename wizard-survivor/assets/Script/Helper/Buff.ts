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
import SearchDrop from "./SearchDrop";
import Layout = cc.Layout;
import BuffIconUI from "../UI/BuffIconUI";

export class IBuff {
    public showName: string;
    public description: string;
    public id: string;

    public get isAvailable(): boolean { return this._isEnable && (this._coolDownTimer === 0 || this._coolDown == 0); }
    public set coolDownTimer(value: number) { this._coolDownTimer = value; }
    public set isEnable(value: boolean) { this._isEnable = value; }

    protected static _buffIconPrefab: cc.Prefab = null;
    protected _coolDown: number = 0;
    protected _coolDownTimer: number = 0;
    protected _isEnable: boolean = true;

    public constructor(coolDown: number) {
        this._coolDown = coolDown;
    }

    /* 建議 PlayerController.applyBuff 套用 Buff。
    *
    * 否則不會觸發事件＆不會被記錄在 PlayerController.appliedBuff 中。
    *
    * 若套用成功且需要手動卸除 buff，則返回一個卸除函數 */
    public _apply(player: PlayerController) { console.warn("IBuff._apply() should be override by child class"); return null; }
    public remove(player: PlayerController){}

    public intoCoolDown(player: PlayerController) {
        this._coolDownTimer = 1;
        player.schedule(() => this._coolDownTimer = 0, this._coolDown);
    }

    protected showBuffTriggered(player: PlayerController) {
        console.log(this.showName);

        let show = () => {
            const buffIcon =
                GameManager.instance.poolManager.createPrefab(IBuff._buffIconPrefab)
                   .getComponent(BuffIconUI);
            buffIcon.init(this, true);
            buffIcon.node.parent = player.node;
            buffIcon.node.position = cc.v3(0, 0);
            const animState =  buffIcon.node.getComponent(cc.Animation).play('BuffIconFadedOut');
            // @ts-ignore
            animState && animState.on('finished', () => {
                GameManager.instance.poolManager.recycle(buffIcon.node);
            });
        }

        if (!IBuff._buffIconPrefab) {
            loadResource('Prefab/UI/BuffIcon', cc.Prefab)
                .then((prefab) => IBuff._buffIconPrefab = prefab as unknown as cc.Prefab)
                .then(show);
        }
        else show();
    }
}

export class EffectOnce extends IBuff {
    constructor(coolDown) {super(coolDown)};

    protected static _appliedByUids: {[buffId: string]: {[uid: string]: boolean}} = {};

    public static clearAppliedByUids() {this._appliedByUids = {};}

    public static playerHasApplied(player: PlayerController, buff: IBuff): boolean {
        if (!EffectOnce._appliedByUids[buff.id]) EffectOnce._appliedByUids[buff.id] = {};
        if (EffectOnce._appliedByUids[buff.id][player.uid]){
            buff.isEnable = false;
            return true;
        }
        EffectOnce._appliedByUids[buff.id][player.uid] = true;
        return false;
    }
}

export class GetExited extends EffectOnce {
    public showName = "〈神諭〉 狂躁\n"
    public description = "當累計殺死十個敵人， 大幅增加傷害和跑速， 持續五秒。 效果可以疊加\n"
    public id = "GetExited";

    private readonly _killToEnable: number;
    private readonly _duration: number;
    private readonly _damageFactor: number;
    private readonly _speedFactor: number;

    private killCount: number = 0;

    constructor(killToEnable: number = 10, duration: number = 5, damageFactor: number = 150, speedFactor: number = 200) {
        super(0);
        this._killToEnable = killToEnable;
        this._duration = duration;
        this._damageFactor = damageFactor;
        this._speedFactor = speedFactor;
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return null;

        const onEnemyDie = ({enemyPosition, killByUid}) => {
            if (killByUid != player.uid) return;

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
        };

        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_DIE, onEnemyDie);

        return () => GameManager.instance.waveManager.event.off(WaveManager.ON_ENEMY_DIE, onEnemyDie);
    }
}

class RunAway extends EffectOnce {
    public showName = "〈神諭〉 走為上策\n"
    public description = "當你受傷， 立即重置衝刺的冷卻時間。 冷卻時間一秒。 "
    public id = "RunAway";

    constructor(coolDown: number = 1) {
        super(coolDown);
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return null;

        const onPlayerHurt = () => {

            if (this._coolDownTimer > 0) return;

            this.intoCoolDown(player);
            this.showBuffTriggered(player);

            player.dashCountDown = 0;
        };

        player.event.on(PlayerController.PLAYER_HURT, onPlayerHurt);

        return () => player.event.off(PlayerController.PLAYER_HURT, onPlayerHurt);
    }
}

class Guinsoo extends EffectOnce {
    public showName = "〈神諭〉 鬼索的狂暴之拳\n"
    public description = "當傷害敵人， 增加攻擊速度， 持續 6 秒。 效果疊加最多 6 次\n"
    public id = "Guinsoo";

    private readonly _duration: number;
    private readonly _attackSpeedFactor: number = 20;
    private readonly _maxStack: number = 5;
    private curStack: number = 0;

    constructor(duration: number = 6, attackSpeedFactor: number = 30, maxStack: number = 6) {
        super(0);
        this._attackSpeedFactor = attackSpeedFactor;
        this._maxStack = maxStack;
        this._duration = duration;
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return;

        const onEnemyHit = ({enemyPosition, killByUid}) => {
            if (this.curStack >= this._maxStack) return;
            if (killByUid != player.uid) return;

            this.showBuffTriggered(player);
            this.curStack++;
            player.mainWeapon.attackSpeed.percentageFactor += this._attackSpeedFactor;

            player.scheduleOnce(() => {
                this.curStack--;
                player.mainWeapon.attackSpeed.percentageFactor -= this._attackSpeedFactor;
            }, this._duration)
        }

        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_HIT, onEnemyHit, this);

        return () => GameManager.instance.waveManager.event.off(WaveManager.ON_ENEMY_HIT, onEnemyHit, this);
    }
}

class Tiamat extends EffectOnce {
    public showName = "〈神諭〉 提亞瑪特\n"
    public description = "當傷害敵人， 對周圍敵人造成傷害。 冷卻時間 0.5 秒\n"
    public id = "Tiamat";

    private readonly _prefabPath = 'Prefab/Projectile/Tiamat'
    private _prefab: cc.Prefab;


    private readonly _dealDamagePercentage: number = 20;

    constructor(coolDown: number = 0.5 ,damageFactor: number = 20) {
        super(coolDown);
        this._dealDamagePercentage = damageFactor;
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return;
        loadResource(this._prefabPath, cc.Prefab).then(
            (prefab) => this._prefab = prefab as unknown as cc.Prefab
        );

        const onEnemyHit = ({enemyPosition, killByUid}) => {
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
        };

        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_HIT, onEnemyHit, this);

        return () => GameManager.instance.waveManager.event.off(WaveManager.ON_ENEMY_HIT, onEnemyHit, this);
    }
}

class GA extends EffectOnce {
    public showName = "〈神諭〉 守護天使\n"
    public description = "當你受到致命傷害， 立即回復所有生命值， 並且無敵一秒。 冷卻時間 100 秒\n"
    public id = "GA";

    private _invincibleTime: number;

    constructor(invincibleTime: number = 1 ,coolDown: number = 100) {
        super(coolDown);
        this._invincibleTime = invincibleTime;
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return;

        const onPlayerHurt = (damageInfo) => {
            if (this._coolDownTimer > 0) return;
            if (player.currentHP.value > damageInfo.damage) return;

            this.intoCoolDown(player);
            this.showBuffTriggered(player);
            damageInfo.damage = 0;
            player.recover(player.maxHp.value);
            player.isInvincible++;
            player.scheduleOnce(() => {player.isInvincible--}, this._invincibleTime);
        };

        player.event.on(PlayerController.PLAYER_HURT, onPlayerHurt, this);

        return () => player.event.off(PlayerController.PLAYER_HURT, onPlayerHurt);
    }
}

class Mash extends EffectOnce {
    public showName = "〈神諭〉 瑪修\n"
    public description = "當玩家受傷， 召喚在周圍旋轉的護盾， 持續 5 秒。 冷卻時間 10 秒\n"
    public id = "Mash";

    private readonly _duration: number;
    private readonly _damage: number = 50;

    private readonly _prefabPath = 'Prefab/Projectile/SurroundShield'
    private _prefab: cc.Prefab;

    constructor(duration: number = 5, coolDown: number = 10, damage: number = 50) {
        super(coolDown);
        this._duration = duration;
        this._damage = damage;
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return;
        loadResource(this._prefabPath, cc.Prefab).then(
            (prefab) => this._prefab = prefab as unknown as cc.Prefab
        );

        const onPlayerHurt = (damageInfo) => {
            if (this._coolDownTimer > 0) return;

            this.intoCoolDown(player);
            this.showBuffTriggered(player);

            const proj = GameManager.instance.poolManager
                .createPrefab(this._prefab, true)
                .getComponent(ProjectileController);

            proj.node.setPosition(player.node.position);
            proj.init(
                new ProjectileAttr(
                    0,this._damage,
                    this._duration, 0,
                    0, true, 1),
                null,
                null,
                player.uid,
            );
            proj.node.parent = GameManager.instance.bulletLayer;
            proj.shootToTarget(player.node);
        };

        player.event.on(PlayerController.PLAYER_HURT, onPlayerHurt, this);

        return () => player.event.off(PlayerController.PLAYER_HURT, onPlayerHurt);
    }
}

class Yasuo extends EffectOnce {
    public showName = "〈神諭〉 快樂風男\n"
    public description = "衝刺時用風刃傷害周遭。 若在衝刺後立即殺死敵人， 立即重置衝刺的冷卻時間\n"
    public id = "Yasuo";

    private readonly _duration: number;
    private readonly _damage: number = 50;
    private readonly _resetTime: number = 0.2;

    private readonly _prefabPath = 'Prefab/Projectile/YasuoE'
    private _prefab: cc.Prefab;

    constructor(damage: number = 200) {
        super(0);
        this._duration = 0.5;
        this._damage = damage;
        this._resetTime = 0.2;
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return;
        loadResource(this._prefabPath, cc.Prefab).then(
            (prefab) => this._prefab = prefab as unknown as cc.Prefab
        );
        const onPlayerDash = () => {

            this.showBuffTriggered(player);

            const proj = GameManager.instance.poolManager
                .createPrefab(this._prefab, true)
                .getComponent(ProjectileController);

            proj.node.setPosition(player.node.position);
            proj.init(
                new ProjectileAttr(
                    0,this._damage,
                    this._duration, 0,
                    0, true, 1),
                null,
                null,
                player.uid,
            );
            proj.node.parent = GameManager.instance.bulletLayer;
            proj.shootToDirection(cc.Vec2.ZERO);

            let resetDash = ({killByUid}) => {
                console.log('Yasuo: resetDash', killByUid, player.uid);
                (killByUid == player.uid) && (player.dashCountDown = 0)
            }
            GameManager.instance.waveManager.event.once(WaveManager.ON_ENEMY_DIE, resetDash);
            player.scheduleOnce(() => {
                GameManager.instance.waveManager.event.off(WaveManager.ON_ENEMY_DIE, resetDash);
            }, this._resetTime);
        };

        player.event.on(PlayerController.PLAYER_DASH, onPlayerDash, this);

        return () => player.event.off(PlayerController.PLAYER_DASH, onPlayerDash);
    }
}

class Domino extends EffectOnce {
    public showName = "〈神諭〉 多米諾效應\n"
    public description = "當殺死敵人， 產生爆炸。 可以連鎖反應\n"
    public id = "Domino";

    private readonly _duration: number;
    private readonly _damage: number = 50;

    private readonly _prefabPath = 'Prefab/Projectile/Explosion'
    private _prefab: cc.Prefab;

    constructor(damage: number = 200) {
        super(0);
        this._duration = 0.5;
        this._damage = damage;
    }

    public _apply(player: PlayerController) {
        if (EffectOnce.playerHasApplied(player, this)) return;

        loadResource(this._prefabPath, cc.Prefab).then(
            (prefab) => this._prefab = prefab as unknown as cc.Prefab
        );

        const onEnemyDie = ({enemyPosition, killByUid}) => {

            this.showBuffTriggered(player);

            const proj = GameManager.instance.poolManager
                .createPrefab(this._prefab, true)
                .getComponent(ProjectileController);

            proj.node.setPosition(enemyPosition);
            proj.init(
                new ProjectileAttr(
                    0,this._damage,
                    this._duration, 0,
                    0, true, 1),
                null,
                null,
                player.uid,
            );
            proj.node.parent = GameManager.instance.bulletLayer;
            proj.shootToDirection(cc.Vec2.ZERO);
        };

        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_DIE, onEnemyDie, this);

        return () => GameManager.instance.waveManager.event.off(WaveManager.ON_ENEMY_DIE, onEnemyDie);
    }
}

class TrinityForces extends IBuff {
    public showName = "〈增幅〉 三相之力\n"
    public description = "獲得攻擊力、移動速度、攻擊速度\n"
    public id = "TrinityForces";

    private readonly _damagePercentage: number;
    private readonly _speedPercentage: number;
    private readonly _attackSpeedPercentage: number;

    constructor(damagePercentage: number = 30, speedPercentage: number = 30, attackSpeedPercentage: number = 30) {
        super(0);
        this._damagePercentage = damagePercentage;
        this._speedPercentage = speedPercentage;
        this._attackSpeedPercentage = attackSpeedPercentage;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.damage.percentageFactor += this._damagePercentage;
        player.moveSpeed.percentageFactor += this._speedPercentage;
        player.mainWeapon.attackSpeed.percentageFactor += this._attackSpeedPercentage;
    }
}

class IncreaseMoveSpeed extends IBuff {
    public showName = "〈增幅〉 敏捷\n"
    public description = "獲得移動速度\n"
    public id = "IncreaseMoveSpeed";

    private readonly _speedPercentage: number;

    constructor(speedPercentage: number = 30) {
        super(0);
        this._speedPercentage = speedPercentage;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.moveSpeed.percentageFactor += this._speedPercentage;
    }
}

class IncreaseAttackSpeed extends IBuff {
    public showName = "〈增幅〉 精準射擊\n"
    public description = "獲得攻擊速度\n"
    public id = "IncreaseAttackSpeed";

    private readonly _attackSpeedPercentage: number;

    constructor(attackSpeedPercentage: number = 100) {
        super(0);
        this._attackSpeedPercentage = attackSpeedPercentage;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.mainWeapon.attackSpeed.percentageFactor += this._attackSpeedPercentage;
    }
}

class IncreaseDamage extends IBuff {
    public showName = "〈增幅〉 巨人之力\n"
    public description = "你的武器造成更多傷害\n"
    public id = "IncreaseDamage";

    private readonly _damagePercentage: number;

    constructor(damagePercentage: number = 30) {
        super(0);
        this._damagePercentage = damagePercentage;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.damage.percentageFactor += this._damagePercentage;
    }
}

class IncreaseBounceTimes extends IBuff {
    public showName = "〈增幅〉 碰碰！\n"
    public description = "你的子彈的彈射次數增加\n"
    public id = "IncreaseBounceTimes";

    private readonly _bounceTimes: number;

    constructor(bounceTimes: number = 1) {
        super(0);
        this._bounceTimes = bounceTimes;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.bounceOnEnemyTimes.addFactor += this._bounceTimes;
    }
}

class IncreasePenetrateTimes extends IBuff {
    public showName = "〈增幅〉 咻咻！\n";
    public description = "你的子彈的穿透次數增加\n";
    public id = "IncreasePenetrateTimes";

    private readonly _penetrateTimes: number;

    constructor(penetrateTimes: number = 1) {
        super(0);
        this._penetrateTimes = penetrateTimes;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.penetrateTimes.addFactor += this._penetrateTimes;
    }
}

class GainMoreExp extends IBuff {
    public showName = "〈增幅〉 經驗增加\n";
    public description = "獲得更多經驗\n";
    public id = "GainMoreExp";

    private readonly _expPercentage: number;

    constructor(expPercentage: number = 50) {
        super(0);
        this._expPercentage = expPercentage;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.expGainPercentage.addFactor += this._expPercentage;
    }
}

class IncreaseMagnetRange extends IBuff {
    public showName = "〈增幅〉 磁鐵\n";
    public description = "掉落物的拾取距離增加\n";
    public id = "IncreaseMagnetRange";

    private readonly _rangePercentage: number;

    constructor(rangePercentage: number = 50) {
        super(0);
        this._rangePercentage = rangePercentage;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.node.getComponent(SearchDrop).searchRange *= 1.5;
    }
}

class BuyLife extends IBuff {
    public showName = "〈惡魔的低語〉 視錢如命\n";
    public description = "花費一些你在場內賺到的金幣， 恢復所有的生命值\n";
    public id = "BuyLife";

    private readonly _cost: number;

    constructor(cost: number = 10) {
        super(0);
        this._cost = cost;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.recover(1000);
        GameManager.instance.gameSystem.emitCoinChange(
            Math.max(-this._cost, -GameManager.instance.coinCnt.value));
    }
}

class SupersonicCharge extends IBuff {
    public showName = "〈惡魔的低語〉 超音速衝鋒\n";
    public description = "你衝刺的距離加倍。 增加衝刺的冷卻時間\n";
    public id = "SupersonicCharge";

    private readonly _speedPercentage: number;
    private readonly _coolDownAdd: number;

    constructor(speedPercentage: number = 100, coolDownAdd: number = 3) {
        super(0);
        this._speedPercentage = speedPercentage;
        this._coolDownAdd = coolDownAdd;
    }

    public _apply(player: PlayerController) {
        
        this.showBuffTriggered(player);
        player.dashSpeed.percentageFactor += this._speedPercentage;
        player.dashCoolDown.addFactor += this._coolDownAdd;
    }
}

class GlassCannon extends IBuff {
    public showName = "〈惡魔的低語〉 玻璃大炮\n";
    public description = "發射兩倍數量的子彈。 減少你的最大生命值兩點。 （該技能對最大生命值低於三點的角色沒有效果）\n";
    public id = "GlassCannon";

    private readonly _projectilePercentage: number;
    private readonly _hpReduce: number;

    constructor(projectilePercentage: number = 100, hpReduce: number = 2) {
        super(0);
        this._projectilePercentage = projectilePercentage;
        this._hpReduce = hpReduce;
    }

    public _apply(player: PlayerController) {
        
        if (player.maxHp.value <= this._hpReduce) return;

        this.showBuffTriggered(player);
        player.maxHp.addFactor -= this._hpReduce;
        player.mainWeapon.shotPerAttack.percentageFactor += this._projectilePercentage;
    }
}

class HeartSteel extends IBuff {
    public showName = "〈惡魔的低語〉 心之鋼\n";
    public description = "立即獲得一點永久最大生命。 隨著擊殺的敵人越多， 你的最大生命值會成長。 你的跑速降低。 你的武器傷害降低\n";
    public id = "HeartSteel";

    private readonly _hpAdd: number;
    private readonly _killCntToAddHp: number;
    private readonly _speedPercentage: number;
    private readonly _damagePercentage: number;

    private _killCnt: number;

    constructor(hpAdd: number = 1, killCntToAddHp: number = 10, speedPercentage: number = -30, damagePercentage: number = -20) {
        super(0);
        this._hpAdd = hpAdd;
        this._killCntToAddHp = killCntToAddHp;
        this._speedPercentage = speedPercentage;
        this._damagePercentage = damagePercentage;
        this._killCnt = 0;
    }

    public _apply(player: PlayerController) {
        

        let addHp = () => {
            this.showBuffTriggered(player);
            player.maxHp.addFactor += this._hpAdd;
            player.recover(this._hpAdd);
        }

        player.moveSpeed.percentageFactor -= this._speedPercentage;
        player.mainWeapon.projectileAttr.damage.percentageFactor -= this._damagePercentage;
        addHp();

        const onEnemyDie = ({enemyPosition, killByUid}) => {
            if (killByUid != player.uid) return;
            this._killCnt++;
            if (this._killCnt > 0 && this._killCnt % this._killCntToAddHp == 0) {
                addHp();
            }
        };

        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_DIE, onEnemyDie, this);
    }
}


let BuffsList: (typeof IBuff)[] = [
    GetExited, RunAway, Guinsoo, Tiamat, GA, Mash, Yasuo, Domino, // 神諭
    TrinityForces, IncreaseMoveSpeed, IncreaseAttackSpeed, IncreaseDamage, // 增幅
    IncreaseBounceTimes, IncreasePenetrateTimes, GainMoreExp, // 增幅
    BuyLife, SupersonicCharge, GlassCannon, HeartSteel, // 惡魔的低語
];

export let Buffs = {};
export let BuffsName: {[key: string]: string} = {};
export let BuffsDescription: {[key: string]: string} = {};

for (let i = 0; i < BuffsList.length; i++) {
    const inst = new BuffsList[i](0);
    Buffs[inst.id] = BuffsList[i];
    BuffsName[inst.id] = inst.showName;
    BuffsDescription[inst.id] = inst.description;
}