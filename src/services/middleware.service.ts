import { TApiMiddleware } from "@interfaces";
import { BaseService } from "./base.service";
import { ParamsType } from "@common";
/**
 * 中间件服务，用来转换中间件，将lenneth中间件转成koa中间件
 */
export class MiddlewareService extends BaseService {
  toAsyncMiddleware(middleware: TApiMiddleware, target: any) {}
}
