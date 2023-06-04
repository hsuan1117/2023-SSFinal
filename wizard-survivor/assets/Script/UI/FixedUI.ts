// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import Game = cc.Game;
import PlayerManager from "../Manager/PlayerManager";
import PlayerController from "../Controller/PlayerController";
import PlayerStatUI from "./PlayerStatUI";

const {ccclass, property} = cc._decorator;

/*
實例化 GO 出來後，
會在 GameManager 生成 Player 之後，
顯示對應數量的 PlayerStatUI
 */
@ccclass
export default class FixedUI extends cc.Component {

    onLoad () {
        GameManager.instance.playerManager.event.on(PlayerManager.PLAYER_CREATED, () => {
            let cnt = 1;
            GameManager.instance.playerManager.allPlayerIDs.forEach((id) => {
                let player = GameManager.instance.playerManager.getPlayerNodeByID(id).getComponent(PlayerController);
                let playerStatUI = this.node.getChildByName(`PlayerStatUI${cnt++}`).getComponent(PlayerStatUI);
                playerStatUI.node.parent = this.node;
                playerStatUI.init(player);
            });
        }, this);
    }

    start () {

    }
}
