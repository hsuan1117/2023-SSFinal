// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import Game = cc.Game;
import {GameSystem} from "../Manager/GameSystem";

const {ccclass, property} = cc._decorator;

// popup UI, game manager should pass in data to show
// on buff applied (game sys), pop up should disappear


@ccclass
export default class UpgradeUI extends cc.Component {

    // CC-CALLBACKS

    start(){
        GameManager.instance.event.on(GameManager.ON_UPGRADE, this.popUpUpgradeUI, this);
        console.log('upgrade ui start')
        this.node.active = false;
    }

    private popUpUpgradeUI(): void {
        this.node.active = true;
        GameManager.instance.gameSystem.event.once(GameSystem.ON_BUFF_APPLY, this.closeUpgradeUI, this);
        GameManager.instance.gameSystem.emitApplyBuff('p1', 'ExplosionOnDash')
    }

    private closeUpgradeUI(): void {
        this.node.active = false;
    }
}
