import {DataBaseConnectConfigT} from "../../types/index.js";
import {createPool, Pool} from "mysql2";
import {BaseMapper} from "../baseMapper/index.js";
import {bindMappers, bindPool, getAllPool, getPoolByConfig} from "./databasePool.js";

export function createDataBase(config: DataBaseConnectConfigT, mappers?: BaseMapper<any>[]): Pool {
    const pool = createPool(config);
    pool.on('connection', () => {
        console.log(`Database connection established: ${config.host}:${config.port}/${config.database}`);
        const key = config.key || config.host
        bindMappers(key, mappers || []);
        bindPool(key, pool);
    });
    pool.on('error', (err) => {
        console.error(`Database pool error: ${err.message}`);
    });

    pool.on('acquire', () => {
        console.debug(`Connection acquired`);
    });

    return pool;
}

export async function disconnect(config: DataBaseConnectConfigT) {
    const pool = getPoolByConfig(config);
    if (pool) {
        try {
            await disconnectPool(pool);
        } catch (err) {
            console.error(`Database pool error: ${err}`);
        }
    }
}

export async function disconnectAll() {
    for (let item of getAllPool()) {
        if (item) {
            try {
                await disconnectPool(item);
            } catch (err) {
                console.error(`Database pool error: ${err}`);
            }
        }
    }
}

function disconnectPool(pool: Pool) {
    if (pool) {
        return new Promise((resolve, reject) => {
            pool.end((err) => {
                if (err) {
                    console.error(`Database pool disconnected error: ${err.message}`);
                    reject(err);
                } else {
                    console.debug(`Database disconnected: ${err}`);
                    resolve(true);
                }
            })
        })
    }
    return Promise.reject(new Error(`Database pool disconnected`));
}
