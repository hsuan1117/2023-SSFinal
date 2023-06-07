import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

/*
1. 管理所有 Player Instance
2. 提供靜態的方法取得 Player Instance
 */
@ccclass
export default class PlayerManager extends cc.Component {
    public event: cc.EventTarget = new cc.EventTarget();
    public static PLAYER_CREATED: string = 'PLAYER_CREATED';

    public get allPlayerIDs(): string[]{
        return Object.keys(this.playerNodes);
    }

    private playerNodes: {[id: string]: cc.Node} = {};


    // PUBLIC METHODS
    public getPlayerNodeByID(id: string): cc.Node{
        return this.playerNodes[id];
    }

    /*
    實例化一個 Player，並加入場景樹
     */
    public createPlayer(id: string){
        cc.resources.load('Prefab/Player', cc.Prefab, (err, prefab) => {
            const player = cc.instantiate(prefab) as unknown as cc.Node;
            GameManager.instance.node.addChild(player);
            this.playerNodes[id] = player;
            this.event.emit(PlayerManager.PLAYER_CREATED, id);
        });
    }
}
