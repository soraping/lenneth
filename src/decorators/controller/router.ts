/**
 * 路由基本方法
 */
import { getClass } from "@utils";
import { IRouterParams } from "@interfaces";
export const Router = (params: IRouterParams): Function => {
  return (target: any, name: string, value: ParameterDecorator) => {};
};
