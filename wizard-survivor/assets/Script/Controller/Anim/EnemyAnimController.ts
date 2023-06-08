import AnimController from "./AnimController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyAnimController extends AnimController {

    @property()
    public enemyIdleAnim: string = 'enemy_idle';

    @property()
    public enemyMoveAnim: string = 'enemy_move';

    @property()
    public enemyHurtAnim: string = 'enemy_hurt';

    @property()
    public enemyDeadAnim: string = 'enemy_dead';

    @property()
    public enemySkillAnim: string = 'enemy_skill';

    protected _state = {
        isMoving: false,
        isDead: false,
        isHurt: false,
        isSkill: false,
    };

    initState() {
        this._state = {
            isMoving: false,
            isSkill: false,
            isDead: false,
            isHurt: false,
        };
    }

    protected onStateChange(oldState, newState): void {
        if (newState.isDead) {
            this.anim.play(this.enemyDeadAnim);
        }
        else if (newState.isHurt) {
            this.anim.play(this.enemyHurtAnim);
        }
        else if (newState.isMoving) {
            this.anim.play(this.enemyMoveAnim);
        }
        else if (newState.isSkill) {
            this.anim.play(this.enemySkillAnim);
        }
    }
}
