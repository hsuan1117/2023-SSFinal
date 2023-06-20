import GameManager from "../Manager/GameManager";
import {ignoreZ, loadResource} from "../Helper/utils";
import {AttrNum} from "../Helper/Attributes";
import DamagePlayerOnCollide from "./DamagePlayerOnCollide";
import WaveManager from "../Manager/WaveManager";
import EnemyAnimController from "./Anim/EnemyAnimController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyController extends cc.Component {

    public searchable: boolean = true;
    protected readonly DENSITY: number = 10;
    protected readonly LINEAR_DAMP: number = 100;
    public rb: cc.RigidBody = null;
    public animCtrl: EnemyAnimController = null;

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

    public get isDead(): boolean { return this._isDead; }

    protected normalMaterial: cc.Material = null;
    protected hurtMaterial: cc.Material = null;
    protected sprite: cc.Sprite = null;

    protected skillCoolDownTime: number = 0;

    protected isBossFight: boolean = false;

    protected _collider: cc.PhysicsCollider = null;
    protected _isDead: boolean = false;


    // LIFE-CYCLE CALLBACKS:
     onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this._collider = this.node.getComponent(cc.PhysicsCollider);
        this.rb.enabledContactListener = true;
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
        this.addComponent(DamagePlayerOnCollide).init(this.collideDamage.value, this.collideDamageCoolDown.value);
        this.animCtrl = this.node.getComponent(EnemyAnimController);
        this.animCtrl.initState();
        this.sprite = this.node.getChildByName("Sprite").getComponent(cc.Sprite);
        this.normalMaterial = this.sprite.getMaterial(0);
        loadResource("Material/Flash", cc.Material).then((mat: cc.Material) => {
            this.hurtMaterial = mat;
        });
    }

    playAnim() {
        if (this._isDead)
            return;

         if (this.rb.linearVelocity.x > 0)
             this.animCtrl.state = {...this.animCtrl.state, faceLeftOrRight: 1};
         else if (this.rb.linearVelocity.x < 0)
             this.animCtrl.state = {...this.animCtrl.state, faceLeftOrRight: -1};
         else
             this.animCtrl.state = {...this.animCtrl.state, faceLeftOrRight: 0};

    }

    protected update(dt: number) {
         if (this._isDead){
             this._collider.enabled = false;
         }
        if (!this.isBossFight) this.followPlayer();
        else this.runAwayFromPlayer();
        this.playAnim();
    }


    // PUBLIC METHODS:
    public init(factor) {
         this.hp.reset();
         this.hp.percentageFactor = factor * 100;
         this.skillCoolDownTime = 0;
         this.animCtrl.initState();
         this.isBossFight = false;
         this.searchable = true;
         this._collider.enabled = true;
         this._isDead = false;
         this.node.scaleY = 1;
    }

    private flashEnd() {
         this.sprite.setMaterial(0, this.normalMaterial);
    }

    public hurt(damage: number, byUid: string) {
        GameManager.instance.waveManager.event.emit(
            WaveManager.ON_ENEMY_HIT,
            {
                enemyPosition: this.node.getPosition(),
                killByUid: byUid,
                damage: damage
            }
        )
        GameManager.instance.audioManager.playEffect('enemy_hit');

        this.hp.addFactor -= damage;
        this.sprite.setMaterial(0, this.hurtMaterial);
        this.unschedule(this.flashEnd);
        this.schedule(this.flashEnd, 0.1);


        if (this.hp.value <= 0) {
            this.dead(byUid);
        }
        // GameManager.instance.audioManager.playEffect("miner_s3_hurt");
    }

    public retreat() {
         this.isBossFight = true;
         this.searchable = false;
    }

    protected runAwayFromPlayer() { // For Boss fight
        let target = this.findClosestPlayer();
        if (!target) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            this.selfDestroy();
            return;
        }
        if (target.sub(this.node.position).mag() > 800) {
            this.selfDestroy();
            return;
        }
        let direction = target.sub(this.node.position);
        this.rb.linearVelocity = ignoreZ(direction.normalize().mul(-3 * this.moveSpeed.value));
    }

    protected followPlayer() { // For Boss fight
         if (this._isDead) return;
        let target = this.findClosestPlayer();
        if (!target) {
            this.rb.linearVelocity = cc.Vec2.ZERO;
            return;
        }
        this.animCtrl.state = {...this.animCtrl.state, isMoving: true};
        if (target.sub(this.node.position).mag() > 1000) {
            this.selfDestroy();
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
         this._isDead = true;
         this.node.scaleY = 0.8;
         // this.rb.linearVelocity = ignoreZ(this.node.position.sub(GameManager.instance.playerManager.getPlayer(killByUid).node.position).normalize().mul(800));
         this.animCtrl.state = {...this.animCtrl.state, isDead: true};
         GameManager.instance.waveManager.event.emit(WaveManager.ON_ENEMY_DIE, {
            enemyPosition: this.node.getPosition(),
            killByUid: killByUid
         });

         this.scheduleOnce(() => {
             this.selfDestroy();
             GameManager.instance.particleManager.createParticle("Enemy Explosion", this.node.position, 0, 1);
         }, 1);
    }

    protected selfDestroy() {
        GameManager.instance.poolManager.recycle(this.node);
        WaveManager.enemyCount--;
    }

    protected findClosestPlayer() {
        let target = null, minDistance = 10000000000;
        GameManager.instance.playerManager.allPlayerIDs.forEach((id) => {
            let player = GameManager.instance.playerManager.getPlayer(id);
            if (player && player.node.position.sub(this.node.position).mag() < minDistance) {
                minDistance = player.node.position.sub(this.node.position).mag();
                target = player.node.position;
            }
        });
        if (!target) {
            this.selfDestroy();
            return null;
        }
        return target;
    }

    protected knockBack() {
         const knockBackSpeedScale = 50;
         const speed = this.rb.linearVelocity.neg();
         // this.rb.applyForceToCenter(speed.mul(knockBackSpeedScale), true);
         this.rb.linearVelocity = (speed.mul(knockBackSpeedScale));
    }
}
