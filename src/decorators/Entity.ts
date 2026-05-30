import {BaseEntity} from "../core/entity/index.js";
import {endExtend} from "../utils/EntityUtils.js";
import {ENTITY_TABLE_NAME_KEY} from "../constants/index.js";

export function Entity(tableName?:string) {
    return function(target: any) {
        const _tableName = tableName || target.name
        endExtend(target,BaseEntity);
        (target as BaseEntity)[ENTITY_TABLE_NAME_KEY] = _tableName;
        console.log("【target】==>",target)
    };
}
