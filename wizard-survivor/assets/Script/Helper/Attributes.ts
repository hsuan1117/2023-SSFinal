const {ccclass, property} = cc._decorator;

@ccclass('AttrNum')
export class AttrNum {
    public onChangeCallback: Array<Function> = [];

    get percentageFactor(): number {
        return this._percentageFactor;
    }

    set percentageFactor(value: number) {
        this.onChange();
        this._percentageFactor = value;
    }

    get addFactor(): number {
        return this._addFactor;
    }

    set addFactor(value: number) {
        this.onChange();
        this._addFactor = value;
    }

    public get defaultValue(): number {
        return this._defaultValue;
    }

    @property()
    public set defaultValue(value: number) {
        this.onChange()
        this._defaultValue = value;
    }

    public get value() {
        return this.defaultValue * this._percentageFactor / 100 + this._addFactor;
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

    @property(AttrNum)
    public bounceOnEnemyTimes: AttrNum = new AttrNum();

    @property(AttrNum)
    public penetrateTimes: AttrNum = new AttrNum();
}