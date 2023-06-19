import GameManager from "../Manager/GameManager";
import {Direction, ignoreZ, loadResource} from "../Helper/utils";
import {AttrNum} from "../Helper/Attributes";
import WeaponController from "./WeaponController";
import {ISearchTarget} from "../Helper/ISearchTarget";
import SearchDrop from "../Helper/SearchDrop";
import DropController from "./DropController";
import Game = cc.Game;
import {GameSystem} from "../Manager/GameSystem";
import {Buffs, IBuff} from "../Helper/Buff";
import PlayerAnimController from "./Anim/PlayerAnimController";
import * as buffer from "buffer";

const {ccclass, property} = cc._decorator;

/*
1. 負責玩家的移動＆衝刺
2. 創建並管理屬於該玩家的武器實例
3. 執行並管理套用在該玩家身上的 BUFF
 */
@ccclass
export default class PlayerController extends cc.Component{

    public event: cc.EventTarget;
    public static readonly PLAYER_START_MOVE: string = "PLAYER_START_MOVE";
    public static readonly PLAYER_STOP_MOVE: string = "PLAYER_STOP_MOVE";
    public static readonly PLAYER_ATTR_CHANGE: string = "PLAYER_ATTR_CHANGE";
    /* 事件：當玩家衝刺時觸發
    *
    * callbackFn: () => void
     */
    public static readonly PLAYER_DASH: string = "PLAYER_DASH";
    /* 事件：當玩家受傷害時觸發。可以通過修改 damageInfo.damage 來修改傷害數值
    *
    * callbackFn: (damageInfo: {damage: number}) => void */
    public static readonly PLAYER_HURT: string = "PLAYER_HURT";

    // Player Attributes:
    @property(AttrNum)
    public moveSpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public maxHp: AttrNum = new AttrNum();

    @property(AttrNum)
    public expGainPercentage: AttrNum = new AttrNum();

    @property(AttrNum)
    public dashCoolDown: AttrNum = new AttrNum();

    @property(AttrNum)
    public dashSpeed: AttrNum = new AttrNum();

    @property(cc.Prefab)
    public mainWeaponPrefab: cc.Prefab = null;

    public set dashCountDown(value: number){ this._dashCountDown = value }
    public get isInvincible(): number { return this._isInvincible }
    public set isInvincible(value: number){ this._isInvincible = value }

    public uid: string = "";
    public mainWeapon: WeaponController = null;
    public currentHP: AttrNum = new AttrNum();
    public appliedBuff: IBuff[] = [];

    private animCtrl: PlayerAnimController = null;
    private rb: cc.RigidBody = null;
    private phyCollider: cc.PhysicsCollider = null;
    private dropCollider: cc.CircleCollider = null;
    // private searchTarget: ISearchTarget = new SearchDrop;

    private readonly DENSITY: number = 1;

    private readonly DASH_DURATION: number = 0.1;
    private _dashCountDown: number = 0;
    private isDashing: boolean = false;
    private _isDead: boolean = false;
    private _isInvincible: number = 0;

    private movingDir: cc.Vec2 = cc.v2(0, 0);

    public normalMaterial: cc.Material = null;
    public hurtMaterial: cc.Material = null;
    private sprite: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ({keyCode}) => {
            if (keyCode == cc.macro.KEY.o) {
                this.hurt(1);
            }
        }, this);

        this.rb = this.node.getComponent(cc.RigidBody);
        this.phyCollider = this.node.getComponent(cc.PhysicsCollider);
        this.addComponent(SearchDrop);
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.animCtrl = this.node.getComponent(PlayerAnimController);
        this.dropCollider = this.node.getComponent(cc.CircleCollider);

        this.event = new cc.EventTarget();

        this.mainWeapon = this.mainWeaponPrefab? this.addWeapon(this.mainWeaponPrefab) : null

        // Attributes Change Event
        const attrOnCh = () => {this.event.emit(PlayerController.PLAYER_ATTR_CHANGE)};
        this.moveSpeed.onChangeCallback.push(attrOnCh);
        this.maxHp.onChangeCallback.push(attrOnCh);
        this.expGainPercentage.onChangeCallback.push(attrOnCh);
        this.dashCoolDown.onChangeCallback.push(attrOnCh);
        this.dashSpeed.onChangeCallback.push(attrOnCh);
        this.currentHP.onChangeCallback.push(attrOnCh);

        const weaponOnCh = () => {this.event.emit(PlayerController.PLAYER_ATTR_CHANGE)};
        this.mainWeapon.attackSpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.shotPerAttack.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.shootSpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.damage.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.flySpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.existDuration.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.bounceOnEnemyTimes.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.penetrateTimes.onChangeCallback.push(weaponOnCh);

        this.currentHP.onChangeCallback.push(this.checkIsDead.bind(this));

        this.sprite = this.node.getChildByName("Sprite").getComponent(cc.Sprite);
        this.normalMaterial = this.sprite.getMaterial(0);
        loadResource("Material/Blood", cc.Material).then((mat: cc.Material) => {
            this.hurtMaterial = mat;
        });
    }

    start(){
        this.event.emit(PlayerController.PLAYER_STOP_MOVE)
        this.currentHP.defaultValue = this.maxHp.value;
        this._isDead = false;
    }

    update(dt: number) {
        if (this._isDead){
            this.rb.linearVelocity = cc.Vec2.ZERO;
            return;
        }

        this._dashCountDown -= dt;
        if (!this.isDashing){
            this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        const drop = other.node.getComponent(DropController);
        drop && drop.collectBy(this.node);
    }

    onDisable() {
        for (let buff of this.appliedBuff){
            buff.remove(this);
        }
    }


    // PUBLIC METHODS:
    public hurt(damage: number){
        if (this._isDead) return;
        if (this._isInvincible > 0) return;

        const damageInfo = {damage: damage};
        this.event.emit(PlayerController.PLAYER_HURT, damageInfo);
        damage = damageInfo.damage; // 讓事件的 callback 可以修改傷害數值

        const deltaHP = Math.min(this.currentHP.value, damage);
        if (GameManager.instance.isLocalUid(this.uid))
            GameManager.instance.gameSystem.emitPlayerHPChange(this.uid, -damage);

        GameManager.instance.particleManager.createParticle("Red Explosion", this.node.position, 0.005, 1);

        let bloodEnd = () => {
            this.sprite.setMaterial(0, this.normalMaterial);
        };

        this.sprite.setMaterial(0, this.hurtMaterial);
        this.schedule(bloodEnd, 0.5);

        GameManager.instance.audioManager.playEffect("hurt");
    }

    public recover(val: number) {
        if (this._isDead) return;

        const deltaHP = Math.min(this.maxHp.value - this.currentHP.value, val);
        GameManager.instance.gameSystem.emitPlayerHPChange(this.uid, deltaHP);
    }

    public addWeapon(weaponPrefab: cc.Prefab): WeaponController {
        if (this._isDead) return;

        const weapon = cc.instantiate(this.mainWeaponPrefab).getComponent(WeaponController);
        weapon.node.parent = this.node;
        weapon.init(this);
        return weapon;
    }

    public setMovingDir(newDir: cc.Vec2){
        if (this._isDead) return;

        if (this.movingDir.equals(cc.v2(0, 0))  && !newDir.equals(cc.v2(0, 0))){
            this.event.emit(PlayerController.PLAYER_START_MOVE);
            this.animCtrl.state = {...this.animCtrl.state, isMoving: true};
        }
        else if (!this.movingDir.equals(cc.v2(0, 0)) && newDir.equals(cc.v2(0, 0))){
            this.event.emit(PlayerController.PLAYER_STOP_MOVE);
            this.animCtrl.state = {...this.animCtrl.state, isMoving: false};
        }
        this.movingDir = newDir;
        this.animCtrl.state = {
            ...this.animCtrl.state,
            faceLeftOrRight: this.movingDir.x<0? -1 : (this.movingDir.x>0? 1 : 0)
        };
    }

    public dash(){
        if (this._isDead) return;
        if (this.isDashing || this._dashCountDown>0) return;
        this.phyCollider.enabled = false;
        this.animCtrl.state = {...this.animCtrl.state, isDashing: true};
        this.event.emit(PlayerController.PLAYER_DASH);
        this.isDashing = true;
        this._dashCountDown = this.dashCoolDown.value;
        this.rb.linearVelocity = this.movingDir.mul(this.dashSpeed.value);
        this.scheduleOnce(()=>{
            this.isDashing = false;
            this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
            this.animCtrl.state = {...this.animCtrl.state, isDashing: false};
            this.phyCollider.enabled = true;
        }, this.DASH_DURATION);
    }

    public addBuff(buff: IBuff){
        if (this._isDead) return;

        buff._apply(this);
        this.appliedBuff.push(buff);
        this.event.emit(PlayerController.PLAYER_ATTR_CHANGE, buff);
    }


    // HELPER METHODS:
    // protected collectDrop() {
    //     if (this._isDead) return;
    //
    //     while (this.getComponent(SearchDrop).getTarget()) {
    //         let target = this.getComponent(SearchDrop).getTarget();
    //         target.getComponent(DropController).collectBy(this.node);
    //     }
    // }

    protected checkIsDead(){
        if (this._isDead) return;

        if (this.currentHP.value <= 0){
            this._isDead = true;
            this.phyCollider.enabled = false;
            // this.rb.type = cc.RigidBodyType.Kinematic;
            this.rb.linearVelocity = cc.v2(0, 0);

            this.animCtrl.afterDeadCallback = () => {
                GameManager.instance.endGame();
            }
            this.animCtrl.state = {
                ...this.animCtrl.state,
                isDead: true
            }
        }
    }
}
