/**
 * 修饰类，生成koa中间件
 */
import { getClassName } from "@utils";
export const Middleware = () => {
  return (target: any) => {
    // 给use方法添加一个middlewarName属性
    let middlewarName = `${getClassName(target)}_use`;
    target.prototype.use["middlewarName"] = middlewarName;
  };
};
