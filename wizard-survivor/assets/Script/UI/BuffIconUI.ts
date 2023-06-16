import {IBuff} from "../Helper/Buff";
import {loadResource} from "../Helper/utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuffIconUI extends cc.Component {

    private _buffSprite: cc.SpriteFrame = null;
    private _buff: IBuff = null;

    public async init(buff: IBuff){
        this._buff = buff;
        this._buffSprite = await loadResource('Art/BuffCard/' + this._buff.id, cc.SpriteFrame) as unknown as cc.SpriteFrame;
        this.node.getComponent(cc.Sprite).spriteFrame = this._buffSprite;
    }

    update (dt) {
        if (this._buff.isAvailable){
            this.node.opacity = 255;
            this.node.color = cc.Color.WHITE;
        }
        else{
            this.node.opacity = 100;
            this.node.color = cc.Color.GRAY;
        }
    }
}