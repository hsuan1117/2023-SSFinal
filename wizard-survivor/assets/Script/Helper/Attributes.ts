const {ccclass, property} = cc._decorator;

@ccclass('AttrNum')
export class AttrNum {
    /*直接 push 來註冊 callback*/
    public onChangeCallback: Function[] = [];

    get percentageFactor(): number {
        return this._percentageFactor;
    }

    set percentageFactor(value: number) {
        this._percentageFactor = value;
        this.onChange();
    }

    get addFactor(): number {
        return this._addFactor;
    }

    set addFactor(value: number) {
        this._addFactor = value;
        this.onChange();
    }

    public get defaultValue(): number {
        return this._defaultValue;
    }

    @property()
    public set defaultValue(value: number) {
        this._defaultValue = value;
        this.onChange()
    }

    public get value() {
        return this.defaultValue * this._percentageFactor / 100 + this._addFactor;
    }

    constructor(defaultValue: number = 0){
        this.defaultValue = defaultValue;
    }

    public toString(){
        return `${this.value} (${this.defaultValue} * ${this.percentageFactor}% + ${this.addFactor})`
    }

    public reset() {
        this.addFactor = 0;
        this.percentageFactor = 100;
    }

    @property()
    private _defaultValue: number = 0;
    private _addFactor: number = 0;
    private _percentageFactor: number = 100;

    private onChange() {
        this.onChangeCallback.forEach((callback) => {
            callback(this.value);
        });
    }
}

@ccclass('ProjectileAttr')
export class ProjectileAttr {

    @property(AttrNum)
    public flySpeed: AttrNum = new AttrNum();

    @property(AttrNum)
    public damage: AttrNum = new AttrNum();

    @property(AttrNum)
    public existDuration: AttrNum = new AttrNum();

    @property({type: AttrNum, tooltip: '在敵人間彈跳的次數。如果穿透次數和彈跳次數都不為 0，則會些把彈跳次數用完再穿透'})
    public bounceOnEnemyTimes: AttrNum = new AttrNum();

    @property(AttrNum)
    public penetrateTimes: AttrNum = new AttrNum();

    @property()
    public notFly: boolean = false;

    constructor(flySpeed = 0,
                damage = 0,
                existDuration = 0,
                bounceOnEnemyTimes = 0,
                penetrateTimes = 0) {
        this.flySpeed.defaultValue = flySpeed;
        this.damage.defaultValue = damage;
        this.existDuration.defaultValue = existDuration;
        this.bounceOnEnemyTimes.defaultValue = bounceOnEnemyTimes;
        this.penetrateTimes.defaultValue = penetrateTimes;
    }
}