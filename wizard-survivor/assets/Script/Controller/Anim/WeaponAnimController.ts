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

    protected _state: {
        isAttacking: boolean,
    };

    initState() {
        this._state = {
            isAttacking: false,
        }
    }

    protected onStateChange(oldState, newState): void {
        if (oldState === newState) return;
        if (newState.isAttacking){
            this.anim.play(this.attackAnim);
        }
        else{
            this.anim.play(this.idleAnim)
        }
    }
}
