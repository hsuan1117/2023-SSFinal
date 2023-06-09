import GameManager from "../Manager/GameManager";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {

    @property
    public lerpRatio: number = 0.1;
    // LIFE-CYCLE CALLBACKS:

    private initPos: cc.Vec3 = cc.v3(480, 320, 0);

    update (dt) {
        let targetPos = cc.v3(0, 0);
        if (GameManager.instance.playerManager.allPlayerIDs.length == 0) return;
        for (let uid of GameManager.instance.playerManager.allPlayerIDs){
            targetPos.addSelf(GameManager.instance.playerManager.getPlayerNodeByID(uid).position);
        }
        targetPos.divSelf(GameManager.instance.playerManager.allPlayerIDs.length);
        console.log('targetPos: ', targetPos.toString());
        this.node.position = this.node.position.lerp(targetPos.add(this.initPos), this.lerpRatio);
    }
}
