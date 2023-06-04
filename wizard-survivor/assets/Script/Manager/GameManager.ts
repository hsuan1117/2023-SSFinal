import InputManager from "./InputManager";
import PoolManager from "./PoolManager";
import PlayerManager from "./PlayerManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    public static get instance(): GameManager {
        if (!GameManager._instance) {
            GameManager._instance = cc.find('Game').getComponent(GameManager);
        }
        return GameManager._instance;
    }

    public get inputManager(): InputManager {
        return this._inputManager
    };

    public get poolManager(): PoolManager {
        return this._poolManager;
    }

    public get playerManager(): PlayerManager {
        return this._playerManager;
    }

    private static _instance: GameManager = null;
    private _inputManager: InputManager;
    private _poolManager: PoolManager;
    private _playerManager: PlayerManager;


    // CC-CALLBACKS
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.game.addPersistRootNode(this.node);

        this._inputManager = this.node.addComponent(InputManager);
        this._poolManager = this.node.addComponent(PoolManager);
        this._playerManager = this.node.addComponent(PlayerManager);
    }

    start(){
        this.generateGameScene();
    }


    // HELPERS:
    private generateGameScene(){
        let ui, enemy, drop: cc.Node;
        cc.resources.load('Prefab/UI/FixedUI', cc.Prefab, (err, prefab) => {
            ui = cc.instantiate(prefab) as unknown as cc.Node;
            this.node.addChild(ui);
        });
        this._playerManager.createPlayer('owowo');
        cc.resources.load('Prefab/Enemy', cc.Prefab, (err, prefab) => {
            enemy = cc.instantiate(prefab) as unknown as cc.Node;
            this.node.addChild(enemy);
            enemy.position = cc.v3(100, 100, 0)
        })
        cc.resources.load('Prefab/DropTest', cc.Prefab, (err, prefab) => {
            drop = cc.instantiate(prefab) as unknown as cc.Node;
            this.node.addChild(drop);
            drop.position = cc.v3(200, 200, 0);
        })
    }
}
