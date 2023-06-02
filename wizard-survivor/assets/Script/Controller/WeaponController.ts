import {AttrNum, ProjectileAttr} from "./Attributes";
import PlayerController from "./PlayerController";
import ProjectileController from "./ProjectileController";
import Game = cc.Game;
import GameManager from "../Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WeaponController extends cc.Component {

    @property(AttrNum)
    public attackSpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public streamNum: AttrNum  = new AttrNum();

    @property(AttrNum)
    public streamSpeed: AttrNum = new AttrNum();

    @property({type: AttrNum, tooltip: "攻擊前搖時長"})
    public castTime: AttrNum = new AttrNum();

    @property(ProjectileAttr)
    public projectileAttr: ProjectileAttr = new ProjectileAttr();

    @property(cc.Prefab)
    public projectilePrefab: cc.Prefab = null;

    public player: PlayerController = null;

    private canAttack: boolean = false;

    private attackCountDown: number = 0;

    public init(){
        this.canAttack = false;
        this.player.event.on(PlayerController.PLAYER_START_MOVE, this.stopAttack, this);
        this.player.event.on(PlayerController.PLAYER_STOP_MOVE, this.startAttack, this);
    }

    update(dt){
        this.attackCountDown -= dt;
        if (this.canAttack && this.attackCountDown <= 0){
            this.shoot();
            this.attackCountDown = 1/this.attackSpeed.value;
        }
    }

    private startAttack(){
        this.canAttack = true;
        this.attackCountDown = Math.max(this.attackCountDown, this.castTime.value);
    }

    private stopAttack(){
        this.canAttack = false;
    }

    private shoot(){
        const projectile = cc.instantiate(this.projectilePrefab).getComponent(ProjectileController);
        projectile.node.parent = GameManager.instance.canvas;
        projectile.init({...this.projectileAttr});
        projectile.shootToDirection(cc.v2(100, 100));
    }
}
