import {nodeDistanceSqr} from "./utils";

const {ccclass, property} = cc._decorator;

import {ISearchTarget} from "./ISearchTarget";
import EnemyController from "../Controller/EnemyController";

@ccclass
export default class SearchEnemy extends cc.Component implements ISearchTarget{
    // set searchRange(value: number) {
    //     this._searchRange = value;
    // }

    get searchRange(): number {
        return this._searchRange;
    }

    private _searchRange: number = 270;


    // PUBLIC METHODS:
    /*
    獲取在攻擊範圍內最近的敵人，若無回傳 null
     */
    public getTarget(): cc.Node {
        const pos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const rec = new cc.Rect(pos.x - this._searchRange, pos.y - this._searchRange, 2*this._searchRange, 2*this._searchRange);
        const aabbRes = cc.director.getPhysicsManager().testAABB(rec);

        let minDistance = Infinity;
        let target: cc.Node = null;

        for (const pc of aabbRes){
            if (this.isTarget(pc.node)){
                const distance = nodeDistanceSqr(this.node, pc.node);
                if (distance < minDistance){
                    minDistance = distance;
                    target = pc.node;
                }
            }
        }
        return target;
    }


    // HELPERS:
    private isTarget(target: cc.Node): boolean {
        return target?.isValid &&
            target.getComponent(EnemyController)?.searchable &&
                target.getComponent(EnemyController)?.isDead == false;
    }
}
