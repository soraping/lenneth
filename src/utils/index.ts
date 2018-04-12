/**
 *  获取类名
 * @param target
 */
export const getClass = (target: any): any => {
  return target.prototype ? target : target.constructor;
};

export const getClassOrSymbol = (target: any): any => {
  return typeof target === "symbol" ? target : getClass(target);
};

/**
 *
 * @param value
 */
export const isEmpty = (value: any): boolean => {
  return value === "" || value === null || value === undefined;
};

/**
 *
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
