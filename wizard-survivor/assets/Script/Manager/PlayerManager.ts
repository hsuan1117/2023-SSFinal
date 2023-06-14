import GameManager from "./GameManager";
import PlayerController from "../Controller/PlayerController";
import InputManager, {ControllerConversion, Input, InputType} from "./InputManager";
import {loadResource} from "../Helper/utils";
import {GameSystem} from "./GameSystem";
import {Buffs} from "../Helper/Buff";
import Game = cc.Game;
import game = cc.game;

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

    public get localUids(): string[]{
        return this.playerIds.filter((id) => this.isLocalPlayer[id]);
    }

    private playerIds: string[] = [];
    private isLocalPlayer: {[uid: string]: boolean} = {};
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
    public getPlayerNodeByID(id: string): cc.Node{
        return this.playerControllers[id]?.node;
    }

    public getPlayer(id: string): PlayerController{
        return this.playerControllers[id];
    }

    public getPlayerChara(id: string): string{
        return this.playerChara[id];
    }

    public isLocal(id: string): boolean{
        return this.isLocalPlayer[id] == true;
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
        this.isLocalPlayer = {};
        this.playerChara = {};
        this.playerControllers = {};
        this.playerDeltaHp = {};
    }


    // HELPERS
    private createPlayer({uid, charaId, isLocal}){
        if (this.isLocalPlayer[uid]) return;
        if (this.playerIds.includes(uid)) return;
        this.playerIds.push(uid);
        this.playerChara[uid] = charaId;
        this.playerDeltaHp[uid] = 0;
        this.isLocalPlayer[uid] = isLocal;
    }

    private onInput(input: Input){
        if (!this.playerControllers[input.uid]) return;

        // console.log('PlayerManager.onInput: input, playerControllers');
        // console.log(input, this.playerControllers[input.uid]);

        if (input.type == InputType.STICK){
            this.playerControllers[input.uid].setMovingDir(cc.v2(input.lX/1000, input.lY/1000));
        }
        else if (input.type == InputType.BUTTON_DOWN){
            if (input.btnCode == 'A'){
                this.playerControllers[input.uid].dash();
            }
        }
    }

    private onBuffApply({uid, buffId}){
        this.playerControllers[uid].addBuff(new Buffs[buffId]());
    }

    private onHPChange({uid, deltaHP}){
        this.playerDeltaHp[uid] += deltaHP;
        this.playerControllers[uid].currentHP.addFactor += deltaHP;
    }
}
