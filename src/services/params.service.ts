/**
 * requset参数类
 */
import { Service } from "@decorators";
import { BaseService } from "./base.service";
import { IParamsMapKey, IParamsMapValue, TContext } from "@interfaces";
import { ParamsType } from "@common";

// @Service()
export class ParamsService extends BaseService {
  // params 参数集合
  // map key classname_propertyKey
  static paramsMap: Map<string, IParamsMapValue[]> = new Map();

  /**
   * 返回参数序列
   * @param paramsMapKey
   * @param ctx
   */
  paramsToList(paramsMapKey: string, ctx: TContext) {
    return ParamsService.paramsMap.get(paramsMapKey).map(item => {
      switch (item.paramsType) {
        case ParamsType.PATHPARAMS:
          return ctx.params[item.paramsKey];
        case ParamsType.QUERYPARAMS:
          return ctx.request.query[item.paramsKey];
        case ParamsType.BODYPARAMS:
          return ctx.request.body;
        default:
          break;
      }
    });
  }
}
