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

export function ignoreZ(v3: cc.Vec3) {
    return cc.v2(v3.x, v3.y);
}

export function padZ(v2: cc.Vec2) {
    return cc.v3(v2.x, v2.y, 0);
}

export function nodeDistanceSqr(node1: cc.Node, node2: cc.Node) {
    return node1.convertToWorldSpaceAR(cc.v2(0, 0))
        .sub(node2.convertToWorldSpaceAR(cc.v2(0, 0)))
        .magSqr();
}

export function loadResource(path: string, type: typeof cc.Asset) {
    return new Promise<cc.Asset>((resolve, reject) => {
        cc.resources.load(path, type, (err, res) =>
            err ? reject(err) : resolve(res)
        );
    })
}

export function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

type EnvConfig = {
    PUSHER_CONFIG: {
        broadcaster: string,
        key: string,
        cluster: string,
        forceTLS: boolean,
        wsHost: string,
        wsPath: string,
        wsPort: number
    },
    API_CONFIG: {
        API_URL: string
    }
}

export const PROD_ENV: EnvConfig = {
    PUSHER_CONFIG: {
        broadcaster: 'pusher',
        key: "app-key",
        cluster: "mt1",
        forceTLS: false,
        wsHost: "final.hsuan.app",
        wsPath: "/websockets",
        wsPort: null
    },
    API_CONFIG: {
        API_URL: "https://final.hsuan.app/api"
    }
}

export const DEV_ENV: EnvConfig = {
    PUSHER_CONFIG: {
        broadcaster: 'pusher',
        key: "app-key",
        cluster: "mt1",
        forceTLS: false,
        wsHost: "localhost",
        wsPath: "",
        wsPort: 6001
    },
    API_CONFIG: {
        API_URL: "http://localhost:8000/api"
    },
}

// todo: you can change DEV_ENV to PROD_ENV to switch to production mode
export const CURRENT_ENV = DEV_ENV;

export async function api(method, endpoint, jsonBody?) {
    return fetch(CURRENT_ENV.API_CONFIG.API_URL + endpoint, {
        method,
        body: (method === "GET" || typeof jsonBody === "undefined") ? null : JSON.stringify(jsonBody),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => {
        if (res.status === 401)
            localStorage.removeItem('token')
        return res.json()
    })
}