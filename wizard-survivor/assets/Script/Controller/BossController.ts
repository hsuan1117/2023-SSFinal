import GameManager from "../Manager/GameManager";
import EnemyAnimController from "./Anim/EnemyAnimController";
import {AttrNum} from "../Helper/Attributes";
import {ignoreZ, loadResource} from "../Helper/utils";
import WaveManager from "../Manager/WaveManager";
import DamagePlayerOnCollide from "./DamagePlayerOnCollide";
import EnemyController from "./EnemyController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossController extends EnemyController {

    // LIFE-CYCLE CALLBACKS:
    protected skillTriggeredTime: number = 0;
    protected skillLastTime: number = 3;
    public isBoss: boolean = true;
    private startFight: boolean = false;

    onLoad () {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.rb.enabledContactListener = true;
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
        this.addComponent(DamagePlayerOnCollide).init(this.collideDamage.value, this.collideDamageCoolDown.value);
        this.animCtrl = this.node.getComponent(EnemyAnimController);
        this.animCtrl.initState();
        this.sprite = this.node.getChildByName("Sprite").getComponent(cc.Sprite);
        this.skillCoolDownTime = this.skillCoolDown.value;
    }

    start () {
        this.searchable = false;
        GameManager.instance.waveManager.setWave(0);
    }

    update (dt) {
        if (!this.startFight && this.node.position.sub(this.findClosestPlayer()).mag() < 300) {
            this.startBossFight();
        }
        if (this.startFight) this.attack();
        this.followPlayer();
        this.playAnim();
    }

    public hurt(damage: number, byUid: string) {
        GameManager.instance.waveManager.event.emit(
            WaveManager.ON_ENEMY_HIT,
            {
                enemyPosition: this.node.getPosition(),
                killByUid: byUid
            }
        )
        this.hp.addFactor -= damage;
        if (this.hp.value <= 0) {
            this.dead(byUid);
        }
        // GameManager.instance.audioManager.playEffect("miner_s3_hurt");
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
            return;
        }
        if (this.skillTriggeredTime > this.skillLastTime) {
            this.animCtrl.state = {...this.animCtrl.state, isSkill: false};
            this.skillCoolDownTime = this.skillCoolDown.value;
        } else {
            this.animCtrl.state = {...this.animCtrl.state, isSkill: true};
            this.skillTriggeredTime += cc.director.getDeltaTime();
        }
    }

    protected dead(killByUid: string) {
        this.animCtrl.state = {...this.animCtrl.state, isDead: true};

        this.scheduleOnce(() => {
            this.selfDestroy();
            GameManager.instance.particleManager.createParticle("Open Chest", this.node.position, 0.2, 3);
        }, 1);

        GameManager.instance.waveManager.event.emit(WaveManager.ON_ENEMY_DIE, {
            enemyPosition: this.node.getPosition(),
            killByUid: killByUid
        });

    }
}
