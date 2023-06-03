const {ccclass, property} = cc._decorator;

@ccclass
export default class DropController extends cc.Component {
    public isCollected: boolean = false; // turn to false if Drop in queue

    public dropType: string = "exp"; // "coin", "exp", "health pack", "chest"

    public dropValue: number = 1;

    public collector: cc.Node = null;

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
        // add half win size to collector position
        let collectorPos = this.collector.position.add(cc.v3(480, 320, 0));
        this.node.position = this.node.position.lerp(collectorPos, 0.1);
        if (this.node.position.sub(collectorPos).magSqr() < 10) {
            // add state to collector
            this.node.destroy();
        }
    }
}