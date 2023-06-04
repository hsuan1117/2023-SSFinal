const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyController extends cc.Component {

    public searchable: boolean = true;
    private readonly DENSITY: number = 10;
    private readonly LINEAR_DAMP: number = 100;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
    }

}
