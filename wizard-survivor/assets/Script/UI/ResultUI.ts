// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResultUI extends cc.Component {

    private coinLabel: cc.Label = null;

    onLoad() {
        this.coinLabel = this.node.getChildByName('Coin')
            .getChildByName("CoinLabel").getComponent(cc.Label);
    }

    start() {
        this.coinLabel.string = `X ${GameManager.instance.coinCnt.value}`;
    }
}
