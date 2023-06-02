const {ccclass, property} = cc._decorator;

export interface ISearchTarget {
    searchRange: number;
    getTarget(): cc.Node;
}