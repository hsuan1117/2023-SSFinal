import EnemyController from "../Controller/EnemyController";
import {AttrNum} from "../Helper/Attributes";
import {ignoreZ} from "../Helper/utils";
const {ccclass, property} = cc._decorator;

// this is a move very slow but can bump into player monster
@ccclass
export default class BumpingMonster extends EnemyController {

    private bumpingSpeed: number = 500;
    private bumpingDirection: cc.Vec2 = cc.Vec2.ZERO;
    private bumpingStartPos: cc.Vec2 = cc.Vec2.ZERO;
    private bumpingTime: number = -1;

    @property(AttrNum)
    private triggerRadius: AttrNum = new AttrNum();


    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == 'Enemy' && this.bumpingTime != -1) {
            contact.disabled = true;
            return;
        }
    }

    onLoad () {
        super.onLoad();
    }

    protected skillTrigger() {
        this.bumpingTime = 0;
        this.bumpingStartPos = ignoreZ(this.node.position);
        this.bumpingDirection = this.findClosestPlayer().sub(this.node.position).normalize();
        this.animCtrl.state = {...this.animCtrl.state, isMoving: false};
    }

    update (dt) {
        if (this.skillCoolDownTime >= this.skillCoolDown.value  && this.bumpingTime < 0 && this.findClosestPlayer().sub(this.node.position).mag() < this.triggerRadius.value) {
            this.skillTrigger();
            return;
        }
        else if (this.bumpingTime >= 0) {
            this.bumpingPlayer(dt);
            return;
        }

        // skill cool down
        if (this.skillCoolDownTime < this.skillCoolDown.value)
            this.skillCoolDownTime += dt;

        super.update(dt);
    }

    protected bumpingPlayer(dt) {
        this.bumpingTime += dt;
        if (this.bumpingTime < 0.5) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            // play ready to bump anim
        }
        else if (this.bumpingStartPos.sub(ignoreZ(this.node.position)).mag() < this.triggerRadius.value + 50) {
            this.rb.linearVelocity = this.bumpingDirection.mul(this.bumpingSpeed);
            // play bumping anim
        }
        else {
            this.bumpingTime = -1;
            this.skillCoolDownTime = 0;
        }
    }
}
