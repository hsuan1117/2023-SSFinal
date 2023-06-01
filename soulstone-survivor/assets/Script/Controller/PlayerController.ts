import GameManager from "../Manager/GameManager";
import {Direction} from "../Utils/utils";
import CharaAttr from "./CharaAttr";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {
    private movingDir: cc.Vec2 = cc.v2(0, 0);
    private attr: CharaAttr = null;
    private rb: cc.RigidBody = null;
    private keyToDir: {} = {
        [cc.macro.KEY.w]: Direction.UP,
        [cc.macro.KEY.s]: Direction.DOWN,
        [cc.macro.KEY.a]: Direction.LEFT,
        [cc.macro.KEY.d]: Direction.RIGHT,
    }

    protected onLoad(){
        this.attr = new CharaAttr(300);
        this.rb = this.node.getComponent(cc.RigidBody);
    }

    protected update(dt: number) {
        this.setMovingDir();
        this.rb.linearVelocity = this.movingDir.mulSelf(this.attr.moveSpeed);
    }

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
