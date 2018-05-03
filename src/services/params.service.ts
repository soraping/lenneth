/**
 * requset参数类
 */
import { Service } from "@decorators";
import { BaseService } from "./base.service";
import { IParamsMapKey, IParamsMapValue, TContext } from "@interfaces";
import { ParamsType } from "@common";
import { getClassName } from "@utils";

// @Service()
export class ParamsService extends BaseService {
  // params 参数集合
  // map key classname_propertyKey
  static paramsMap: Map<string, IParamsMapValue[]> = new Map();

  /**
   * 拼接 paramsMap key值
   * @param target
   * @param propertyKey
   */
  static fomartParamsMapKey(
    target: object | any,
    propertyKey: string | symbol
  ) {
    return `${getClassName(target)}_${propertyKey}`;
  }

  /**
   * 返回参数序列
   * @param paramsMapKey
   * @param ctx
   */
  paramsToList(paramsMapKey: string, ctx: TContext) {
    return ParamsService.paramsMap.get(paramsMapKey).map(item => {
      switch (item.paramsType) {
        case ParamsType.PATHPARAMS:
          // path
          return ctx.params[item.paramsKey];
        case ParamsType.QUERYPARAMS:
          // query
          return ctx.request.query[item.paramsKey];
        case ParamsType.BODYPARAMS:
          // body
          return item.paramsKey
            ? ctx.request.body[item.paramsKey]
            : ctx.request.body;
        case ParamsType.REQUEST:
          // request
          return ctx.request;
        case ParamsType.RESPONSE:
          // response
          return ctx.response;
        case ParamsType.HEADERPARAMS:
          // header
          return item.paramsKey
            ? ctx.request.headers[item.paramsKey]
            : ctx.request.headers;
        default:
          break;
      }
    });
  }
}
