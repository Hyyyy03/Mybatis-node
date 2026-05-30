import {ENTITY_TABLE_NAME_KEY} from "../constants/index.js";
import {BaseEntity} from "../core/entity/index.js";
import {NotEntityError} from "../errors/NotEntityError.js";

/*
* Determine whether the passed-in object is an entity equipped with @Entity.
* @params entity: any type.
* @return boolean;
* */
export function isEntity(entity:any){
    if(!entity) return false;
    return entity instanceof BaseEntity;
}

/*
* Insert a class into the prototype chain without disrupting the existing inheritance relationship
* void function
* */
export function endExtend(child: Object, father: Object): void {
    const childCtor = child as any;
    const fatherCtor = father as any;

    const originalParent = Object.getPrototypeOf(childCtor);
    const originalParentProto = Object.getPrototypeOf(childCtor.prototype);

    Object.setPrototypeOf(fatherCtor.prototype, originalParentProto);
    Object.setPrototypeOf(fatherCtor, originalParent);

    Object.setPrototypeOf(childCtor.prototype, fatherCtor.prototype);
    Object.setPrototypeOf(childCtor, fatherCtor);
}

export function getEntityTableName(entity:any){
    if(!isEntity(entity)){
        throw new NotEntityError(entity);
    }
    return entity[ENTITY_TABLE_NAME_KEY];
}
