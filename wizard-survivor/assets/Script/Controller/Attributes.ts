const {ccclass, property} = cc._decorator;

@ccclass('AttrNum')
export class AttrNum {

    @property(cc.Integer)
    public defaultValue: number = 0;

    public addFactor: number = 0;

    public percentageFactor: number = 100;

    public get value(){
        return Math.floor(this.defaultValue * this.percentageFactor/100) + this.addFactor;
    }
}

@ccclass('ProjectileAttr')
export class ProjectileAttr {

    @property(AttrNum)
    public flySpeed: AttrNum;

    @property(AttrNum)
    public damage: AttrNum;

    @property(AttrNum)
    public existTime: AttrNum;

    @property(cc.Boolean)
    public canBounce: boolean;

    @property(cc.Boolean)
    public canPenetrate: boolean;

}