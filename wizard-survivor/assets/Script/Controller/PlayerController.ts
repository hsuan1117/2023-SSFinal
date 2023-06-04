import GameManager from "../Manager/GameManager";
import {Direction, ignoreZ} from "../Helper/utils";
import {AttrNum} from "../Helper/Attributes";
import WeaponController from "./WeaponController";
import {ISearchTarget} from "../Helper/ISearchTarget";
import SearchDrop from "../Helper/SearchDrop";
import DropController from "./DropController";
import {ExplosionOnDashBuff} from "../Helper/Buff";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

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

    public mainWeapon: WeaponController = null;

    public currentHP: AttrNum = new AttrNum(10);

    private rb: cc.RigidBody = null;
    private searchTarget: ISearchTarget = new SearchDrop;

    private readonly DENSITY: number = 1;

    private readonly DASH_DURATION: number = 0.1;
    private dashCountDown: number = 0;
    private isDashing: boolean = false;

    private movingDir: cc.Vec2 = cc.v2(0, 0);
    private keyToDir: {} = {
        [cc.macro.KEY.w]: Direction.UP,
        [cc.macro.KEY.s]: Direction.DOWN,
        [cc.macro.KEY.a]: Direction.LEFT,
        [cc.macro.KEY.d]: Direction.RIGHT,
    }


    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        this.rb = this.node.getComponent(cc.RigidBody);
        this.addComponent(SearchDrop);
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;

        this.event = new cc.EventTarget();
        // this.event.on(PlayerController.PLAYER_START_MOVE, ()=>{console.log(PlayerController.PLAYER_START_MOVE)}, this);
        // this.event.on(PlayerController.PLAYER_STOP_MOVE, ()=>{console.log(PlayerController.PLAYER_STOP_MOVE)}, this);
        this.event.on(PlayerController.PLAYER_DASH, ()=>{console.log(PlayerController.PLAYER_DASH)}, this);

        GameManager.instance.inputManager.event.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.mainWeapon = this.addWeapon(this.mainWeaponPrefab)

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
    }

    start(){
        this.event.emit(PlayerController.PLAYER_STOP_MOVE)
    }

    update(dt: number) {
        this.dashCountDown -= dt;
        this.setMovingDir();
        if (!this.isDashing){
            this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
        }
        this.collectDrop();
    }


    // PUBLIC METHODS:
    public addWeapon(weaponPrefab: cc.Prefab): WeaponController {
        const weapon = cc.instantiate(this.mainWeaponPrefab).getComponent(WeaponController);
        weapon.node.parent = this.node;
        weapon.init(this);
        return weapon;
    }

    // HELPER METHODS:
    protected onKeyDown({keyCode}) {
        if (keyCode === cc.macro.KEY.space) {
            this.dash();
        }

        // for DEBUG
        if (keyCode === cc.macro.KEY.q) {
            const buff = new ExplosionOnDashBuff();
            buff.execute(this);
        }
    }

    protected setMovingDir(){
        let dirSum = cc.v2(0, 0);
        for (let key in this.keyToDir){
            if (GameManager.instance.inputManager.isKeyPressing(parseInt(key))){
                dirSum.addSelf(this.keyToDir[key]);
            }
        }
        if (this.movingDir.equals(cc.v2(0, 0))  && !dirSum.equals(cc.v2(0, 0))){
            this.event.emit(PlayerController.PLAYER_START_MOVE);
        }
        else if (!this.movingDir.equals(cc.v2(0, 0)) && dirSum.equals(cc.v2(0, 0))){
            this.event.emit(PlayerController.PLAYER_STOP_MOVE);
        }
        this.movingDir = dirSum.normalize();
    }

    protected dash(){
        if (this.isDashing || this.dashCountDown>0) return;
        this.event.emit(PlayerController.PLAYER_DASH);
        this.isDashing = true;
        this.dashCountDown = this.dashCoolDown.value;
        this.rb.linearVelocity = this.movingDir.mul(this.dashSpeed.value);
        this.scheduleOnce(()=>{
            this.isDashing = false;
            this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
        }, this.DASH_DURATION);
    }

    protected collectDrop() {
        while (this.getComponent(SearchDrop).getTarget()) {
            let target = this.getComponent(SearchDrop).getTarget();
            target.getComponent(DropController).collectBy(this.node);
        }
    }
}
