import GameManager from "../Manager/GameManager";
import EnemyAnimController from "./Anim/EnemyAnimController";
import {AttrNum, ProjectileAttr} from "../Helper/Attributes";
import {ignoreZ, loadResource, padZ} from "../Helper/utils";
import WaveManager from "../Manager/WaveManager";
import DamagePlayerOnCollide from "./DamagePlayerOnCollide";
import EnemyController from "./EnemyController";
import ProjectileController from "./ProjectileController";
import EnemyProjectileController from "./EnemyProjectileController";
import random = cc.random;
import CameraController from "./CameraController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossController extends EnemyController {

    // LIFE-CYCLE CALLBACKS:
    protected skillTriggeredTime: number = 0;
    protected skillLastTime: number = 3;
    public isBoss: boolean = true;
    private startFight: boolean = false;

    private surroundBulletPrefab: cc.Prefab = null;
    private missilePrefab: cc.Prefab = null;
    private skillCnt: number = 0;

    onLoad () {
        super.onLoad();
        loadResource("Prefab/Projectile/SurroundBullet", cc.Prefab).then((prefab: cc.Prefab) => {
            this.surroundBulletPrefab = prefab;
        });
        loadResource("Prefab/Projectile/Missile", cc.Prefab).then((prefab: cc.Prefab) => {
            this.missilePrefab = prefab;
        });
    }

    start () {
        this.searchable = false;
    }

    update (dt) {
        if (!this.startFight && this.node.position.sub(this.findClosestPlayer()).mag() < 350) {
            this.startBossFight();
        }
        if (!this.startFight) {
            this.followPlayer();
            this.playAnim();
            return;
        }
        if (!this.attack()) this.followPlayer();
        this.playAnim();
    }

    public init(factor: number) {
        super.init(factor);
        this.node.scaleY = 2;
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
            if (this.skillCnt++ % 2 == 0)
                this.surroundBullet();
            else
                this.missisle(GameManager.instance.rand.random());
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
                5, true, 1),
            null,
            null,
            null,
        );
        controller.shootToTarget(this.node);
    }

    private rotateVec(vec: cc.Vec2, angle: number) {
        // rotate a vector by angle(rad)
        // use trigonometric function
        let x = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
        let y = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
        return cc.v2(x, y);
    }

    protected missisle(bias: number) {
        // create 8 missiles in a circle
        for (let i = 0; i < 8; i++) {
            let bullet = GameManager.instance.poolManager.createPrefab(this.missilePrefab);
            bullet.parent = GameManager.instance.bulletLayer;
            bullet.position = this.node.position.add(padZ(this.rotateVec(cc.v2(0, 80), i * Math.PI / 4 + bias * 3.14)));
            let controller = bullet.getComponent(EnemyProjectileController);

            controller.init(
                new ProjectileAttr(
                    300, 1,
                    10, 10,
                    0, false),
                null,
                0,
                null,
            );
            //controller.aimToTarget(this.findClosestPlayer().node);
            controller.shootToDirection(this.rotateVec(cc.v2(0, 80), i * Math.PI / 4 + bias * 3.14).normalize());
        }
    }

    protected dead(killByUid: string) {
        this.animCtrl.state = {...this.animCtrl.state, isDead: true};

        this.scheduleOnce(() => {
            this.selfDestroy();
            GameManager.instance.particleManager.createParticle("Open Chest", this.node.position, 0.2, 3);
            GameManager.instance.waveManager.setWave(Math.min(11, GameManager.instance.waveManager.currentWaveNumber + 1));
        }, 1);

        GameManager.instance.waveManager.event.emit(WaveManager.ON_ENEMY_DIE, {
            enemyPosition: this.node.getPosition(),
            killByUid: killByUid
        });

    }

    protected selfDestroy() {
        let camera = cc.Camera.main.getComponent(CameraController);
        camera.freezeCamera = false;
        super.selfDestroy();
    }
}
