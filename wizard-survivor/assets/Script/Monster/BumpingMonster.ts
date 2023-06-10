import EnemyController from "../Controller/EnemyController";
import {AttrNum} from "../Helper/Attributes";
const {ccclass, property} = cc._decorator;

// this is a move very slow but can bump into player monster
@ccclass
export default class BumpingMonster extends EnemyController {

    private bumpingSpeed: number = 500;
    private bumpingDirection: cc.Vec2 = cc.Vec2.ZERO;
    private bumpingTime: number = -1;

    @property(AttrNum)
    private triggerRadius: AttrNum = new AttrNum();

    onLoad () {
        super.onLoad();
        this.triggerRadius.defaultValue = 200;
        this.skillCoolDown.defaultValue = 5;
    }

    update (dt) {
        if (this.skillCoolDownTime >= this.skillCoolDown.value  && this.bumpingTime < 0 && this.findClosestPlayer().sub(this.node.position).mag() < this.triggerRadius.value) {
            this.bumpingTime = 0;
            this.bumpingDirection = this.findClosestPlayer().sub(this.node.position).normalize();
            return;
        }
        else if (this.bumpingTime >= 0) {
            this.bumpingPlayer(dt);
            return;
        }

        if (this.skillCoolDownTime < this.skillCoolDown.value)
            this.skillCoolDownTime += dt;
        this.followPlayer();
        this.playAnim();
    }

    protected bumpingPlayer(dt) {
        this.bumpingTime += dt;
        if (this.bumpingTime < 0.5) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            // play ready to bump anim
        }
        else if (this.bumpingTime < 1.6) {
            this.rb.linearVelocity = this.bumpingDirection.mul(this.bumpingSpeed);
            // play bumping anim
        }
        else {
            this.bumpingTime = -1;
            this.skillCoolDownTime = 0;
        }
    }
}
