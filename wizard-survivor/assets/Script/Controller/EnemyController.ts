import ProjectileController from "./ProjectileController";
import PlayerController from "./PlayerController";
import GameManager from "../Manager/GameManager";
import {ignoreZ} from "../Helper/utils";
import {AttrNum} from "../Helper/Attributes";
import PlayerStatUI from "../UI/PlayerStatUI";
import PlayerAnimController from "./Anim/PlayerAnimController";
import EnemyAnimController from "./Anim/EnemyAnimController";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyController extends cc.Component {

    @property(AttrNum)
    public moveSpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public skillCoolDown: AttrNum = new AttrNum();

    @property(AttrNum)
    public hp: AttrNum = new AttrNum();

    protected skillCoolDownTime: number = 0;

    public searchable: boolean = true;
    private readonly DENSITY: number = 10;
    private readonly LINEAR_DAMP: number = 100;
    public rb: cc.RigidBody = null;
    private animCtrl: EnemyAnimController = null;



    // LIFE-CYCLE CALLBACKS:
     onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
        this.animCtrl = this.node.getComponent(EnemyAnimController);
    }

    playAnim() {
         // change to controller
         if (this.rb.linearVelocity.x >= 0)
             this.node.scaleX = 1;
         else
             this.node.scaleX = -1;
    }

    protected runAwayFromPlayer() { // For Boss fight
        let target = this.findClosestPlayer();
        if (!target) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            return;
        }
        let direction = target.sub(this.node.position);
        this.rb.linearVelocity = ignoreZ(direction.normalize().mul(-2 * this.moveSpeed.value));
    }

    protected followPlayer() { // For Boss fight
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
        GameManager.instance.poolManager.recycle(this.node);
    }

    protected findClosestPlayer() {
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
