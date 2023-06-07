import EnemyController from "./EnemyController";
import {ProjectileAttr} from "../Helper/Attributes";
import GameManager from "../Manager/GameManager";
import requireComponent = cc._decorator.requireComponent;
import Collider = cc.Collider;
import {eightDirections} from "../Helper/utils";

const {ccclass, property} = cc._decorator;

@ccclass
@requireComponent(cc.RigidBody)
@requireComponent(cc.Collider)
export default class ProjectileController extends cc.Component {

    private projectileAttr: ProjectileAttr = null;
    private rb: cc.RigidBody = null;
    private onHitCallback: Function = null;

    private readonly bounceMixRandomRate: number = 0.4;
    private bounceCnt: number = 0;
    private bounceDir: cc.Vec2 = null;
    private penetrateCnt: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.rb = this.getComponent(cc.RigidBody);
        this.rb.bullet = true
    }

    onCollisionEnter(other: Collider, self: Collider){}

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        const enemy = other.getComponent(EnemyController);
        if (enemy) {
            this.onHitCallback && this.onHitCallback({enemy: enemy, projectile: this});

            if (this.bounceCnt < this.projectileAttr.bounceOnEnemyTimes.value) {
                this.bounceCnt++;
                const newDir =
                    this.bounceDir
                    .mul(this.bounceMixRandomRate)
                    .add(this.rb.linearVelocity.normalize().neg().mul(1 - this.bounceMixRandomRate))
                    .normalize();

                this.rb.linearVelocity = newDir.mul(this.projectileAttr.flySpeed.value);
            }
            else if (this.penetrateCnt < this.projectileAttr.penetrateTimes.value) {
                this.penetrateCnt++;
            }
            else {
                this.deleteProjectile();
            }
        }
    }


    // PUBLIC METHODS:
    public init(projectileAttr: ProjectileAttr, onHitCallback: Function = null, bounceDirIdx: number = 0) {
        this.projectileAttr = projectileAttr;
        this.onHitCallback = onHitCallback;
        this.bounceCnt = 0;
        this.bounceDir = eightDirections[bounceDirIdx];
        this.penetrateCnt = 0;
    }

    public shootToDirection(direction: cc.Vec2) {
        this.rb.linearVelocity = direction.mul(this.projectileAttr.flySpeed.value);
        this.scheduleOnce(() => {
            this.deleteProjectile()
        }, this.projectileAttr.existDuration.value)
    }


    // HELPERS:
    private deleteProjectile(){
        this.unschedule(this.deleteProjectile);
        GameManager.instance.poolManager
            .recycle(this.node);
    }
}
