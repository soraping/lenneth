import { Metadata } from "@common";
import { TApiMiddleware, TContext, TNext } from "@interfaces";

/**
 *  获取类
 * @param target
 */
export const getClass = (target: any): any => {
  return target.prototype ? target : target.constructor;
};

export const getClassOrSymbol = (target: any): any => {
  return typeof target === "symbol" ? target : getClass(target);
};

/**
 * 获取类名
 */
export const getClassName = (target: any): string => {
  return typeof target === "function" ? target.name : target.constructor.name;
};

/**
 *  判空
 * @param value
 */
export const isEmpty = (value: any): boolean => {
  return value === "" || value === null || value === undefined;
};

/**
 *  判数组
 * @param target
 */
export const isArray = (target: any): boolean => {
  return Array.isArray(target);
};

/**
 * 获取该属性的描述对象
 * @param target 类
 * @param propertyKey 目标属性
 */
export const descriptorOf = (
  target: any,
  propertyKey: string
): PropertyDescriptor | undefined => {
  return Object.getOwnPropertyDescriptor(
    (target && target.prototype) || target,
    propertyKey
  );
};

/**
 * 生成数组
 * @param target
 */
export const toArray = (target: any): any[] => {
  return target ? (Array.isArray(target) ? target : [target]) : [];
};

/**
 * 在每个方法的最外层封装一个原装的中间件，
 * 这样就能够在各自的方法体内获得属性修饰器，不受原来koa中间件的影响
 * @param middleware 新lenneth中间件
 * @param params 参数转换后数组序列
 */
export const toAsyncMiddleware = (
  middleware: TApiMiddleware,
  key?: string,
  cb?: (key: string, ctx: TContext) => any[]
) => {
  return async (ctx: TContext, next: TNext) => {
    if (key) {
      return middleware(...cb(key, ctx), ctx, next);
    }
    return middleware(ctx, next);
  };
};
