/**
 * 拦截器
 */
import { LENNETH_INTERCEPTOR_NAME } from "@constants";
import { createParamsMapKey } from "@utils";
export const Interceptor = () => {
  return (target: object | any) => {
    let paramsMapKey = createParamsMapKey(target, "use");
    target.prototype.use[LENNETH_INTERCEPTOR_NAME] = paramsMapKey;
  };
};
