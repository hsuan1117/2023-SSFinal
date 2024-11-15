// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import {GameSystem} from "../Manager/GameSystem";
import {Buffs, BuffsDescription, BuffsName, IBuff} from "../Helper/Buff";
import {loadResource, shuffle} from "../Helper/utils";
import PlayerFocus from "./PlayerFocus";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

// popup UI, game manager should pass in data to show
// on buff applied (game sys), pop up should disappear


@ccclass
export default class UpgradeUI extends cc.Component {
    //
    // /*
    // buff 的 Icon
    // 必須和 Buff 同名！
    //  */
    // @property(Array)
    // private buffIcons: cc.SpriteFrame[] = [];

    // CC-CALLBACKS
    private buffs = null;
    private buffCards: cc.Node[] = null;
    private playerFocus: PlayerFocus;
    // private chosenIndex: { [uid: string]: number } = null;
    // private confirmed: { [uid: string]: boolean } = null;

    onLoad() {
        this.playerFocus = this.node.getComponent(PlayerFocus);
    }

    onEnable() {
        this.playerFocus.event.on(PlayerFocus.ON_CONFIRM, this.onConfirm, this);
        GameManager.instance.event.on(GameManager.ON_UPGRADE, this.popUp, this);
    }

    onDisable() {
        this.playerFocus.event.off(PlayerFocus.ON_CONFIRM, this.onConfirm, this);
        GameManager.instance.event.off(GameManager.ON_UPGRADE, this.popUp, this);
    }

    start() {
        this.popDown();
    }

    private popUp({buffAmount}): void {
        GameManager.instance.gameSystem.event.once(GameSystem.ON_BUFF_APPLY, this.popDown, this);
        // this.node.active = true;
        this.node.opacity = 255;

        this.buffCards = [].fill(null, 0, buffAmount);
        this.buffs = Object.keys(Buffs);
        shuffle(this.buffs);
        this.buffs = this.buffs.slice(0, buffAmount);

        let promise = [];
        for (let i = 0; i < this.buffs.length; i++) {
            promise.push(loadResource('Art/BuffCard/' + this.buffs[i], cc.SpriteFrame)
                .then((sprite) => {
                    this.buffCards[i] = this.node
                        .getChildByName('CardContainer')
                        .getChildByName(`BuffCard${i}`)
                    this.buffCards[i].getChildByName('Sprite')
                        .getComponent(cc.Sprite)
                        .spriteFrame = sprite as cc.SpriteFrame;
                    this.buffCards[i].getChildByName('Label')
                        .getComponent(cc.Label)
                        .string = BuffsName[this.buffs[i]];
                    this.buffCards[i].getChildByName('Label')
                        .color = this.getColor(BuffsName[this.buffs[i]]);
                    this.buffCards[i].getChildByName('Description')
                        .getComponent(cc.Label)
                        .string = BuffsDescription[this.buffs[i]];
                }))
        }

        Promise.all(promise)
            .then(() => this.playerFocus.init(this.buffCards, cc.v2(0, 100), true))
            .then(() => {
                for (let uid of GameManager.instance.localUids) {
                    this.playerFocus.focusOnIndex(uid, 0);
                }
            });
    }

    private onConfirm({uid, node}): void {
        this.playerFocus.lock(uid);
        GameManager.instance.gameSystem.emitApplyBuff(uid, this.buffs[node.name.slice(-1)]);
    }

    private getColor(buffName: string): cc.Color {
        if (buffName.includes('神諭')) return new cc.Color(180, 0, 255);
        else if (buffName.includes('增幅')) return new cc.Color(0, 140, 0);
        else if (buffName.includes('惡魔的低語')) return new cc.Color(190, 0, 0);
        else return cc.Color.BLACK;
    }

    // private onInput(input: Input) {
    //     if (!this.node.active) return;
    //     const dir = InputManager.lrOfStick(cc.v2(input.lX, input.lY));
    //     const uid = input.uid;
    //     if (this.confirmed[uid]) return;
    //
    //     if (input.type == InputType.BUTTON_DOWN && input.btnCode == 'A') {
    //         this.confirmed[uid] = true;
    //         this.buffCards[this.chosenIndex[uid]].getChildByName('PointerLabel').getComponent(cc.Label).string =
    //             this.buffCards[this.chosenIndex[uid]].getChildByName('PointerLabel').getComponent(cc.Label).string.slice(0, -1);
    //         GameManager.instance.gameSystem.emitApplyBuff(uid, this.buffs[this.chosenIndex[uid]]);
    //     }
    //     else if (dir == Direction.LEFT) {
    //         this.shiftBuff(uid, -1);
    //     } else if (dir == Direction.RIGHT) {
    //         this.shiftBuff(uid, 1);
    //     }
    // }
    //
    // private shiftBuff(uid: string, deltaIndex: number) {
    //     const label = this.buffCards[this.chosenIndex[uid]]
    //         .getChildByName('PointerLabel')
    //         .getComponent(cc.Label);
    //     label.string = label.string.slice(0, -1);
    //     this.chosenIndex[uid] = (this.chosenIndex[uid] + deltaIndex + this.buffCards.length) % this.buffCards.length;
    //     this.buffCards[this.chosenIndex[uid]]
    //         .getChildByName('PointerLabel')
    //         .getComponent(cc.Label)
    //         .string += 'v';
    // }

    private popDown(): void {
        this.node.opacity = 0;
    }
}
