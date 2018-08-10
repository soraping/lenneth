import * as originalMulter from "koa-multer";
import { IMulterOptions } from "@interfaces";
/**
 * 上传文件注解
 * @param options
 */
export const Multer = (options: IMulterOptions) => {
  return (
    target: object | any,
    propertyKey: string,
    descriptor: ParameterDecorator
  ) => {};
};
