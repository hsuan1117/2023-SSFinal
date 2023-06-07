import Game = cc.Game;
import GameManager from "../Manager/GameManager";
import PlayerController from "./PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DropController extends cc.Component {
    public isCollected: boolean = false; // turn to false if Drop in queue

    public dropType: string = "exp"; // "coin", "exp", "health pack", "chest"

    public dropValue: number = 1;

    public collector: cc.Node = null;

    private firstCollect: boolean = false;

    private speedRatio: number = 0;

    onLoad() {
        // add collider
        let collider = this.node.addComponent(cc.CircleCollider);
        collider.radius = 20;
    }

    protected update(dt: number) {
        if (this.isCollected) {
            this.magnetic();
        }
    }

    public collectBy(collector: cc.Node) {
        this.collector = collector;
        this.isCollected = true;

        // add exp
        if (this.dropType === "exp") {
            const player = collector.getComponent(PlayerController)
            GameManager.instance.exp.addFactor += Math.floor(this.dropValue * player.expGainPercentage.value);
        }
    }

    protected magnetic() {
        if (!this.firstCollect) {
            this.firstCollect = true;
            this.speedRatio = -0.5;
        } else {
            if (Math.abs(this.speedRatio) < 0.05) {
                this.speedRatio += 0.01;
            } else {
                this.speedRatio += 0.05;
            }
        }
        let collectorPos = this.collector.position;
        this.node.position = this.node.position.lerp(collectorPos, this.speedRatio * 0.1);
        if (this.node.position.sub(collectorPos).magSqr() < 15) {
            // add state to collector
            this.node.destroy();
        }
    }
}