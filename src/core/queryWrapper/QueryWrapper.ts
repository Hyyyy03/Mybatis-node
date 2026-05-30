import {QueryConditionT, QueryWrapperT} from "../../types/QueryWrapper.js";
import {QUERY_WRAPPER_TYPE} from "./config/QueryWrapperType.js";

class QueryWrapper<T> {
    private conditions: QueryConditionT<T>[] = [];


    /*
    * equal =
    * */
    eq<K extends keyof T>(column: K, value: T[K]): this {
        this.pushToConditions<K>(QUERY_WRAPPER_TYPE.EQ,column,value);
        return this
    }

    /*
    * not equal !=
    * */
    ne<K extends keyof T>(column: K, value: T[K]): this {
        this.pushToConditions<K>(QUERY_WRAPPER_TYPE.NE,column,value);
        return this
    }

    /*
    * lower than <
    * */
    lt<K extends keyof T>(column: K, value: T[K]): this {
        this.pushToConditions<K>(QUERY_WRAPPER_TYPE.LT,column,value);
        return this
    }

    /*
    * lower or equal <=
    * */
    lte<K extends keyof T>(column: K, value: T[K]): this {
        this.pushToConditions<K>(QUERY_WRAPPER_TYPE.LTE,column,value);
        return this
    }

    /*
    * greater than >
    * */
    gt<K extends keyof T>(column: K, value: T[K]): this {
        this.pushToConditions<K>(QUERY_WRAPPER_TYPE.GT,column,value);
        return this
    }

    /*
    * greater or equal >=
    * */
    gte<K extends keyof T>(column: K, value: T[K]): this {
        this.pushToConditions<K>(QUERY_WRAPPER_TYPE.GTE,column,value);
        return this
    }

    /*
    * like
    * */
    like<K extends keyof T>(column: K, value: T[K]): this {
        this.pushToConditions<K>(QUERY_WRAPPER_TYPE.LIKE,column,value);
        return this
    }


    private pushToConditions<K extends keyof T>(type: QueryWrapperT, column: K, value: T[K]) {
        this.conditions.push({
            type,
            column,
            value
        })

    }

}

export default QueryWrapper;
