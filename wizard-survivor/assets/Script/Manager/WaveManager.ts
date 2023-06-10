import {ignoreZ} from "../Helper/utils";
import {padZ} from "../Helper/utils";
import GameManager from "./GameManager";
import winSize = cc.winSize;

const {ccclass, property} = cc._decorator;

@ccclass
export default class WaveManager extends cc.Component {

    private enemyTypes: string[] = ["BumpingPig"];

    @property(cc.JsonAsset)
    private waveData: cc.JsonAsset = null;

    private enemyPrefabs: cc.Prefab[] = [];

    private enemyPrefabPath: string = "Prefab/Enemy";

    private spawnRadius: number = 600;

    private currentWave: any = null;

    private spawnCenter: cc.Vec2 = null;

    private countDowns: number[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    setWave(wave: number){
        this.currentWave = this.waveData.json[wave];
    }

    start () {
        // set wave
        this.setWave(0);
        // load enemy prefab
        for (const enemyType of this.enemyTypes) {
            cc.resources.load("Prefab/Enemy/" + enemyType, cc.Prefab, (err, prefab: cc.Prefab) => {
                cc.log(prefab);
                this.enemyPrefabs[enemyType] = prefab;
            });
        }
    }

    update (dt) {
        // set swpan center to camera center
        this.spawnCenter = ignoreZ(cc.Camera.main.node.position).sub(cc.v2(winSize.width / 2, cc.winSize.height / 2));

        for (const key in this.currentWave){
            if (this.countDowns[key] === undefined) {
                this.countDowns[key] = 0;
            }
            if (this.countDowns[key] <= 0){
                for (let i = 0; i < this.currentWave[key]["spawnNum"]; i++){
                    this.spawnEnemy(this.enemyPrefabs[key], this.randomSpawnPos());
                }
                this.countDowns[key] = this.currentWave[key].spawnInterval;
            } else {
                this.countDowns[key] -= dt;
            }
        }
    }

    private randomSpawnPos(){
        let angle = Math.random() * 2 * Math.PI;
        let vec = cc.v2(Math.cos(angle) * this.spawnRadius, Math.sin(angle) * this.spawnRadius);
        return this.spawnCenter.add(vec);
    }

    private spawnEnemy(enemyPrefab: cc.Prefab, pos: cc.Vec2){
        let enemy = GameManager.instance.poolManager.createPrefab(enemyPrefab);
        enemy.position = padZ(pos);
        cc.log(enemy);
        enemy.active = true;
        enemy.parent = this.node;
        enemy.getComponent("EnemyController").init();
    }
}
