/**
 * Create a parameters decorators
 */
import { Metadata } from "@common";
import { Type } from "@interfaces";
import { Autowired } from "../services";
import { LENNETH_CONTROLLER_PARAMS } from "@constants";
import { ParamsService } from "@services";

class Params {
  @Autowired() private paramsService: ParamsService;
  getName() {
    this.paramsService.getName();
  }
}

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

export const QueryParams = (paramsKey: string | any): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): any => {
    let key = `${LENNETH_CONTROLLER_PARAMS}_${propertyKey}`;
    let params: Array<string | any> = Metadata.getOwn(key, target, propertyKey);

    if (!params) {
      params = [paramsKey];
    } else if (params.indexOf(paramsKey) == -1) {
      params.unshift(paramsKey);
    } else {
      console.error(`参数${propertyKey}重名`);
    }

    Metadata.set(key, params, target, propertyKey);
  };
};

export const BodyParams = (paramsKey: string | any) => {};

export const PathParams = (paramsKey: string | any) => {};
