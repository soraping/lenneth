/**
 *  获取类名
 * @param target
 */
export const getClass = (target: any): any => {
  return target.prototype ? target : target.constructor;
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
