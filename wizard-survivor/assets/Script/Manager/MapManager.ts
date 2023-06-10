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
    }
    private generateBlock(pos) {
        let node = new cc.Node();
        let mp = node.addComponent(cc.TiledMap);
        mp.tmxAsset = this.stageMap;
        node.position = pos;
        node.parent = GameManager.instance.backgroundLayer;
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
