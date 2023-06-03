const {ccclass, property} = cc._decorator;

@ccclass
export default class DropController extends cc.Component {
    @property({type: cc.Boolean, tooltip: "是否已被收集", visible: true})
    public isCollected: boolean = false; // turn to false if Drop in queue

    public dropType: string = "exp"; // "coin", "exp", "health pack", "chest"

    public dropValue: number = 1;

    @property({type: cc.Node, tooltip: "收集者", visible: true})
    public collector: cc.Node = null;

    protected update(dt: number) {
        if (this.collector) {
            this.magnetic();
        }
    }

    protected collectBY(collector: cc.Node) {
        this.collector = collector;
        // do something
    }

    protected magnetic() {
        this.node.position = this.node.position.lerp(this.collector.position, 0.1);
        if (this.node.position.sub(this.collector.position).magSqr() < 10) {
            // add state to collector
            this.node.destroy();
        }
    }
}