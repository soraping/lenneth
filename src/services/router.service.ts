/**
 * koa-router 路由
 */
import * as path from "path";
import * as Koa from "koa";
import * as Router from "koa-router";
import { Autowired } from "@decorators";
import { IRouterPathConfig, IRouterParams, TApiMiddleware } from "@interfaces";
import { LENNETH_CONTROLLER_PATH, LENNETH_MIDDLEWARE_NAME } from "@constants";
import { Metadata } from "@common";
import { ParamsService } from "./params.service";
import { LoggerService } from "./logger.service";
import {
  getClass,
  isArray,
  toArray,
  getClassName,
  toAsyncMiddleware,
  apiDescriptionMapKey
} from "@utils";

type TRouterMiddleware = Router.IMiddleware;

export class RouterService {
  // 注入路由
  @Autowired()
  private router: Router;

  // 类方法参数服务
  @Autowired()
  private paramsService: ParamsService;

  @Autowired()
  private loggerService: LoggerService;

  constructor() {}
  /**
   * 路由配置信息
   */
  static DecoratedRouters: Map<
    IRouterPathConfig,
    TApiMiddleware | Array<TApiMiddleware>
  > = new Map();

  /**
   * 接口描述映射表
   */
  static DescriptionMap: Map<string, string> = new Map();

  /**
   * 载入路由
   */
  loadRouter(app: Koa) {
    let controllerList = [];
    let descriptionsMap = RouterService.DescriptionMap;
    for (let [config, controllers] of RouterService.DecoratedRouters) {
      if (!isArray(controllers)) {
        controllers = toArray(<TApiMiddleware>controllers);
      }
      // 重置数组内中间件方法
      controllers = (controllers as TApiMiddleware[]).map(item => {
        // 获取paramsMapKey参数
        // usebefore 特殊处理
        let controllerName =
          item.name != "use"
            ? item.name
            : `${config.name}_${item[LENNETH_MIDDLEWARE_NAME]}`;
        // 整理参数
        let paramsMapKey = ParamsService.fomartParamsMapKey(
          config.target,
          controllerName
        );
        // 转换方法
        return toAsyncMiddleware(
          config.target,
          item,
          paramsMapKey,
          this.paramsService.paramsToList
        );
      });

      // windows 兼容
      if (config.path == "/") {
        config.path = "";
      }
      let routerPath = `${Metadata.getOwn(
        `${LENNETH_CONTROLLER_PATH}_${getClassName(config.target)}`,
        config.target
      )}${config.path}`;
      // let routerPath = path.join(
      //   Metadata.getOwn(
      //     `${LENNETH_CONTROLLER_PATH}_${getClassName(config.target)}`,
      //     config.target
      //   ),
      //   <string>config.path
      // );

      // 判断追加中间件
      let multerKey = `${getClassName(config.target)}_${config.name}_Multer`;
      if (config.target[multerKey]) {
        controllers.unshift(config.target[multerKey]);
      }

      this.router[config.method.toLocaleLowerCase()](
        routerPath,
        ...(<TRouterMiddleware[]>controllers)
      );
      // 接口列表 print
      controllerList.push({
        method: config.method,
        url: routerPath,
        name: `${getClassName(config.target)}.${config.name}`,
        description:
          descriptionsMap.get(
            apiDescriptionMapKey(config.target, config.name)
          ) || ""
      });
    }
    app.use(this.router.routes());
    app.use(this.router.allowedMethods());
    // 日志
    let logstr = this.loggerService.drawTable(controllerList, {
      padding: 1,
      header: {
        method: "Method",
        url: "Endpoint",
        name: "Class method",
        description: "Description"
      }
    });
    this.loggerService.info("\n" + logstr.trim());
    // 节约内存
    RouterService.DescriptionMap.clear();
    RouterService.DecoratedRouters.clear();
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
          // let controllerPath = path.join(
          //   this._startWithSep(key),
          //   Metadata.getOwn(metadataName, item)
          // );
          let controllerPath = `${this._startWithSep(key)}${Metadata.getOwn(
            metadataName,
            item
          )}`;

          Metadata.set(metadataName, controllerPath, item);
        });
      } else {
        let metadataName = `${LENNETH_CONTROLLER_PATH}_${getClassName(
          imports[key]
        )}`;
        let importsPath = Metadata.getOwn(metadataName, imports[key]);
        if (importsPath == "/") {
          importsPath = "";
        }
        // 对window兼容，就不能用path.join
        let controllerPath = `${this._startWithSep(key)}${importsPath}`;
        Metadata.set(metadataName, controllerPath, imports[key]);
      }
    });
  }

  /**
   * 添加 /
   */
  _startWithSep(key: string) {
    if (!key.startsWith("/")) {
      key = `/${key}`;
    }
    return key;
  }
}
