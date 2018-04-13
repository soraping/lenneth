import { PathParamsType } from "@interfaces";
export class RouterService {
  /**
   * 路由配置信息
   */
  static DecoratedRouters: Map<
    { target: any; method: string; path: PathParamsType },
    Function | Function[]
  > = new Map();
}
