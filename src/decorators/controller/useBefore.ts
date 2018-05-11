/**
 * 类方法中间件，在方法执行前执行
 *
 *  @Controller('/user')
 *  class User{
 *
 *      @Get('/list')
 *      @UseBefore(UserMiddleware)
 *      async list(){
 *      }
 *  }
 */
import { toArray, getClassName } from "@utils";
import { ParamsService } from "@services";
export const UseBefore = (middClass: Function): Function => {
  return (target: any, name: string, descriptor: ParameterDecorator) => {
    // 对中间件的特殊处理，否则中间件属性修饰器无效
    // 旧值key
    let paramsMapKey = ParamsService.fomartParamsMapKey(middClass, "use");
    // 需要替换的key
    let userBeforeKey = ParamsService.fomartParamsMapKey(target, "use");
    // 替换值
    ParamsService.paramsMap.set(
      userBeforeKey,
      ParamsService.paramsMap.get(paramsMapKey)
    );
    // 删除原值
    ParamsService.paramsMap.delete(paramsMapKey);

    target[name] = toArray(target[name]);
    target[name].unshift(middClass.prototype.use);
  };
};
