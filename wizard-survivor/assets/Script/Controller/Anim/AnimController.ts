const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class AnimController extends cc.Component {

    @property(cc.Animation)
    protected anim: cc.Animation = null;

    public set state(state: {}) {
        const oldState = this._state;
        this._state = state;
        this.onStateChange(oldState, state);
    }

    public get state(): {} {
        return this._state;
    }

    onLoad(){

    }

    protected abstract _state: {};

    public abstract initState()

    protected abstract onStateChange(oldState, newState): void;
}
