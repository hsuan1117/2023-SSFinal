// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AnimController from "./AnimController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WeaponAnimController extends AnimController {

    @property()
    public attackAnim: string = 'attack';

    @property()
    public idleAnim: string = 'idle';

    private currentAnimState: cc.AnimationState;

    protected _state: {
        isAttacking: boolean,
        dontBreakAttackAnimCnt: number
    };

    initState() {
        this._state = {
            isAttacking: false,
            dontBreakAttackAnimCnt: 0
        }
    }

    protected onStateChange(oldState, newState): void {
        if (oldState === newState) return;
        if (newState.isAttacking ){
            this.currentAnimState = this.anim.play(this.attackAnim);
        }
        else if (newState.isAttacking === false){
            if (this.currentAnimState.name == this.attackAnim){
                this.anim.on('lastframe', () => this.currentAnimState = this.anim.play(this.idleAnim), this);
            }
            else{
                this.currentAnimState = this.anim.play(this.idleAnim)
            }
        }
    }
}
