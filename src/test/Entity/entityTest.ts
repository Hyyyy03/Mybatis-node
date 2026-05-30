import {Entity} from "../../decorators/index.js";
import QueryWrapper from "../../core/queryWrapper/QueryWrapper.js";
@Entity()
class EntityTest {
    userName:string;
    age:number;
}


new QueryWrapper<EntityTest>().eq("userName","张三").eq("age",10)
