import {AttrNum, ProjectileAttr} from "./Attributes";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WeaponController extends cc.Component {

    @property(AttrNum)
    public attackSpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public streamNum: AttrNum  = new AttrNum();

    @property(AttrNum)
    public streamSpeed: AttrNum = new AttrNum();

    @property(ProjectileAttr)
    public projectileAttr: ProjectileAttr = new ProjectileAttr();

    public startShoot(){

    }

    public stopShoot(){

    }
}
