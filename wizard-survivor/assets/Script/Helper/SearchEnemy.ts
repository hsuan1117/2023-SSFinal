const {ccclass, property} = cc._decorator;

import {ISearchTarget} from "./ISearchTarget";
import {Deque} from '@datastructures-js/deque';
import EnemyController from "../Controller/EnemyController";

@ccclass
export default class SearchEnemy extends cc.Component implements ISearchTarget{

    set searchRange(value: number) {
        this.collider.radius = value;
        this._searchRange = value;
    }

    @property({type: cc.Integer, tooltip: "搜索範圍", visible: true})
    private _searchRange: number = 100;

    private collider: cc.CircleCollider = null;

    private targetQueue: Deque<cc.Node> = new Deque<cc.Node>();

    onLoad() {
        this.collider = this.node.addComponent(cc.CircleCollider);
        this.collider.radius = this._searchRange;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        if (this.isTarget(other.node)){
            this.targetQueue.pushBack(other.node);
        }
    }

    public getTarget(): cc.Node {
        while (this.targetQueue.size() && !this.isTarget(this.targetQueue.front())){
            this.targetQueue.popFront();
        }
        return this.targetQueue.size()? this.targetQueue.front(): null;
    }

    private isTarget(target: cc.Node): boolean {
        return target.getComponent(EnemyController)?.searchable &&
                target.position.sub(this.node.position).magSqr() <= this._searchRange * this._searchRange;
    }
}
