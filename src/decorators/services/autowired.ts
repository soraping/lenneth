/**
 * 注入service，类属性修饰器
 */
import { descriptorOf } from "@utils";
import { Metadata } from "@common";
import { LENNETH_SERVICE_PATH } from "@constants";

export const Autowired = (value: string = ""): Function => {
  return (target: any, propertyKey: string) => {
    const descriptor = descriptorOf(target, propertyKey);
    // 获取该属性的类型
    let typeName = typeof propertyKey;
    let TargetService = Metadata.getOwn(
      `${LENNETH_SERVICE_PATH}_${typeName}`,
      typeName
    );
    // 重新赋值
    Object.defineProperty((target && target.prototype) || target, propertyKey, {
      get: function() {
        value = value ? value : new TargetService();
        return value;
      },

      set: function(v) {
        value = v;
      },
      enumerable: true,
      configurable: true
    });
  };
};
