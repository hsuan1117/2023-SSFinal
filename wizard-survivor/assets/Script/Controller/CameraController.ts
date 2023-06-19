import GameManager from "../Manager/GameManager";
import Game = cc.Game;
import listFiles = jsb.fileUtils.listFiles;
import PlayerManager from "../Manager/PlayerManager";
import PlayerController from "./PlayerController";

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

    onEnable() {
        GameManager.instance.event.on(GameManager.ON_GAME_LOGIC_READY, this.onGameLogicReady, this);
    }

    onDisable() {
        GameManager.instance.event.on(GameManager.ON_GAME_LOGIC_READY, this.onGameLogicReady, this);
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


    // HELPERS
    private onGameLogicReady(){
        for (let uid of GameManager.instance.localUids){
            const player = GameManager.instance.playerManager.getPlayer(uid);
            player.event.on(PlayerController.PLAYER_HURT, this.shake, this)
        }
    }

    private shake(){
        const shakeDistance = 4;
        const shakeAction = cc.sequence(
            cc.moveBy(0.02, cc.v2(shakeDistance, shakeDistance)),
            cc.moveBy(0.05, cc.v2(-shakeDistance, -shakeDistance)),
            cc.moveBy(0.05, cc.v2(-shakeDistance, -shakeDistance)),
            cc.moveBy(0.05, cc.v2(shakeDistance, shakeDistance)),
        );
        this.node.runAction(shakeAction);
    }
}
