import InputManager, {ARROW_TO_CONTROLLER, WASD_TO_CONTROLLER} from "./InputManager";
import PoolManager from "./PoolManager";
import PlayerManager from "./PlayerManager";
import WaveManager from "./WaveManager";
import {AttrNum} from "../Helper/Attributes";
import {loadResource} from "../Helper/utils";
import {GameSystem} from "./GameSystem";
import PlayerHPUI from "../UI/PlayerHPUI";
import MapManager from "./MapManager";
import LobbyUI from "../UI/LobbyUI";

const {ccclass, property} = cc._decorator;

/*
1. 創建場景：遊戲物件、UI 等
2. 提供 Manager 的入口
3. 統計全局遊戲數據：EXP、等級、殺敵數、金幣數等
4. 提供全局事件
 */
@ccclass
export default class GameManager extends cc.Component {

    // Events
    public event: cc.EventTarget;
    public static readonly ON_GAME_STAT_CHANGE: string = "GAME_STAT_CHANGE";
    public static readonly ON_LEVEL_UP: string = "LEVEL_UP";
    public static readonly ON_UPGRADE: string = "UPGRADE";

    /*
    有關於計算的程式已經初始化完成。用於讓 UI 監聽，更新 UI。

    callbackFn: () => void
     */
    public static readonly ON_GAME_LOGIC_READY: string = "GAME_READY";

    public static readonly SCENE_GAME = 'Game';
    public static readonly SCENE_MAIN_MENU = 'MainMenu';
    public static readonly SCENE_LOBBY = 'Lobby';
    public static readonly SCENE_RESULT = 'Result';

    public static get instance(): GameManager {
        if (!GameManager._instance) {
            GameManager._instance = cc.find('Game').getComponent(GameManager);
        }
        return GameManager._instance;
    }

    public get inputManager(): InputManager {
        return this._inputManager;
    };

    public get poolManager(): PoolManager {
        return this._poolManager;
    }

    public get playerManager(): PlayerManager {
        return this._playerManager;
    }

    public get waveManager(): WaveManager {
        return this._waveManager;
    }

    public get gameSystem(): GameSystem {
        return this._gameSystem;
    }

    public get playerEnemyLayer(): cc.Node {
        return this._playerEnemyLayer;
    }

    public get bulletLayer(): cc.Node {
        return this._bulletLayer;
    }

    public get itemLayer(): cc.Node {
        return this._itemLayer;
    }

    public get backgroundLayer(): cc.Node {
        return this._backgroundLayer;
    }

    public get currentSceneType(): string {
        return this._currentSceneType;
    }


    public killEnemyCnt: AttrNum = new AttrNum(0);
    public coinCnt: AttrNum = new AttrNum(0);
    public upgradeExp: AttrNum = new AttrNum(100);
    public level: AttrNum = new AttrNum(1);
    public exp: AttrNum = new AttrNum(0);


    /*每升一等，升等需要的經驗會增加多少百分比*/
    private readonly UPGRADE_EXP_GROWTH: number = 20;

    private static _instance: GameManager = null;
    private _inputManager: InputManager;
    private _poolManager: PoolManager;
    private _playerManager: PlayerManager;
    private _waveManager: WaveManager;
    private _gameSystem: GameSystem;
    private _mapManager: MapManager;

    private _currentSceneType: string;

    private _backgroundLayer: cc.Node;
    private _itemLayer: cc.Node;
    private _playerEnemyLayer: cc.Node;
    private _bulletLayer: cc.Node;


    // CC-CALLBACKS
    onLoad() {
        cc.game.setFrameRate(59);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.game.addPersistRootNode(this.node);

        this._inputManager = this.node.addComponent(InputManager);
        this._poolManager = this.node.addComponent(PoolManager);
        this._playerManager = this.node.addComponent(PlayerManager);
        this._waveManager = this.node.addComponent(WaveManager);
        this._mapManager = this.node.addComponent(MapManager);
        this._gameSystem = new GameSystem();

        this.event = new cc.EventTarget();

        // 當下列屬性改變，發布遊戲狀態改變事件，用於 Update FixedUI
        const onGameStatCh = () => {this.event.emit(GameManager.ON_GAME_STAT_CHANGE)};
        this.killEnemyCnt.onChangeCallback.push(onGameStatCh);
        this.coinCnt.onChangeCallback.push(onGameStatCh);
        this.exp.onChangeCallback.push(onGameStatCh);
        this.level.onChangeCallback.push(onGameStatCh);
        this.upgradeExp.onChangeCallback.push(onGameStatCh);

        // DEBUG
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ({keyCode})=>{
            if (keyCode === cc.macro.KEY.u){
                this.exp.addFactor += 5;
            }
            else if (keyCode === cc.macro.KEY.p) {
                if (cc.director.isPaused()) {
                    console.log('Game Resumed')
                    cc.director.resume();
                } else {
                    console.log('Game Paused')
                    cc.director.pause()
                }
            } else if (keyCode == cc.macro.KEY.x) {
                this.changeScene(GameManager.SCENE_RESULT);
            } else if (keyCode == cc.macro.KEY.h) {
                this.gameSystem.emitPlayerHPChange('p1', -1)
            } else if (keyCode == cc.macro.KEY.e) {
                loadResource('Prefab/Enemy/BumpingPig', cc.Prefab).then((prefab) => {
                    const enemy =  this.poolManager.createPrefab(prefab as cc.Prefab);
                    enemy.setPosition(0, 0);
                    enemy.parent = this.node;
                })
            }
        })

        // 當經驗值 or 等級改變
        this.exp.onChangeCallback.push(()=> {
            while (this.exp.value >= this.upgradeExp.value) {
                this.exp.addFactor -= this.upgradeExp.value;
                this.level.addFactor += 1;
                this.upgradeExp.percentageFactor += this.UPGRADE_EXP_GROWTH;
            }
        });
        this.level.onChangeCallback.push(() => {
            this.event.emit(GameManager.ON_LEVEL_UP);
            this.upgrade();
        });

        // 來自 GameSystem 的廣播
        this.gameSystem.event.on(GameSystem.ON_EXP_CHANGE, this.onExpChange, this);
        this.gameSystem.event.on(GameSystem.ON_COIN_CHANGE, this.onCoinChange, this);
        this.gameSystem.event.on(GameSystem.ON_GAME_START, this.onGameStart, this);
    }

    start() {
        GameManager.instance.inputManager.addLocalPlayerInput('p1', WASD_TO_CONTROLLER);
        GameManager.instance.inputManager.addLocalPlayerInput('p2', ARROW_TO_CONTROLLER);
        this.generateLobbyScene();
        this._waveManager.init();
    }


    // PUBLIC METHODS:
    public pauseGame() {
        cc.director.pause();
    }

    public resumeGame() {
        cc.director.resume();
    }

    public changeScene(sceneType: string) {
        this._mapManager.clearMap();
        this._waveManager.clearWave();
        this.destroyScene();

        if (sceneType === GameManager.SCENE_LOBBY){
            this.generateLobbyScene();
        }
        else if (sceneType === GameManager.SCENE_GAME) {
            this.generateGameScene();
            this._waveManager.setWave(1);
            this._mapManager.init();
        } else if (sceneType === GameManager.SCENE_RESULT) {
            this.playerManager.clearAllChara();
            this.generateResultScene();
        }
        this._currentSceneType = sceneType;
    }


    // HELPERS:
    private onGameStart() {
        this.changeScene(GameManager.SCENE_GAME);
    }

    private async generateGameScene() {
        this.buildLayers();
        let fixedUI, enemy, drop, upgradeUI: cc.Node;

        let promises = []
        promises.push(
            loadResource('Prefab/UI/FixedUI', cc.Prefab).then((prefab) => {
                fixedUI = cc.instantiate(prefab) as unknown as cc.Node;
                fixedUI.parent = this.node;
                fixedUI.setPosition(0, 0);
            })
        )
        promises.push(
            loadResource('Prefab/UI/UpgradeUI', cc.Prefab).then((prefab) => {
                upgradeUI = cc.instantiate(prefab) as unknown as cc.Node;
                upgradeUI.parent = this.node;
                upgradeUI.setPosition(0, 0);
            })
        )

        async function instantiateHP(uid: string): Promise<void>{
            const hpOffset = cc.v3(0, -20);

            loadResource('Prefab/UI/PlayerHPUI', cc.Prefab)
                .then((prefab) => {
                    let hp = cc.instantiate(prefab) as unknown as cc.Node;
                    hp.parent = GameManager.instance.playerManager.getPlayerNodeByID(uid);
                    hp.setPosition(hpOffset);
                    hp.getComponent(PlayerHPUI).init(GameManager.instance.playerManager.getPlayer(uid));
                })
        }

        for (let uid of this.playerManager.allPlayerIDs) {
            promises.push(
                this.playerManager.instantiatePlayer(uid)
                    .then(() => instantiateHP(uid))
            )
        }

        await Promise.all(promises);
        this.event.emit(GameManager.ON_GAME_LOGIC_READY);
    }

    private async generateLobbyScene() {
        this.buildLayers();
        /*
        可在 Lobby Prefab 下放入各種 GO，包含待選取的角色（角色預覽）。
        如果該物件有 PlayerController，則會被抓取為角色預覽。
        請確保角色 Prefab 的 name 和 Node name 相同，兩者都被視作 CharaId
         */
        let uids = ['p1', 'p2'];

        let enterGame: cc.Node;
        let previewCharas: cc.Node[] = [];

        let lobby =
            await loadResource('Prefab/UI/LobbyUI', cc.Prefab)
                .then((prefab) => (cc.instantiate(prefab) as unknown as cc.Node)
                    .getComponent(LobbyUI));
        lobby.node.parent = this.backgroundLayer;
        lobby.node.setPosition(0, 0);
        lobby.init(uids);
        await lobby.chooseCharaFor();
        await lobby.createCharaFromChooseResult();
    }

    private async generateResultScene() {
        this.buildLayers();
        loadResource('Prefab/UI/ResultUI', cc.Prefab)
            .then((prefab) => {
                let resultUI = cc.instantiate(prefab) as unknown as cc.Node;
                resultUI.parent = this.backgroundLayer;
                resultUI.setPosition(0, 0);
            });
    }

    private buildLayers(){
        this._backgroundLayer = new cc.Node('BackgroundLayer');
        this._itemLayer = new cc.Node('ItemLayer');
        this._playerEnemyLayer = new cc.Node('PlayerEnemyLayer');
        this._bulletLayer = new cc.Node('BulletLayer');

        this._backgroundLayer.parent = this.node;
        this._itemLayer.parent = this.node;
        this._playerEnemyLayer.parent = this.node;
        this._bulletLayer.parent = this.node;
    }

    private destroyScene() {
        for (let child of this.node.children) {
            child.destroy();
        }
    }

    private onExpChange({deltaExp}) {
        this.exp.addFactor += deltaExp;
    }

    private onCoinChange({deltaCoin}) {
        this.coinCnt.addFactor += deltaCoin;
    }

    private upgrade() {
        this.gameSystem.event.once(GameSystem.ON_BUFF_APPLY, () => {
            this.resumeGame();
        });

        this.event.emit(GameManager.ON_UPGRADE, {buffAmount: 3});
        this.pauseGame();
    }

    private showLoading() {

    }

    private hideLoading() {

    }
}
