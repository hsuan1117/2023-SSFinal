const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class AnimController extends cc.Component {

    @property(cc.Animation)
    protected anim: cc.Animation = null;

    public set state(state: {}) {
        this.onStateChange(this._state, state);
        this._state = state;
    }

    public get state(): {} {
        return this._state;
    }

    protected abstract _state: {};

    public abstract initState()

    protected abstract onStateChange(oldState, newState): void;
}
