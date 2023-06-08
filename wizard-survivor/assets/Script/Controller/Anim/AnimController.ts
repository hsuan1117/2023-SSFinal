import requireComponent = cc._decorator.requireComponent;

const {ccclass, property} = cc._decorator;

@ccclass
@requireComponent(cc.Animation)
export default abstract class AnimController extends cc.Component {

    public set state(state: {}) {
        this.onStateChange(this._state, state);
        this._state = state;
    }

    public get state(): {} {
        return this._state;
    }

    protected abstract _state: {};
    protected anim: cc.Animation;

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
    }

    public abstract initState()

    protected abstract onStateChange(oldState, newState): void;
}
