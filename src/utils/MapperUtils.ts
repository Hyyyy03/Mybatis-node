import {BaseMapper} from "../core/baseMapper/index.js";

export function isMapper(mapper:Object){
    return mapper instanceof BaseMapper;
}
