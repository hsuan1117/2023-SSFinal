import GameManager from "./GameManager";
import delayTime = cc.delayTime;
const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleManager extends cc.Component {

    @property(Array)
    public particleList: string[] = ["White Explosion", "Red Explosion", "Smoke", "Level Up", "Enemy Explosion", "Open Chest", "Roar"];

    private particlePrefabs: {[particleName: string]: cc.Prefab} = {};

    private prefabPath: string = "Prefab/ParticleEffect/";

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
    }

    // update (dt) {}
}
