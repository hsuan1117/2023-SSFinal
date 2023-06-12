import GameManager from "../Manager/GameManager";
import {ignoreZ} from "../Helper/utils";
import {AttrNum} from "../Helper/Attributes";
import DamagePlayerOnCollide from "./DamagePlayerOnCollide";
import WaveManager from "../Manager/WaveManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyController extends cc.Component {

    public searchable: boolean = true;
    private readonly DENSITY: number = 10;
    private readonly LINEAR_DAMP: number = 100;
    public rb: cc.RigidBody = null;

    @property(AttrNum)
    public moveSpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public skillCoolDown: AttrNum = new AttrNum();

    @property(AttrNum)
    public hp: AttrNum = new AttrNum();

    @property(AttrNum)
    public collideDamage: AttrNum = new AttrNum();

    @property(AttrNum)
    public collideDamageCoolDown: AttrNum = new AttrNum();

    protected skillCoolDownTime: number = 0;


    // LIFE-CYCLE CALLBACKS:
     onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.rb.enabledContactListener = true;
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
        this.addComponent(DamagePlayerOnCollide).init(this.collideDamage.value, this.collideDamageCoolDown.value);
    }

    playAnim() {
         // change to controller
         if (this.rb.linearVelocity.x >= 0)
             this.node.scaleX = 1;
         else
             this.node.scaleX = -1;
    }

    protected update(dt: number) {
        this.followPlayer();
        this.playAnim();
    }


    // PUBLIC METHODS:
    public init() {
         this.hp.reset();
         this.skillCoolDownTime = 0;
    }

    public hurt(damage: number, byUid: string) {
        this.hp.addFactor -= damage;
        if (this.hp.value <= 0) {
            this.dead(byUid);
        }
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

    protected dead(killByUid: string) {
        GameManager.instance.waveManager.event.emit(WaveManager.ON_ENEMY_DIE, {
            enemyPosition: this.node.getPosition(),
            killByUid: killByUid
        });
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
