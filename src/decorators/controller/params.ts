/**
 * Create a parameters decorators
 */
import { Metadata } from "@common";
import { Type } from "@interfaces";

/**
 * 属性修饰器创建方法
 * @param token
 * @param options
 */
const decorate = (
  token: Type<any> | symbol,
  options: any
): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): any => {
    if (typeof parameterIndex === "number") {
      const settings = Object.assign(
        {
          target,
          propertyKey,
          parameterIndex
        },
        options
      );
    }
  };
};

export const PathParams = (paramsKey: string | any) => {};

export const BodyParams = (paramsKey: string | any) => {};

export const QueryParams = (paramsKey: string | any) => {};
