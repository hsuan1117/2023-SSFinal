import AnimController from "./AnimController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerAnimController extends AnimController {

    @property()
    public playerIdleAnim: string = 'player_idle';

    @property()
    public playerMoveAnim: string = 'player_move';

    @property()
    public playerDashAnim: string = 'player_dash';

    @property()
    public playerHurtAnim: string = 'player_hurt';

    @property()
    public playerDeadAnim: string = 'player_dead';

    public afterDeadCallback: () => void = null;

    private playerDeadAction: cc.Action;
    private hasDeadAnimExecuted;

    onLoad() {
        super.onLoad();
        this.hasDeadAnimExecuted = false;

        this.playerDeadAction = cc.sequence(
            cc.moveBy(0.4, cc.v2(0, 40)).easing(cc.easeOut(3)),
            cc.moveBy(0.4, cc.v2(0, -40)).easing(cc.easeIn(3)),
            cc.callFunc(() => this.afterDeadCallback(), this)
        )
    }

    protected _state = {
        isMoving: false,
        isDashing: false,
        isDead: false,
        isHurt: false,
        faceLeftOrRight: 1, // -1: left, 1: right, 0: keep current
    };

    public initState() {
        this._state = {
            isMoving: false,
            isDashing: false,
            isDead: false,
            isHurt: false,
            faceLeftOrRight: 1, // -1: left, 1: right, 0: keep current
        };
    }

    protected onStateChange(oldState, newState): void {
        if (newState.isDead) {
            if (!this.hasDeadAnimExecuted){
                this.hasDeadAnimExecuted = true;
                this.anim.play(this.playerDeadAnim);
                this.anim.node.color = new cc.Color(100, 100, 100, 255);
                this.node.runAction(this.playerDeadAction);
            }
            return;
        }
        else if (newState.isHurt) {
            this.anim.play(this.playerHurtAnim);
        }
        else if (newState.isDashing) {
            this.anim.play(this.playerDashAnim);
        }
        else if (newState.isMoving) {
            this.anim.play(this.playerMoveAnim);
        }
        else {
            this.anim.play(this.playerIdleAnim);
        }

        if (newState.faceLeftOrRight)
            this.anim.node.scaleX = newState.faceLeftOrRight;
    }
}
