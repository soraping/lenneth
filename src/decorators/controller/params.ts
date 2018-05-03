/**
 * Create a parameters decorators
 */
import { Metadata, ParamsType } from "@common";
import { Type, IParamsMapValue } from "@interfaces";
import { Autowired } from "@decorators";
import { ParamsService } from "@services";
import { toArray, getClassName } from "@utils";

const decorate = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
  paramsKey: string,
  type: ParamsType
) => {
  let paramsMap = ParamsService.paramsMap;
  // 拼接map字符key 类名_方法名
  let paramsMapKey = ParamsService.fomartParamsMapKey(target, propertyKey);
  let paramsValueList = toArray(paramsMap.get(paramsMapKey));
  // 按照序列填充数组
  paramsValueList[parameterIndex] = {
    parameterIndex,
    paramsType: type,
    paramsKey
  };
  ParamsService.paramsMap.set(paramsMapKey, paramsValueList);
};

export const QueryParams = (paramsKey: string | any): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): any => {
    decorate(
      target,
      propertyKey,
      parameterIndex,
      paramsKey,
      ParamsType.QUERYPARAMS
    );
  };
};

export const RequestBody = (paramsKey: string | any) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): any => {
    decorate(
      target,
      propertyKey,
      parameterIndex,
      paramsKey,
      ParamsType.BODYPARAMS
    );
  };
};

export const PathParams = (paramsKey: string | any) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): any => {
    decorate(
      target,
      propertyKey,
      parameterIndex,
      paramsKey,
      ParamsType.PATHPARAMS
    );
  };
};
