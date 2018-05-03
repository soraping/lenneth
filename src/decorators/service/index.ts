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
 * 赋值
 * @param value
 */
export const Value = (value: string | any = "") => {
  return (target: any, propertyKey: string) => {
    const descriptor = descriptorOf(target, propertyKey) || {
      writable: true,
      configurable: true
    };
    descriptor.value = value;
    Object.defineProperty(
      (target && target.prototype) || target,
      propertyKey,
      descriptor
    );
  };
};

/**
 * 注入service，类属性修饰器
 */
export const Autowired = (): Function => {
  return (target: any, propertyKey: string) => {
    // 获取该属性的类型
    let typeClass = Metadata.getType(target, propertyKey);

    const descriptor = descriptorOf(target, propertyKey) || {
      writable: true,
      configurable: true
    };
    descriptor.value = new typeClass();
    Object.defineProperty(
      (target && target.prototype) || target,
      propertyKey,
      descriptor
    );
  };
};
