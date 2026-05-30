import {QUERY_WRAPPER_TYPE} from "../core/queryWrapper/config/QueryWrapperType.js";

export interface QueryConditionT<
    T,
    K extends keyof T = keyof T
> {
    type: string;
    column: K;
    value: T[K];
}

export type QueryWrapperT = typeof QUERY_WRAPPER_TYPE[keyof typeof QUERY_WRAPPER_TYPE];
