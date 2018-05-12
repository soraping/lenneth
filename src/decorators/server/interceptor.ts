/**
 * 拦截器
 */
import { Metadata } from "@common";
import { LENNETH_INTERCEPTOR_NAME } from "@constants";
import { ParamsService } from "@services";
export const Interceptor = () => {
  return (target: object | any) => {
    let paramsMapKey = ParamsService.fomartParamsMapKey(target, "use");
    target.prototype.use[LENNETH_INTERCEPTOR_NAME] = paramsMapKey;
  };
};
