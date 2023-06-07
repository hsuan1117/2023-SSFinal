export let Direction = {
    UP: cc.v2(0, 1),
    DOWN: cc.v2(0, -1),
    LEFT: cc.v2(-1, 0),
    RIGHT: cc.v2(1, 0)
}

export let eightDirections = []
for (let i = 0; i < 8; i++) {
    eightDirections.push(cc.v2(Math.cos(i * Math.PI / 4), Math.sin(i * Math.PI / 4)));
}

export function ignoreZ(v3: cc.Vec3){
    return cc.v2(v3.x, v3.y);
}

export function padZ(v2: cc.Vec2){
    return cc.v3(v2.x, v2.y, 0);
}

export function nodeDistanceSqr(node1: cc.Node, node2: cc.Node){
    return node1.convertToWorldSpaceAR(cc.v2(0, 0))
        .sub(node2.convertToWorldSpaceAR(cc.v2(0, 0)))
        .magSqr();
}

export function loadResource(path: string, type: typeof cc.Asset){
    return new Promise((resolve, reject) => {
        cc.resources.load(path, type, (err, res) =>
            err ? reject(err) : resolve(res)
        );
    })
}