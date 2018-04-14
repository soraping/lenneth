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
 *
 * @param target
 * @param propertyKey
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
  return Array.isArray(target) ? target : [target];
};
