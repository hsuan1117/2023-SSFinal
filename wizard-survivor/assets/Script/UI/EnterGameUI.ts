import PlayerController from "../Controller/PlayerController";
import GameManager from "../Manager/GameManager";
import {GameSystem} from "../Manager/GameSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnterGameUI extends cc.Component {
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.getComponent(PlayerController)) {
            GameManager.instance.gameSystem.emitGameStart();
        }
    }
}
