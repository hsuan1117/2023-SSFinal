import GameManager from "../Manager/GameManager";
import {Direction, ignoreZ} from "../Helper/utils";
import {AttrNum} from "../Helper/Attributes";
import WeaponController from "./WeaponController";
import {ISearchTarget} from "../Helper/ISearchTarget";
import SearchDrop from "../Helper/SearchDrop";
import DropController from "./DropController";
import Game = cc.Game;
import {GameSystem} from "../Manager/GameSystem";
import {Buffs, IBuff} from "../Helper/Buff";
import PlayerAnimController from "./Anim/PlayerAnimController";

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
    public static readonly PLAYER_DASH: string = "PLAYER_DASH";
    public static readonly PLAYER_ATTR_CHANGE: string = "PLAYER_ATTR_CHANGE";

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

    public uid: string = "";
    public mainWeapon: WeaponController = null;
    public currentHP: AttrNum = new AttrNum(10);
    public killEnemyCnt: AttrNum = new AttrNum(0);
    public appliedBuff: IBuff[] = [];

    private animCtrl: PlayerAnimController = null;
    private rb: cc.RigidBody = null;
    private searchTarget: ISearchTarget = new SearchDrop;

    private readonly DENSITY: number = 1;

    private readonly DASH_DURATION: number = 0.1;
    private dashCountDown: number = 0;
    private isDashing: boolean = false;

    private movingDir: cc.Vec2 = cc.v2(0, 0);

    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        this.rb = this.node.getComponent(cc.RigidBody);
        this.addComponent(SearchDrop);
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.animCtrl = this.node.getComponent(PlayerAnimController);

        this.event = new cc.EventTarget();

        // For Debug, press Q to apply ExplosionOnDash buff
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ({keyCode})=>{
            if (keyCode == cc.macro.KEY.q){
                GameManager.instance.gameSystem.emitApplyBuff(this.uid, "ExplosionOnDash");
            }
        })

        this.mainWeapon = this.mainWeaponPrefab? this.addWeapon(this.mainWeaponPrefab) : null

        // Attributes Change Event
        const attrOnCh = () => {this.event.emit(PlayerController.PLAYER_ATTR_CHANGE)};
        this.moveSpeed.onChangeCallback.push(attrOnCh);
        this.maxHp.onChangeCallback.push(attrOnCh);
        this.expGainPercentage.onChangeCallback.push(attrOnCh);
        this.dashCoolDown.onChangeCallback.push(attrOnCh);
        this.dashSpeed.onChangeCallback.push(attrOnCh);
        this.currentHP.onChangeCallback.push(attrOnCh);
        this.killEnemyCnt.onChangeCallback.push(attrOnCh);

        const weaponOnCh = () => {this.event.emit(PlayerController.PLAYER_ATTR_CHANGE)};
        this.mainWeapon.attackSpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.shotPerAttack.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.shootSpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.damage.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.flySpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.existDuration.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.bounceOnEnemyTimes.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.penetrateTimes.onChangeCallback.push(weaponOnCh);
    }

    start(){
        this.event.emit(PlayerController.PLAYER_STOP_MOVE)
    }

    update(dt: number) {
        this.dashCountDown -= dt;
        if (!this.isDashing){
            this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
        }
        this.collectDrop();
    }


    // PUBLIC METHODS:
    public hurt(damage: number){
        const deltaHP = Math.min(this.currentHP.value, damage);
        GameManager.instance.gameSystem.emitPlayerHPChange(this.uid, -damage);
    }

    public recover(val: number) {
        const deltaHP = Math.min(this.maxHp.value - this.currentHP.value, val);
        GameManager.instance.gameSystem.emitPlayerHPChange(this.uid, deltaHP);
    }

    public addWeapon(weaponPrefab: cc.Prefab): WeaponController {
        const weapon = cc.instantiate(this.mainWeaponPrefab).getComponent(WeaponController);
        weapon.node.parent = this.node;
        weapon.init(this);
        return weapon;
    }

    public setMovingDir(newDir: cc.Vec2){
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
        if (this.isDashing || this.dashCountDown>0) return;
        this.animCtrl.state = {...this.animCtrl.state, isDashing: true};
        this.event.emit(PlayerController.PLAYER_DASH);
        this.isDashing = true;
        this.dashCountDown = this.dashCoolDown.value;
        this.rb.linearVelocity = this.movingDir.mul(this.dashSpeed.value);
        this.scheduleOnce(()=>{
            this.isDashing = false;
            this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
            this.animCtrl.state = {...this.animCtrl.state, isDashing: false};
        }, this.DASH_DURATION);
    }

    public addBuff(buff: IBuff){
        buff._apply(this);
        this.appliedBuff.push(buff);
        this.event.emit(PlayerController.PLAYER_ATTR_CHANGE, buff);
    }


    // HELPER METHODS:
    protected collectDrop() {
        while (this.getComponent(SearchDrop).getTarget()) {
            let target = this.getComponent(SearchDrop).getTarget();
            target.getComponent(DropController).collectBy(this.node);
        }
    }
}
