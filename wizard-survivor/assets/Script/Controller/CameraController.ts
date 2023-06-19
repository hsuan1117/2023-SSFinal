import GameManager from "../Manager/GameManager";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {

    @property
    public lerpRatio: number = 0.1;
    // LIFE-CYCLE CALLBACKS:

    private initPos: cc.Vec3 = cc.v3(480, 320, 0);

    private freeze: boolean = false;

    public set freezeCamera(freeze: boolean){
        this.freeze = freeze;
    }

    update (dt) {
        let targetPos = cc.v3(0, 0);
        if (this.freeze) return;

        let cnt = 0;
        for (let uid of GameManager.instance.playerManager.allPlayerIDs){
            const pos = GameManager.instance.playerManager.getPlayerNodeByID(uid)?.position;
            pos && (++cnt) && targetPos.addSelf(pos);
        }
        if (cnt){
            targetPos.divSelf(cnt);
            this.node.position = this.node.position.lerp(targetPos.add(this.initPos), this.lerpRatio);
        }
        else{
            this.node.setPosition(this.initPos);
        }
    }
}
