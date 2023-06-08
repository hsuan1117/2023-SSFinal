import PlayerController from "./PlayerController";
import color = cc.color;

const {ccclass, property} = cc._decorator;

@ccclass
export default class DamagePlayerOnCollide extends cc.Component {

    public damage: number;
    public coolDown: number

    private countDown = 0;

    public init(damage: number, coolDown: number) {
        this.damage = damage;
        this.coolDown = coolDown;
    }

    // LIFE-CYCLE CALLBACKS:
    update(dt: number) {
        this.countDown -= dt;
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        // console.log('Enemy Hit Player: ', otherCollider.name)!
        const player = otherCollider.getComponent(PlayerController);
        if (this.countDown<=0 && player){
            player.hurt(this.damage);
            this.countDown = this.coolDown;
        }
    }
}
