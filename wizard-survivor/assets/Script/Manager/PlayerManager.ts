import GameManager from "./GameManager";
import PlayerController from "../Controller/PlayerController";
import InputManager, {Input, InputType} from "./InputManager";
import {loadResource} from "../Helper/utils";
import {GameSystem, RemoteGameSystem} from "./GameSystem";
import {Buffs} from "../Helper/Buff";
import {GameInfo, GameStartType} from "../UI/MainMenuUI";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

/*
1. 管理所有 Player Instance
2. 提供靜態的方法取得 Player Instance
 */

@ccclass
export default class PlayerManager extends cc.Component {
    public event: cc.EventTarget = new cc.EventTarget();
    public static PLAYER_INSTANTIATED: string = 'PLAYER_CREATED';

    public get allPlayerIDs(): string[]{
        return this.playerIds;
    }

    private playerIds: string[] = [];
    private playerChara: {[uid: string]: string} = {};
    private playerControllers: {[id: string]: PlayerController} = {};
    private playerDeltaHp: {[uid: string]: number} = {}

    private gameSystem: GameSystem;


    // === LIFE-CYCLE CALLBACKS ===
    start(){
        GameManager.instance.inputManager.event.on(InputManager.ON_INPUT, this.onInput, this);
        this.clearAllChara();
    }

    // PUBLIC METHODS
    /*
    若還沒有實例化，回傳 null
     */
    public getPlayerNodeByID(id: string): cc.Node { return this.playerControllers[id]?.node; }
    public getPlayer(id: string): PlayerController { return this.playerControllers[id]; }
    public getPlayerChara(id: string): string { return this.playerChara[id]; }

    /*
    如果非線上模式，則不理會。
    如果是房主，每隔一段時間，將所有玩家的位置同步給其他玩家。
    如果是其他玩家，則每隔一段時間，接受房主傳來的位置，並更新。
     */
    public setUpSyncPlayerPosition(gameInfo: GameInfo){
        const intervalSec = 0.1;
        if (gameInfo.gameStartType === GameStartType.OFFLINE_1P ||
                gameInfo.gameStartType === GameStartType.OFFLINE_2P ||
                    gameInfo.gameStartType === GameStartType.OFFLINE_3P){
            return;
        }

        if (gameInfo.gameStartType === GameStartType.ONLINE_NEW_ROOM) {
            this.schedule(this.broadcastAuthorityPos.bind(this), intervalSec);
        }
        else if (gameInfo.gameStartType === GameStartType.ONLINE_JOIN_ROOM) {
            GameManager.instance.gameSystem.event.on(RemoteGameSystem.ON_POSITION_SYNC, this.onPositionSync, this);
        }
    }

    public async instantiatePlayer(uid: string){
        return await loadResource(`Prefab/Chara/${this.playerChara[uid]}`, cc.Prefab)
            .then((prefab) =>{
                const player = (cc.instantiate(prefab) as unknown as cc.Node).getComponent(PlayerController);
                player.node.parent = GameManager.instance.playerEnemyLayer;
                this.playerControllers[uid] = player;
                player.uid = uid;
                this.event.emit(PlayerManager.PLAYER_INSTANTIATED, uid);
                return player;
            })
    }

    public setGameSystem(gameSystem: GameSystem){
        this.gameSystem = gameSystem;
        this.gameSystem.event.on(GameSystem.ON_BUFF_APPLY, this.onBuffApply, this);
        this.gameSystem.event.on(GameSystem.ON_PLAYER_HP_CHANGE, this.onHPChange, this);
        this.gameSystem.event.on(GameSystem.ON_CREATE_PLAYER,this.createPlayer, this);
    }

    public clearAllChara(){
        this.playerIds = [];
        this.playerChara = {};
        this.playerControllers = {};
        this.playerDeltaHp = {};
        this.unschedule(this.broadcastAuthorityPos.bind(this));
        if (GameManager.instance.gameSystem instanceof RemoteGameSystem)
            GameManager.instance.gameSystem.event.off(RemoteGameSystem.ON_POSITION_SYNC, this.onPositionSync, this);
    }


    // HELPERS
    private onPositionSync(e: { positions: {[uid: string] : {x: number, y: number}}}){
        for (const uid in e.positions){
            const pos = e.positions[uid];
            this.playerControllers[uid].authorityPos = cc.v2(pos.x, pos.y);
        }
    }

    private broadcastAuthorityPos(){
        if (GameManager.instance.gameSystem instanceof RemoteGameSystem){
            (GameManager.instance.gameSystem as RemoteGameSystem).dispatchCurrentPositions();
        }
    }

    private createPlayer({uid, charaId}){
        console.log(`Create player ${uid} with chara ${charaId}`);
        if (this.playerIds.includes(uid)) return;
        this.playerIds.push(uid);
        this.playerChara[uid] = charaId;
        this.playerDeltaHp[uid] = 0;
    }

    private onInput(input: Input){
        if (!this.playerControllers[input.uid]) return;

        if (input.type == InputType.STICK){
            this.playerControllers[input.uid].setMovingDir(cc.v2(input.lX/1000, input.lY/1000));
        }
        else if (input.type == InputType.BUTTON_DOWN && !GameManager.instance.isPaused){
            if (input.btnCode == 'A'){
                this.playerControllers[input.uid].dash();
            }
        }
    }

    private onBuffApply({uid, buffId}){
        this.playerControllers[uid].addBuff(new Buffs[buffId]());
        GameManager.instance.particleManager.createParticle("Level Up", cc.v3(0, -10, 0), 0, 2, this.playerControllers[uid].node);
        GameManager.instance.audioManager.playEffect("get_buff");
    }

    private onHPChange({uid, deltaHP}){
        this.playerDeltaHp[uid] += deltaHP;
        this.playerControllers[uid].currentHP.addFactor += deltaHP;
    }
}
