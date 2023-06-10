// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import {GameSystem} from "../Manager/GameSystem";
import {Buffs, BuffsName} from "../Helper/Buff";
import {loadResource, shuffle} from "../Helper/utils";
import PlayerFocus from "./PlayerFocus";

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
        // console.log('Upgrade UI Onload, playerFocus: ', this.playerFocus);
    }

    start() {
        GameManager.instance.event.on(GameManager.ON_UPGRADE, this.popUpUpgradeUI, this);
        // GameManager.instance.inputManager.event.on(InputManager.ON_INPUT, this.onInput, this);
        this.node.active = false;
        this.playerFocus.event.on(PlayerFocus.ON_CONFIRM, this.onConfirm, this);
    }

    private popUpUpgradeUI({buffAmount}): void {
        GameManager.instance.gameSystem.event.once(GameSystem.ON_BUFF_APPLY, this.closeUpgradeUI, this);
        this.node.active = true;

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
                }))
        }

        Promise.all(promise)
            .then(() => this.playerFocus.init(this.buffCards, cc.v2(0, 50), true))
            .then(() => {
                for (let uid of GameManager.instance.playerManager.localUids) {
                    this.playerFocus.focusOnIndex(uid, 0);
                    console.log('playerFocus focus on index: ', uid, 0);
                }
            });
    }

    private onConfirm({uid, node}): void {
        console.log('UpgradeUI onConfirm: ', uid, node.name.slice(-1));
        this.playerFocus.lock(uid);
        GameManager.instance.gameSystem.emitApplyBuff(uid, this.buffs[node.name.slice(-1)]);
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

    private closeUpgradeUI(): void {
        this.node.active = false;

    }
}
