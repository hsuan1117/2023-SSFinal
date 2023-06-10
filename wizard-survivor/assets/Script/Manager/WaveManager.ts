import {ignoreZ, loadResource} from "../Helper/utils";
import {padZ} from "../Helper/utils";
import GameManager from "./GameManager";
import winSize = cc.winSize;

const {ccclass, property} = cc._decorator;

/*
1. 用一個 json 檔案來記錄每一波要出現的敵人種類、數量、間隔等等。目前暫定用編輯器那邊來設定json
2. 用一個陣列來紀錄敵人種類（暫定）
3. 呼叫 setWave() 來設定波數， 0 暫定為不會生怪

json 格式：
{
  "1": { // 第一波
    "BumpingPig": { // 敵人種類
      "spawnInterval": 10, // 生怪間隔
      "spawnNum": 10 // 每次生怪數量
    }
  },
}
 */
@ccclass
export default class WaveManager extends cc.Component {

    public event: cc.EventTarget;
    /*
    * 事件：當敵人死亡時觸發
    *
    * callbackFn: ({enemyPosition: cc.Vec3, killByUid: string}) => void
     */
    public static readonly ON_ENEMY_DIE: string = "onEnemyDie";

    private enemyDropItems: {[itemType: string]: cc.Prefab};
    private enemyDropItemsType: string[] = ["Coin", "ExpStone", "HpPack"];
    private enemyDropItemsRate: number[] = [0.3, 0.5, 0.2];

    private enemyTypes: string[] = ["BumpingPig", "SmallSkeleton"];

    private waveData: cc.JsonAsset = null;

    private waveDataName: string = "testwave";

    private enemyPrefabs: cc.Prefab[] = [];

    private enemyPrefabPath: string = "Prefab/Enemy";

    private spawnRadius: number = 600; // 剛好在螢幕外

    private currentWave: any = null;

    private spawnCenter: cc.Vec2 = null;

    private countDowns: number[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    setWave(wave: number){
        this.currentWave = this.waveData.json[wave];
    }

    public init () {
        // load enemy prefab
        for (const enemyType of this.enemyTypes) {
            cc.resources.load("Prefab/Enemy/" + enemyType, cc.Prefab, (err, prefab: cc.Prefab) => {
                this.enemyPrefabs[enemyType] = prefab;
            });
        }
        cc.resources.load("Wave data/" + this.waveDataName, cc.JsonAsset, (err, json: cc.JsonAsset) => {
            this.waveData = json;
        });

        // load drop item prefab
        this.enemyDropItems = {};
        for (let i=0; i<this.enemyDropItemsType.length; i++){
            const type = this.enemyDropItemsType[i];
            loadResource('Prefab/Drops/' + type, cc.Prefab)
                .then((prefab: cc.Prefab) => {
                    this.enemyDropItems[type] = prefab;
                });
        }
    }

    onLoad(){
        this.event = new cc.EventTarget();
        this.event.on(WaveManager.ON_ENEMY_DIE, this.onEnemyDie, this);
    }


    update (dt) {
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

    private onEnemyDie({enemyPosition, killByUid}: {enemyPosition: cc.Vec3, killByUid: string}){
        this.dropRandomItem(enemyPosition);
    }

    private dropRandomItem(position: cc.Vec3){
        const random = Math.random();
        let sum = 0;
        for (let i = 0; i < this.enemyDropItemsType.length; i++){
            sum += this.enemyDropItemsRate[i];
            if (random < sum){
                let item = GameManager.instance.poolManager.createPrefab(this.enemyDropItems[this.enemyDropItemsType[i]]);
                item.position = position;
                item.active = true;
                item.parent = GameManager.instance.node;
                break;
            }
        }
    }
}
