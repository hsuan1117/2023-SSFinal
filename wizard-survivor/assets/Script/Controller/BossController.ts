import GameManager from "../Manager/GameManager";
import EnemyAnimController from "./Anim/EnemyAnimController";
import {AttrNum, ProjectileAttr} from "../Helper/Attributes";
import {ignoreZ, loadResource} from "../Helper/utils";
import WaveManager from "../Manager/WaveManager";
import DamagePlayerOnCollide from "./DamagePlayerOnCollide";
import EnemyController from "./EnemyController";
import ProjectileController from "./ProjectileController";
import EnemyProjectileController from "./EnemyProjectileController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossController extends EnemyController {

    // LIFE-CYCLE CALLBACKS:
    protected skillTriggeredTime: number = 0;
    protected skillLastTime: number = 3;
    public isBoss: boolean = true;
    private startFight: boolean = false;

    private surroundBulletPrefab: cc.Prefab = null;

    onLoad () {
        super.onLoad();
        loadResource("Prefab/Projectile/SurroundBullet", cc.Prefab).then((prefab: cc.Prefab) => {
            this.surroundBulletPrefab = prefab;
        });
    }

    start () {
        this.searchable = false;
    }

    update (dt) {
        if (!this.startFight && this.node.position.sub(this.findClosestPlayer()).mag() < 350) {
            this.startBossFight();
        }
        if (!this.startFight) return;
        if (!this.attack()) this.followPlayer();
        this.playAnim();
    }

    protected startBossFight() {
        this.startFight = true;
        this.searchable = true;
        this.skillCoolDownTime = 0;
        this.roar();
        this.retreatEnemy();
    }

    protected retreatEnemy() {
        for (let enemy of GameManager.instance.playerEnemyLayer.children) {
            let enemyController = enemy.getComponent(EnemyController);
            if (enemy.getComponent(BossController)) continue;
            if (enemyController)
                enemyController.retreat();
        }
    }

    protected roar() {
        GameManager.instance.particleManager.createParticle("Roar", cc.v3(5 * this.node.scaleX, 20, 0), 0.2, 1, this.node);
    }

    protected attack() {
        if (this.skillCoolDownTime > 0) {
            this.skillCoolDownTime -= cc.director.getDeltaTime();
            this.skillTriggeredTime = 0;
            return 0;
        }
        this.rb.linearVelocity = cc.Vec2.ZERO;
        if (this.skillTriggeredTime > this.skillLastTime) {
            this.animCtrl.state = {...this.animCtrl.state, isSkill: false};
            this.skillCoolDownTime = this.skillCoolDown.value;
            this.surroundBullet();
        } else {
            this.animCtrl.state = {...this.animCtrl.state, isSkill: true};
            this.skillTriggeredTime += cc.director.getDeltaTime();
        }
        return 1;
    }

    protected surroundBullet() {
        let bullet = GameManager.instance.poolManager.createPrefab(this.surroundBulletPrefab);
        bullet.parent = GameManager.instance.bulletLayer;
        bullet.position = this.node.position; // need to be adjusted
        let controller = bullet.getComponent(EnemyProjectileController);

        controller.init(
            new ProjectileAttr(
                0, 1,
                3, 0,
                0, true, 1),
            null,
            null,
            null,
        );
        controller.shootToTarget(this.node);
    }

    protected dead(killByUid: string) {
        this.animCtrl.state = {...this.animCtrl.state, isDead: true};

        this.scheduleOnce(() => {
            this.selfDestroy();
            GameManager.instance.particleManager.createParticle("Open Chest", this.node.position, 0.2, 3);
            GameManager.instance.waveManager.setWave(GameManager.instance.waveManager.currentWaveNumber + 1);
        }, 1);

        GameManager.instance.waveManager.event.emit(WaveManager.ON_ENEMY_DIE, {
            enemyPosition: this.node.getPosition(),
            killByUid: killByUid
        });

    }
}
