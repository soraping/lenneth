/**
 * 返回值统一处理
 * 放在中间件最后的地方
 */
import { IMiddleware, IContext, TResponse, TNext } from "@interfaces";
import { Middleware, Response, Next } from "@decorators";
import { HttpStatus, ResponseStatus } from "@common";
import { LennethError } from "./Lenneth-error";
@Middleware()
export class LennethResponse implements IMiddleware {
  async use(@Response() response: TResponse, @Next() next: TNext) {
    try {
      // 执行前面所有的中间件
      await next();
      // 统一处理返回
      if (response.body) {
        return (response.body = {
          code: 0,
          message: ResponseStatus.SUCCESS,
          data: response.body
        });
      }
      return (response.body = { code: 0, message: ResponseStatus.SUCCESS });
    } catch (err) {
      if (err instanceof LennethError) {
        response.status = HttpStatus.OK;
        response.body = {
          code: err.code,
          message: err.message || ResponseStatus.ERROR
        };
        // 抛至最外层error全局处理
        throw err;
      }
    }
  }
}
