export function Entity(tableName?:string) {
    return function(target: any) {
        const _tableName = tableName || target.name
        console.log("【_tableName】==>",_tableName)
    };
}
