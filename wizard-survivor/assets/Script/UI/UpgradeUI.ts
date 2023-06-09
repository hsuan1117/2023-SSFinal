// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import {GameSystem} from "../Manager/GameSystem";
import {Buffs, BuffsName} from "../Helper/Buff";
import {Direction, loadResource, shuffle} from "../Helper/utils";
import InputManager, {Input, InputType} from "../Manager/InputManager";

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
    private chosenIndex: { [uid: string]: number } = null;
    private confirmed: { [uid: string]: boolean } = null;

    start() {
        GameManager.instance.event.on(GameManager.ON_UPGRADE, this.popUpUpgradeUI, this);
        GameManager.instance.inputManager.event.on(InputManager.ON_INPUT, (input) => this.onInput(input), this);
        this.node.active = false;
    }

    private popUpUpgradeUI(buffAmount: number): void {
        GameManager.instance.gameSystem.event.once(GameSystem.ON_BUFF_APPLY, this.closeUpgradeUI, this);
        this.node.active = true;

        this.buffs = Object.keys(Buffs);
        this.buffCards = [].fill(null, 0, buffAmount);
        this.chosenIndex = {};
        this.confirmed = {};

        shuffle(this.buffs);
        this.buffs = this.buffs.slice(0, buffAmount);

        let promise = [];
        for (let i = 0; i < this.buffs.length; i++) {
            promise.push(loadResource('Art/BuffCard/' + this.buffs[i], cc.SpriteFrame)
                .then((sprite) => {
                    console.log('load buff icon: ', this.buffs[i]);
                    // const buffCard = this.node.getChildByName('BuffCard1' + i);
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

        Promise.all(promise).then(() => {
            for (let b of this.buffCards) {
                b.active = true;
            }
            for (let uid of GameManager.instance.playerManager.allPlayerIDs) {
                this.chosenIndex[uid] = 0;
                this.buffCards[0].getChildByName('PointerLabel').getComponent(cc.Label).string += 'v';
            }
        })
    }

    private onInput(input: Input) {
        if (!this.node.active) return;
        const dir = InputManager.lrOfStick(cc.v2(input.lX, input.lY));
        const uid = input.uid;
        if (this.confirmed[uid]) return;

        if (input.type == InputType.BUTTON_DOWN && input.btnCode == 'A') {
            this.confirmed[uid] = true;
            this.buffCards[this.chosenIndex[uid]].getChildByName('PointerLabel').getComponent(cc.Label).string =
                this.buffCards[this.chosenIndex[uid]].getChildByName('PointerLabel').getComponent(cc.Label).string.slice(0, -1);
            GameManager.instance.gameSystem.emitApplyBuff(uid, this.buffs[this.chosenIndex[uid]]);
        }
        else if (dir == Direction.LEFT) {
            this.shiftBuff(uid, -1);
        } else if (dir == Direction.RIGHT) {
            this.shiftBuff(uid, 1);
        }
    }

    private shiftBuff(uid: string, deltaIndex: number) {
        const label = this.buffCards[this.chosenIndex[uid]]
            .getChildByName('PointerLabel')
            .getComponent(cc.Label);
        label.string = label.string.slice(0, -1);
        this.chosenIndex[uid] = (this.chosenIndex[uid] + deltaIndex + this.buffCards.length) % this.buffCards.length;
        this.buffCards[this.chosenIndex[uid]]
            .getChildByName('PointerLabel')
            .getComponent(cc.Label)
            .string += 'v';
    }

    private closeUpgradeUI(): void {
        this.node.active = false;
    }
}
