import GameManager from "./GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MapManager extends cc.Component {

    private stageName: string = "ForestStage";

    private stageMap: cc.TiledMap = null;

    private mapWidth: number = 0;

    private mapHeight: number = 0;

    private visPos: object = {};

    private started: boolean = false;

    private decorationPrefabs: cc.Prefab[] = [];

    private decorationPrefabName: string[] = ["Fountain", "TimeGate", "DF_Tower", "Tree"];

    // onLoad () {}
    public init(stageName: string) {
        this.stageName = stageName;
        this.started = true;
        cc.resources.load("Map/" + this.stageName, cc.TiledMapAsset,(err, map: cc.TiledMap) => {
            cc.log("map = ", map);
            this.stageMap = map;
            this.mapWidth = 512;
            this.mapHeight = 512;
        });
        for (let i = 0; i < this.decorationPrefabName.length; i++) {
            cc.resources.load("Prefab/Decoration/" + this.decorationPrefabName[i], cc.Prefab, (err, prefab: cc.Prefab) => {
                this.decorationPrefabs[i] = prefab;
            });
        }
    }
    private generateBlock(pos) {
        let node = new cc.Node();
        let mp = node.addComponent(cc.TiledMap);
        mp.tmxAsset = this.stageMap;
        node.position = pos;
        node.parent = GameManager.instance.backgroundLayer;

        /*
        for (let i = -216 + 16; i <= 216 - 16; i += 32) {
            for (let j = -216 + 16; j <= 216 - 16; j += 32) {
                let rnd = Math.random();
                if (rnd < 0.1) {
                    let tree = cc.instantiate(this.decorationPrefabs[3]);
                    tree.parent = node;
                    tree.position = cc.v3(i, j, 0);
                }
            }
        }
         */

        if (Object.keys(this.visPos).length <= 20)
            return;

        // random generate fountain
        let rand = Math.random();
        if (rand < 0.01) {
            let fountain = cc.instantiate(this.decorationPrefabs[0]);
            fountain.parent = node;
            return;
        }

        // random generate time gate
        rand = Math.random();
        if (rand < 0.01) {
            let timeGate = cc.instantiate(this.decorationPrefabs[1]);
            timeGate.parent = node;
            return;
        }

        // random generate DF tower
        rand = Math.random();
        if (rand < 0.01) {
            let dfTower = cc.instantiate(this.decorationPrefabs[2]);
            dfTower.parent = node;
            return;
        }
    }

    private posHash(x, y) {
        return `${x}*${y}`;
    }

    start () {

    }

    public autoGenerateMap() {
        let pos = cc.Camera.main.node.position;
        let tx = Math.floor(pos.x / this.mapWidth);
        let ty = Math.floor(pos.y / this.mapHeight);
        let combinedKey =  this.posHash(tx, ty);

        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                let key = this.posHash(tx + i, ty + j);
                if (key in this.visPos) continue;

                this.visPos[key] = true;

                let pos = cc.v2((tx + i) * this.mapWidth, (ty + j) * this.mapHeight);
                this.generateBlock(pos);
            }
        }
    }

    update (dt) {
        if (this.started)
            this.autoGenerateMap();
    }
}
