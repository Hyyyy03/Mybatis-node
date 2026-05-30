import {BaseMapper} from "../baseMapper/index.js";
import {isMapper} from "../../utils/MapperUtils.js";
import {NotMapperError} from "../../errors/NotMapperError.js";
import {DataBaseConnectConfigT} from "../../types/index.js";
import {Pool} from "mysql2";

const mapperMap:Map<string,BaseMapper<any>[]> = new Map();
const poolMap:Map<string,Pool> = new Map();

export function bindMappers(key:string,mappers:BaseMapper<any>[],reWrite:boolean = false){
    if(!isMapper(mappers)) throw new NotMapperError(mappers);
    if(reWrite){
        mapperMap.set(key,mappers)
        return true;
    }
    const mps = mapperMap.get(key);
    mapperMap.set(key,mps ? [...mps,mappers] : mappers);
    return true;
}

export function bindPool(key:string,pool:Pool){
    if(pool){
        poolMap.set(key,pool);
        return true;
    }
    return false;
}

export function getPoolByConfig(config:DataBaseConnectConfigT){
    for(let key of poolMap.keys()){
        if(key === config.key || key === config.host){
            return poolMap.get(key);
        }
    }
    return null;
}

export function getPoolByMapper(mapper:BaseMapper<any>){
    //when the length of poolMap is only 1
    if(poolMap.size === 1) return Array.from(mapperMap.values())[0];
    for(let [key,mappers] of mapperMap.entries()){
        if(mappers.includes(mapper)) return poolMap.get(key);
    }
    return null;
}



export function getAllPool(){
    return poolMap.values();
}
