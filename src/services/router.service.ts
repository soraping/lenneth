/**
 * koa-router 路由
 */
import * as path from "path";
import * as Koa from "koa";
import * as Router from "koa-router";
import { Autowired } from "@decorators";
import { PathParamsType, IRouterParams } from "@interfaces";
import { LENNETH_CONTROLLER_PATH } from "@constants";
import { Metadata } from "@common";
import { ParamsService } from "./params.service";
import {
  getClass,
  isArray,
  toArray,
  getClassName,
  toAsyncMiddleware
} from "@utils";

type TRouterMiddleware = Router.IMiddleware;

export class RouterService {
  // 注入路由
  @Autowired() private router: Router;

  // 类方法参数服务
  @Autowired() private paramsService: ParamsService;

  constructor() {}
  /**
   * 路由配置信息
   */
  static DecoratedRouters: Map<
    { target: any; method: string; path: PathParamsType },
    TRouterMiddleware | Array<TRouterMiddleware>
  > = new Map();

  /**
   * 载入路由
   */
  loadRouter(app: Koa) {
    for (let [config, controllers] of RouterService.DecoratedRouters) {
      if (!isArray(controllers)) {
        controllers = toArray(<TRouterMiddleware>controllers);
      }
      // 重置数组内中间件方法
      controllers = (controllers as TRouterMiddleware[]).map(item => {
        // 整理参数
        let paramsMapKey = ParamsService.fomartParamsMapKey(
          config.target,
          item.name
        );
        // 转换方法
        return toAsyncMiddleware(
          config.target,
          item,
          paramsMapKey,
          this.paramsService.paramsToList
        );
      });

      let routerPath = path.join(
        Metadata.getOwn(
          `${LENNETH_CONTROLLER_PATH}_${getClassName(config.target)}`,
          config.target
        ),
        <string>config.path
      );
      this.router[config.method.toLocaleLowerCase()](
        routerPath,
        ...(<TRouterMiddleware[]>controllers)
      );
    }
    app.use(this.router.routes());
    app.use(this.router.allowedMethods());
  }

  /**
   * 拼接controller 路径
   * @param imports
   */
  joinControllerPath(imports) {
    Object.keys(imports).forEach(key => {
      if (isArray(imports[key])) {
        (imports[key] as any[]).forEach(item => {
          let metadataName = `${LENNETH_CONTROLLER_PATH}_${getClassName(item)}`;
          let controllerPath = path.join(
            key,
            Metadata.getOwn(metadataName, item)
          );
          Metadata.set(metadataName, controllerPath, item);
        });
      } else {
        let metadataName = `${LENNETH_CONTROLLER_PATH}_${getClassName(
          imports[key]
        )}`;
        let controllerPath = path.join(
          key,
          Metadata.getOwn(metadataName, imports[key])
        );
        Metadata.set(metadataName, controllerPath, imports[key]);
      }
    });
  }
}
