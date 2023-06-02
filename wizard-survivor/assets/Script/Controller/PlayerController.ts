import GameManager from "../Manager/GameManager";
import {Direction} from "../Utils/utils";
import Game = cc.Game;
import {AttrNum} from "./Attributes";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    @property(AttrNum)
    public moveSpeed: AttrNum;

    @property(AttrNum)
    public maxHp: AttrNum;

    @property(cc.Integer)
    public expGainPercentage: number = 100;

    @property(cc.Prefab)
    public mainWeaponPrefab: cc.Prefab = null;

    //==================================================================================================================

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

    //==================================================================================================================

    protected onLoad(){
        this.rb = this.node.getComponent(cc.RigidBody);
    }

    protected update(dt: number) {
        this.setMovingDir();
        this.rb.linearVelocity = this.movingDir.mulSelf(this.moveSpeed.value);
    }

    //==================================================================================================================

    protected setMovingDir(){
        let dirSum = cc.v2(0, 0);
        for (let key in this.keyToDir){
            if (GameManager.instance.inputManager.isKeyPressing(parseInt(key))){
                dirSum.addSelf(this.keyToDir[key]);
            }
        }
        this.movingDir = dirSum.normalize();
    }
}
