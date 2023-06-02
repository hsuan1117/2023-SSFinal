import {nodeDistanceSqr} from "../Helper/utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FaceTo extends cc.Component {

    public faceTo: cc.Node = null;
    public rotateTarget: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:
    update(dt: number) {
        if (this.faceTo && this.faceTo.isValid) {
            this.rotateTarget.angle = this.faceTo.convertToWorldSpaceAR(cc.Vec2.ZERO)
                                            .sub(this.rotateTarget.convertToWorldSpaceAR(cc.Vec2.ZERO))
                                            .signAngle(cc.Vec2.RIGHT) * 180 / Math.PI * -1;
        }
    }
}
