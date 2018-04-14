/**
 * koa-router 路由
 */
import * as path from "path";
import * as Koa from "koa";
import * as Router from "koa-router";
import { PathParamsType, IRouterParams } from "@interfaces";
import { LENNETH_CONTROLLER_PATH } from "@constants";
import { Metadata } from "@common";
import { getClass, isArray, getClassName } from "@utils";

type TRouterMiddleware = Router.IMiddleware;

export class RouterService {
  static router = new Router();

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
  static loadRouter(app: Koa) {
    for (let [config, controllers] of this.DecoratedRouters) {
      if (!isArray(controllers)) {
        controllers = [<TRouterMiddleware>controllers];
      }
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
  static joinControllerPath(imports) {
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
