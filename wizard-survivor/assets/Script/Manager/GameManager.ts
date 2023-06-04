import InputManager from "./InputManager";
import PoolManager from "./PoolManager";
import resources = cc.resources;

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    public static get instance(): GameManager {
        if (!GameManager._instance){
            GameManager._instance = cc.find('Game').getComponent(GameManager);
        }
        return GameManager._instance;
    }

    public get canvas(): cc.Node {
        return this._canvas;
    }

    public inputManager: InputManager

    public poolManager: PoolManager


    private _canvas: cc.Node = null;

    private static _instance: GameManager = null;


    protected onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.game.addPersistRootNode(this.node);

        this.inputManager = this.node.addComponent(InputManager);
        this.poolManager = this.node.addComponent(PoolManager);
        this._canvas = cc.find('Canvas');
    }

    protected start(){
        this.generateGameScene();
    }


    private generateGameScene(){
        resources.load('Prefab/Player', cc.Prefab, (err, prefab) => {
            const player = cc.instantiate(prefab) as unknown as cc.Node;
            this.canvas.addChild(player);
        })
        resources.load('Prefab/Enemy', cc.Prefab, (err, prefab) => {
            const enemy = cc.instantiate(prefab) as unknown as cc.Node;
            this.canvas.addChild(enemy);
        })
    }
}
