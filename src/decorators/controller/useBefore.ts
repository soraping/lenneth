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
import { TMiddleware } from "@interfaces";
export const UseBefore = (middleware: TMiddleware): Function => {
  return (target: any, name: string, descriptor: ParameterDecorator) => {
    target[name] = toArray(target[name]);
    target[name].unshift(middleware);
  };
};
