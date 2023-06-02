import {AttrNum, ProjectileAttr} from "../Helper/Attributes";
import PlayerController from "./PlayerController";
import ProjectileController from "./ProjectileController";
import GameManager from "../Manager/GameManager";
import requireComponent = cc._decorator.requireComponent;
import {ignoreZ, padZ} from "../Helper/utils";
import SearchEnemy from "../Helper/SearchEnemy";
import {ISearchTarget} from "../Helper/ISearchTarget";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

@ccclass
export default class WeaponController extends cc.Component {

    @property({type: AttrNum, tooltip: "攻擊頻率"})
    public attackSpeed: AttrNum = new AttrNum();

    @property({type: AttrNum, tooltip: "每次攻擊發射子彈數量"})
    public shotPerAttack: AttrNum  = new AttrNum();

    @property({type: AttrNum, tooltip: "每發子彈頻率"})
    public shootSpeed: AttrNum = new AttrNum();

    @property({type: AttrNum, tooltip: "從走動狀態轉換到攻擊狀態的時間"})
    public castTime: AttrNum = new AttrNum();

    @property(ProjectileAttr)
    public projectileAttr: ProjectileAttr = new ProjectileAttr();

    @property(AttrNum)
    public range: AttrNum = new AttrNum();

    @property(cc.Prefab)
    public projectilePrefab: cc.Prefab = null;

    public player: PlayerController = null;

    private searchTarget: ISearchTarget = null;

    private canAttack: boolean = false;
    private shotCnt: number = 0;
    private nextShotCountDown: number = 0;
    private attackCountDown: number = 0;
    private bounceDirIdx: number = 0;


    onLoad() {
        this.searchTarget = this.node.addComponent(SearchEnemy);
        this.range.onChangeCallback.push(() => {this.searchTarget.searchRange = this.range.value;});
    }

    public init(){
        this.canAttack = false;
        this.player.event.on(PlayerController.PLAYER_START_MOVE, this.stopAttack, this);
        this.player.event.on(PlayerController.PLAYER_STOP_MOVE, this.startAttack, this);
    }

    update(dt){
        this.nextShotCountDown -= dt;
        this.attackCountDown -= dt;

        if (this.canAttack && this.attackCountDown <= 0){
            this.shotCnt = 0;
            this.nextShotCountDown = 0;
            this.attackCountDown = 1/this.attackSpeed.value;
            this.bounceDirIdx = Math.floor(Math.random()*8);
        }

        if (this.canAttack && this.shotCnt<this.shotPerAttack.value && this.nextShotCountDown <= 0){
            this.shoot();
            this.nextShotCountDown = 1/this.shootSpeed.value;
            this.shotCnt++;
        }
    }

    private startAttack(){
        this.canAttack = true;
        this.attackCountDown = Math.max(this.attackCountDown, this.castTime.value);
    }

    private stopAttack(){
        this.canAttack = false;
        this.shotCnt = Infinity;
    }

    private shoot() {
        const target = this.searchTarget.getTarget();
        if (!target) return;
        const projectile = GameManager.instance.poolManager.createPrefab(this.projectilePrefab).getComponent(ProjectileController);
        const pos =  GameManager.instance.canvas.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cc.v2(0, 0)));
        projectile.node.setPosition(pos);
        projectile.init({...this.projectileAttr}, null, this.bounceDirIdx);
        projectile.node.parent = GameManager.instance.canvas;
        projectile.shootToDirection(ignoreZ(target.position.sub(this.player.node.position)).normalize());
    }
}
