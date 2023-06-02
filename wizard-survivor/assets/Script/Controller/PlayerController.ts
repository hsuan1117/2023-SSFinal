import GameManager from "../Manager/GameManager";
import {Direction} from "../Utils/utils";
import Game = cc.Game;
import {AttrNum} from "./Attributes";
import WeaponController from "./WeaponController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    @property(AttrNum)
    public moveSpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public maxHp: AttrNum = new AttrNum();

    @property(cc.Integer)
    public expGainPercentage: number = 100;

    @property(cc.Prefab)
    public mainWeaponPrefab: cc.Prefab = null;

    public event: cc.EventTarget;
    public static readonly PLAYER_START_MOVE: string = "PLAYER_START_MOVE";
    public static readonly PLAYER_STOP_MOVE: string = "PLAYER_STOP_MOVE";

    public currentEXP: number = 0;

    public currentHP: number = 10;

    private movingDir: cc.Vec2 = cc.v2(0, 0);

    private rb: cc.RigidBody = null;

    private keyToDir: {} = {
        [cc.macro.KEY.w]: Direction.UP,
        [cc.macro.KEY.s]: Direction.DOWN,
        [cc.macro.KEY.a]: Direction.LEFT,
        [cc.macro.KEY.d]: Direction.RIGHT,
    }


    onLoad(){
        this.rb = this.node.getComponent(cc.RigidBody);

        this.event = new cc.EventTarget();
        this.event.on(PlayerController.PLAYER_START_MOVE, ()=>{console.log(PlayerController.PLAYER_START_MOVE)}, this);
        this.event.on(PlayerController.PLAYER_STOP_MOVE, ()=>{console.log(PlayerController.PLAYER_STOP_MOVE)}, this);

        this.addWeapon(this.mainWeaponPrefab)
    }

    start(){
        this.event.emit(PlayerController.PLAYER_STOP_MOVE)
    }

    public addWeapon(weaponPrefab: cc.Prefab){
        const weapon = cc.instantiate(this.mainWeaponPrefab).getComponent(WeaponController);
        weapon.node.parent = this.node;
        weapon.player = this;
        weapon.init();
    }

    protected update(dt: number) {
        this.setMovingDir();
        this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
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
}
