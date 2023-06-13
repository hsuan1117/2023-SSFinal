import GameManager from "./GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleManager extends cc.Component {

    @property(Array)
    public particleList: string[] = ["White Explosion"];

    private particlePrefabs: {[particleName: string]: cc.Prefab} = {};

    private prefabPath: string = "Prefab/ParticleEffect/";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    public createParticle(particleName: string, pos: cc.Vec3, parent: cc.Node = GameManager.instance.bulletLayer) {
        this.scheduleOnce(() => {
            const particle = cc.instantiate(this.particlePrefabs[particleName]);
            particle.parent = parent;
            particle.position = pos;

            particle.stopAllActions();
        }, 0.1);
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
