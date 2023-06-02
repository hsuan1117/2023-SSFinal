const {ccclass, property} = cc._decorator;

@ccclass
export default class PoolManager extends cc.Component {

    private pool: {[key: string] : cc.NodePool} = {};

    /*
    從參數的 Prefab 返回一個節點。Prefab.name 將被用作存取對象池的鍵值，請確保所有 Prefab 的名字是唯一的，並請勿修改返回節點的名稱。
    1. 返回的節點必須自行初始化
    2. 返回的節點必須自行載到場景樹上
    3. 請勿修改返回節點的名稱。
     */
    public createPrefab(prefab: cc.Prefab, dontUsePool: boolean = false): cc.Node {
        if (dontUsePool) return cc.instantiate(prefab);

        if (!this.pool[prefab.name]){
            this.pool[prefab.name] = new cc.NodePool();
        }

        if (this.pool[prefab.name].size() <= 0){
            const node = cc.instantiate(prefab);
            return node;
        }

        return this.pool[prefab.name].get();
    }

    /*
    將參數的節點放入對象池，並從場景樹卸載。
    node.name 將被用作存取對象池的鍵值，請勿修改節點的名稱。
    如果節點沒有所屬的對象池，直接 destroy 節點。
     */
    public recycle(node: cc.Node){
        if (!this.pool[node.name]){
            node.destroy();
            return;
        }
        this.pool[node.name].put(node);
    }

    public preCreate(prefab: cc.Prefab, count: number){
        if (!this.pool){
            this.pool[prefab.name] = new cc.NodePool();
        }
        for (let i = 0; i < count; i++){
            this.pool[prefab.name].put(cc.instantiate(prefab));
        }
    }
}
