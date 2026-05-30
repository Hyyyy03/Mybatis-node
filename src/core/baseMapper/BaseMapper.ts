import {BaseEntity} from "../entity/index.js";
import {getEntityTableName, isEntity} from "../../utils/EntityUtils.js";
import {NotEntityError} from "../../errors/NotEntityError.js";
import {Pool} from "mysql2";
import {getPoolByMapper} from "../database/index.js";

export class BaseMapper<T>{
    private entity:BaseEntity;
    private pool:Pool;
    constructor(entity:Object) {
        if(!isEntity(entity)){
            throw new NotEntityError(entity)
        }
        this.entity = entity as BaseEntity;
        this.pool = getPoolByMapper(this);
        if(!this.pool){
            throw new Error("Pool not found");
        }
    }

    public insert(entity:T){
        const tableName = getEntityTableName(entity);
    }


}
