import { Metadata } from "@common";
import { descriptorOf } from "@utils";
import { getClassName } from "@utils";
import { LENNETH_SERVICE_PATH } from "@constants";

export const Service = () => {
  return target => {
    console.log(`register service ${getClassName(target)}`);
  };
};

/**
 * 注入service，类属性修饰器
 */
export const Autowired = (value: object | string = ""): Function => {
  return (target: any, propertyKey: string) => {
    // 获取该属性的类型
    let typeClass = Metadata.getType(target, propertyKey);

    const descriptor = descriptorOf(target, propertyKey) || {
      writable: true,
      configurable: true
    };
    descriptor.value = value
      ? value
      : typeof typeClass == "object"
        ? typeClass.prototype
        : new typeClass();
    Object.defineProperty(
      (target && target.prototype) || target,
      propertyKey,
      descriptor
    );
  };
};
