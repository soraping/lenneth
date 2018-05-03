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
import { toArray } from "@utils";
export const UseBefore = (middClass: Function): Function => {
  return (target: any, name: string, descriptor: ParameterDecorator) => {
    target[name] = toArray(target[name]);
    target[name].unshift(middClass.prototype.use);
  };
};
