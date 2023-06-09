import GameManager from "./GameManager";
import PlayerController from "../Controller/PlayerController";
import InputManager, {ControllerConversion, Input, InputType} from "./InputManager";
import {loadResource} from "../Helper/utils";
import {GameSystem} from "./GameSystem";
import {Buffs} from "../Helper/Buff";
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


    // LIFE-CYCLE CALLBACKS:
    start () {
        // listen to Input Manager
        GameManager.instance.inputManager.event.on(InputManager.ON_INPUT, this.onInput, this);
        GameManager.instance.gameSystem.event.on(GameSystem.ON_BUFF_APPLY, this.onBuffApply, this);
        GameManager.instance.gameSystem.event.on(GameSystem.ON_PLAYER_HP_CHANGE, this.onHPChange, this);
    }


    // PUBLIC METHODS
    public getPlayerNodeByID(id: string): cc.Node{
        return this.playerControllers[id].node;
    }

    public getPlayer(id: string): PlayerController{
        return this.playerControllers[id];
    }

    /*
    實例化一個 Player，設定主武器和 Buff，並加入場景樹
     */
    public createPlayer(uid: string, charaId: string){
        this.playerIds.push(uid);
        this.playerChara[uid] = charaId;
        this.playerDeltaHp[uid] = 0;
    }

    public async instantiatePlayer(uid: string){
        return await loadResource(`Prefab/Chara/${this.playerChara[uid]}`, cc.Prefab)
            .then((prefab) =>{
                const player = (cc.instantiate(prefab) as unknown as cc.Node).getComponent(PlayerController);
                player.node.parent = GameManager.instance.node;
                this.playerControllers[uid] = player;
                player.uid = uid;
                this.event.emit(PlayerManager.PLAYER_INSTANTIATED, uid);
                return player;
            })
    }


    // HELPERS
    private onInput(input: Input){
        if (!this.playerControllers[input.uid]) return;
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
