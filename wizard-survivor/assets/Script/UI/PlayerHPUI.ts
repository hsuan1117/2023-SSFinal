import PlayerController from "../Controller/PlayerController";
import Game = cc.Game;
import GameManager from "../Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerHPUI extends cc.Component {
    @property(cc.Prefab)
    private hpIcon: cc.Prefab = null;

    private player: PlayerController;

    onDestroy() {
        this.player.event.off(PlayerController.PLAYER_ATTR_CHANGE, this.onPlayerAttrChange, this);
        GameManager.instance.event.off(GameManager.ON_GAME_READY, this.onPlayerAttrChange, this)
    }

    public init(player: PlayerController){
        this.player = player;
        this.player.event.on(PlayerController.PLAYER_ATTR_CHANGE, this.onPlayerAttrChange, this);
        GameManager.instance.event.on(GameManager.ON_GAME_READY, this.onPlayerAttrChange, this)
    }

    private onPlayerAttrChange(){
        this.node.removeAllChildren();
        for (let i=0; i<this.player.currentHP.value; i++){
            const hp = GameManager.instance.poolManager.createPrefab(this.hpIcon);
            hp.parent = this.node;
        }
    }
}
