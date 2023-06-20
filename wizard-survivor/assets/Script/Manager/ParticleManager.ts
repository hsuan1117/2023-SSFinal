import GameManager from "./GameManager";
import delayTime = cc.delayTime;
import WaveManager from "./WaveManager";
import {loadResource, padZ} from "../Helper/utils";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleManager extends cc.Component {

    @property(Array)
    public particleList: string[] = ["White Explosion", "Red Explosion", "Smoke", "Level Up", "Enemy Explosion", "Open Chest", "Roar"];

    private particlePrefabs: {[particleName: string]: cc.Prefab} = {};

    private prefabPath: string = "Prefab/ParticleEffect/";

    private readonly _damageNumberPrefabPath = 'Prefab/Effect/DamageNumber'
    private readonly _damageNumberStyle = [
        {threshold: 150, color: cc.Color.WHITE, fontSize: 30},
        {threshold: 300, color: cc.Color.YELLOW, fontSize: 40},
        {threshold: 500, color: cc.Color.RED, fontSize: 50},
        {threshold: Infinity, color: cc.Color.BLUE, fontSize: 60},
    ]
    private readonly _damageNumberDelay = 0.05;
    private readonly _damageNumberDuration = 0.5;
    private _damageNumberOffset = cc.v2(10, 10);
    private _damageNumberPrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    public createParticle(particleName: string, pos: cc.Vec3, delaytime: number, durationtime: number, parent: cc.Node = GameManager.instance.bulletLayer) {
        this.scheduleOnce(() => {
            const particle: cc.Node = GameManager.instance.poolManager.createPrefab(this.particlePrefabs[particleName]);
            particle.parent = parent;
            particle.position = pos;

            particle.active = true;
            particle.getComponent(cc.ParticleSystem).resetSystem();

            this.scheduleOnce(() => {
                particle.active = false;
            }, durationtime + 1);

            this.scheduleOnce(() => {
                GameManager.instance.poolManager.recycle(particle);
            }, durationtime + 1);
        }, delaytime);
    }

    start () {
        for (const particleType of this.particleList) {
            cc.resources.load("Prefab/ParticleEffect/" + particleType, cc.Prefab, (err, prefab: cc.Prefab) => {
                this.particlePrefabs[particleType] = prefab;
            });
        }
        loadResource(this._damageNumberPrefabPath, cc.Prefab)
            .then((prefab: cc.Prefab) => this._damageNumberPrefab = prefab);
    }

    protected onEnable() {
        GameManager.instance.waveManager.event.on(WaveManager.ON_ENEMY_HIT, this.onEnemyHit, this);
    }

    protected onDisable() {
        GameManager.instance.waveManager.event.off(WaveManager.ON_ENEMY_HIT, this.onEnemyHit, this);
    }

    private onEnemyHit({enemyPosition, damage}: {enemyPosition: cc.Vec3, damage: number}) {

        this.scheduleOnce(() => {
            const damageLabel = GameManager.instance.poolManager
                .createPrefab(this._damageNumberPrefab, true)
                .getComponent(cc.Label);

            damageLabel.node.setPosition(enemyPosition.add(padZ(this._damageNumberOffset)));
            damageLabel.string = damage.toString();
            damageLabel.node.getComponent(cc.Animation).play('DamageNumberFadedOut');
            for (const style of this._damageNumberStyle) {
                if (damage < style.threshold) {
                    damageLabel.node.color = style.color;
                    damageLabel.fontSize = style.fontSize;
                    damageLabel.enableBold = true;
                    break;
                }
            }
            damageLabel.node.parent = GameManager.instance.bulletLayer;

            this._damageNumberOffset.addSelf(cc.v2(8, 8));

            this.scheduleOnce(() => {
                GameManager.instance.poolManager.recycle(damageLabel.node);
                this._damageNumberOffset.subSelf(cc.v2(8, 8));
            }, this._damageNumberDuration);
        }, this._damageNumberDelay);
    }
}
