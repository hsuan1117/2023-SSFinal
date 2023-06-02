export let Direction = {
    UP: cc.v2(0, 1),
    DOWN: cc.v2(0, -1),
    LEFT: cc.v2(-1, 0),
    RIGHT: cc.v2(1, 0)
}

export function ignoreZ(v3: cc.Vec3){
    return cc.v2(v3.x, v3.y);
}

export function padZ(v2: cc.Vec2){
    return cc.v3(v2.x, v2.y, 0);
}