import GameManager from "./GameManager";
import delayTime = cc.delayTime;
const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleManager extends cc.Component {

    @property(Array)
    public particleList: string[] = ["White Explosion", "Red Explosion"];

    private particlePrefabs: {[particleName: string]: cc.Prefab} = {};

    private prefabPath: string = "Prefab/ParticleEffect/";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    public createParticle(particleName: string, pos: cc.Vec3, delaytime: number, parent: cc.Node = GameManager.instance.bulletLayer) {
        this.scheduleOnce(() => {
            const particle: cc.Node = GameManager.instance.poolManager.createPrefab(this.particlePrefabs[particleName]);
            particle.parent = parent;
            particle.position = pos;

            particle.active = true;
            particle.getComponent(cc.ParticleSystem).resetSystem();

            this.scheduleOnce(() => {
                GameManager.instance.poolManager.recycle(particle);
            }, 1);
        }, delaytime);

    }

    start () {
        for (const enemyType of this.particleList) {
            cc.resources.load("Prefab/ParticleEffect/" + enemyType, cc.Prefab, (err, prefab: cc.Prefab) => {
                this.particlePrefabs[enemyType] = prefab;
            });
        }
    }

    // update (dt) {}
}
