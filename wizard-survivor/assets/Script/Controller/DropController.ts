import Game = cc.Game;
import GameManager from "../Manager/GameManager";
import PlayerController from "./PlayerController";
import {GameSystem} from "../Manager/GameSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DropController extends cc.Component {
    public isCollected: boolean = false; // turn to false if Drop in queue

    @property({tooltip: "必須為：'coin', 'exp', 'health pack', 'chest' 之一"})
    public dropType: string = "exp"; // "coin", "exp", "health pack", "chest"

    @property({tooltip: "掉落數值"})
    public dropValue: number = 1;

    public static readonly DROP_TYPE_COIN = 'coin';
    public static readonly DROP_TYPE_EXP = 'exp';
    public static readonly DROP_TYPE_HEALTH_PACK = 'health pack';
    public static readonly DROP_TYPE_CHEST = 'chest';


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
            if (this.dropType == DropController.DROP_TYPE_EXP) {
                GameManager.instance.gameSystem.emitExpChange(this.dropValue);
                GameManager.instance.audioManager.playEffect('collect_exp');
            }
            else if (this.dropType == DropController.DROP_TYPE_COIN) {
                GameManager.instance.gameSystem.emitCoinChange(this.dropValue);
                GameManager.instance.audioManager.playEffect('collect_coin');
            }
            else if (this.dropType == DropController.DROP_TYPE_HEALTH_PACK){
                this.collector.getComponent(PlayerController).recover(this.dropValue);
                GameManager.instance.audioManager.playEffect('heal');
            }

            this.node.destroy();
        }
    }
}