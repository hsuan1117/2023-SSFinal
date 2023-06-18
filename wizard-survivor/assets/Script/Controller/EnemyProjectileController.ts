import EnemyController from "./EnemyController";
import {ProjectileAttr} from "../Helper/Attributes";
import GameManager from "../Manager/GameManager";
import requireComponent = cc._decorator.requireComponent;
import Collider = cc.Collider;
import {eightDirections, ignoreZ} from "../Helper/utils";
import PlayerController from "./PlayerController";
import director = cc.director;

const {ccclass, property} = cc._decorator;

@ccclass
@requireComponent(cc.RigidBody)
@requireComponent(cc.Collider)
export default class EnemyProjectileController extends cc.Component {

    public get shootByUid(): string {
        return this._shootByUid;
    }

    private projectileAttr: ProjectileAttr = null;
    private rb: cc.RigidBody = null;
    private onHitCallback: Function = null;

    private readonly bounceMixRandomRate: number = 0.4;
    private _shootByUid: string = null;
    private bounceCnt: number = 0;
    private bounceDir: cc.Vec2 = null;
    private penetrateCnt: number = 0;

    private existCountDown: number = 0;
    private lockTarget: cc.Node = null;
    private _animation: cc.Animation = null;
    private aimTarget: cc.Node = null;
    private aimTime: number = 0;
    private aimTimeCnt: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.rb = this.getComponent(cc.RigidBody);
        this.rb.bullet = true
        this._animation = this.node.getChildByName('Sprite').getComponent(cc.Animation);
    }

    onCollisionEnter(other: Collider, self: Collider){}

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        const player = other.getComponent(PlayerController);
        if (player) {
            player.hurt(1);
            GameManager.instance.particleManager.createParticle("White Explosion", this.node.position, 0.1, 0.5);
            this.deleteProjectile();
        }
        if (other.node.group == "Camera") {
            if (!this.projectileAttr.notFly){
                if (this.bounceCnt < this.projectileAttr.bounceOnEnemyTimes.value) {
                    this.bounceCnt++;
                    const newDir =
                        this.bounceDir
                            .mul(this.bounceMixRandomRate)
                            .add(this.rb.linearVelocity.normalize().neg().mul(1 - this.bounceMixRandomRate))
                            .normalize();

                    this.rb.linearVelocity = newDir.mul(this.projectileAttr.flySpeed.value);
                }
            }
        }
    }

    update(dt: number) {
        if (this.lockTarget){
            this.node.setPosition(this.node.position.lerp(this.lockTarget.position, this.projectileAttr.lockTargetLerpRatio));
        }
        this.existCountDown -= dt;
        if (this.existCountDown <= 0){
            this.deleteProjectile();
        }
    }


    // PUBLIC METHODS:
    public init(projectileAttr: ProjectileAttr, onHitCallback: Function = null, bounceDirIdx: number = 0, shootByUid: string = null) {
        this.projectileAttr = projectileAttr;
        this.onHitCallback = onHitCallback;
        this.bounceCnt = 0;
        this.bounceDir = eightDirections[bounceDirIdx];
        this.penetrateCnt = 0;
        this._shootByUid = shootByUid;
    }

    public aimToTarget(target: cc.Node, time: number = 0.2){
        this.aimTarget = target;
        this.aimTime = time;
    }

    public shootToDirection(direction: cc.Vec2) {
        this.rb.linearVelocity = direction.mul(this.projectileAttr.flySpeed.value);
        this.existCountDown = this.projectileAttr.existDuration.value;
        if (this._animation) this._animation.play();
    }

    public shootToTarget(lockTarget: cc.Node) {
        const dir = lockTarget.position.sub(this.node.position).normalize();
        this.lockTarget = lockTarget;
        // this.node.parent = lockTarget.parent;
        this.shootToDirection(ignoreZ(dir));
    }

    // HELPERS:
    private deleteProjectile(){
        GameManager.instance.poolManager.recycle(this.node);
    }
}
