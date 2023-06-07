import ProjectileController from "./ProjectileController";
import PlayerController from "./PlayerController";
import GameManager from "../Manager/GameManager";
import {ignoreZ} from "../Helper/utils";
import {AttrNum} from "../Helper/Attributes";
import PlayerStatUI from "../UI/PlayerStatUI";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyController extends cc.Component {

    public searchable: boolean = true;
    private readonly DENSITY: number = 10;
    private readonly LINEAR_DAMP: number = 100;
    private rb: cc.RigidBody = null;

    private targetPlayer: cc.Node = null;

    @property(AttrNum)
    public moveSpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public skillCoolDown: AttrNum = new AttrNum();

    public hp: number = 100;

    // LIFE-CYCLE CALLBACKS:
     onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.moveSpeed.defaultValue = 60;
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
    }

     update(dt: number) {
    }

    runAwayFromPlayer() { // For Boss fight
        let target = this.findClosestPlayer();
        if (!target) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            return;
        }
        let direction = target.sub(this.node.position);
        this.rb.linearVelocity = ignoreZ(direction.normalize().mul(-2 * this.moveSpeed.value));
    }

    followPlayer() { // For Boss fight
        let target = this.findClosestPlayer();
        if (!target) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            return;
        }
        let direction = target.sub(this.node.position);
        let distance = direction.mag();
        if (distance > 10) {
            this.rb.linearVelocity = ignoreZ(direction.normalize().mul(this.moveSpeed.value));
        }
        else {
            this.rb.linearVelocity = cc.Vec2.ZERO;
        }
    }

    protected dead() {
        // TODO put into pool
        this.node.destroy();
    }

    private findClosestPlayer() {
        let target = null, minDistance = 10000000000;
        GameManager.instance.playerManager.allPlayerIDs.forEach((id) => {
            let player = GameManager.instance.playerManager.getPlayer(id);
            if (player.node.position.sub(this.node.position).mag() < minDistance) {
                minDistance = player.node.position.sub(this.node.position).mag();
                target = player.node.position;
            }
        });
        return target;
    }
}
