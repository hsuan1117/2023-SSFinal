import {nodeDistanceSqr} from "../Helper/utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FaceTo extends cc.Component {

    private faceTo: cc.Node = null;
    private rotateTarget: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:
    update(dt: number) {
        if (this.faceTo && this.faceTo.isValid) {
            this.rotateTarget.angle = this.faceTo.convertToWorldSpaceAR(cc.Vec2.ZERO)
                                            .sub(this.rotateTarget.convertToWorldSpaceAR(cc.Vec2.ZERO))
                                            .signAngle(cc.Vec2.RIGHT) * 180 / Math.PI * -1;
        }
    }

    // PUBLIC METHODS:
    public init(rotateTarget: cc.Node) {
        this.rotateTarget = rotateTarget;
    }

    public setFaceTo(faceTo: cc.Node) {
        this.faceTo = faceTo;
    }
}
