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

    protected _state = {
        isMoving: false,
        isDashing: false,
        isDead: false,
        isHurt: false,
    };

    initState() {
        this._state = {
            isMoving: false,
            isDashing: false,
            isDead: false,
            isHurt: false,
        };
    }

    protected onStateChange(oldState, newState): void {
        if (newState.isDead) {
            this.anim.play(this.playerDeadAnim);
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
    }
}
