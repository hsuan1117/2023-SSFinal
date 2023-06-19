import EnemyController from "../Controller/EnemyController";
import {AttrNum, ProjectileAttr} from "../Helper/Attributes";
import {ignoreZ, loadResource} from "../Helper/utils";
import GameManager from "../Manager/GameManager";
import EnemyProjectileController from "../Controller/EnemyProjectileController";
const {ccclass, property} = cc._decorator;

// this is a move very slow but can bump into player monster
@ccclass
export default class BumpingMonster extends EnemyController {

    @property(AttrNum)
    private triggerRadius: AttrNum = new AttrNum();

    private bulletPrefab: cc.Prefab = null;

    private skillTriggerTime: number = -1;

    onLoad () {
        super.onLoad();
        loadResource('Prefab/Projectile/SkeletonBullet', cc.Prefab).then((prefab:cc.Prefab) => {
            this.bulletPrefab = prefab;
        });
    }

    protected skillTrigger() {
        this.skillTriggerTime = 0;
        this.animCtrl.state = {...this.animCtrl.state, isMoving: false};
    }

    update (dt) {
        if (this.skillCoolDownTime >= this.skillCoolDown.value && this.skillTriggerTime == -1 && this.findClosestPlayer().sub(this.node.position).mag() < this.triggerRadius.value) {
            this.skillTrigger();
            return;
        }
        else if (this.skillTriggerTime >= 0) {
            this.shootBullet(dt);
            return;
        }

        this.skillCoolDownTime += dt;

        if (this.isBossFight) this.runAwayFromPlayer();
        else if (this.findClosestPlayer().sub(this.node.position).mag() > this.triggerRadius.value) this.followPlayer();

        this.playAnim();
    }

    protected shootBullet(dt) {
        this.skillTriggerTime += dt;
        if (this.skillTriggerTime < 0.5) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            // play ready to bump anim
        }
        else { // end
            let bullet = GameManager.instance.poolManager.createPrefab(this.bulletPrefab);
            bullet.parent = GameManager.instance.bulletLayer;
            let controller = bullet.getComponent(EnemyProjectileController);
            let dir = this.findClosestPlayer().sub(this.node.position).normalize();
            bullet.position = (this.node.position).add(dir.mul(20));

            controller.init(
                new ProjectileAttr(
                    200, 1,
                    10, 0,
                    0, false),
                null,
                null,
                null,
            );

            controller.shootToDirection(dir);
            // rotate the sprite
            let angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI;
            bullet.getChildByName("Sprite").angle = angle;

            this.skillTriggerTime = -1;
            this.skillCoolDownTime = 0;
        }
    }
}
