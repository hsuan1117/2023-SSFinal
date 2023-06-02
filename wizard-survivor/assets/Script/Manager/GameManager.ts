import InputManager from "./InputManager";
import resources = cc.resources;
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    private static _instance: GameManager = null;

    private canvas: cc.Node = null;
    public inputManager: InputManager

    public static get instance(): GameManager {
        if (!GameManager._instance){
            GameManager._instance = cc.find('Game').getComponent(GameManager);
        }
        return GameManager._instance;
    }

    protected onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.game.addPersistRootNode(this.node);
        this.inputManager = this.node.addComponent(InputManager);
        this.canvas = cc.find('Canvas');
    }

    protected start(){
        this.gameStart();
    }

    private gameStart(){
        resources.load('Prefab/Player', cc.Prefab, (err, prefab) => {
            const player = cc.instantiate(prefab) as unknown as cc.Node;
            this.canvas.addChild(player);
        })
    }
}
