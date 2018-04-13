import * as path from "path";
import * as Koa from "koa";
import { ILennthApplication } from "@interfaces";
import { getClass, isArray, getClassName } from "@utils";
import { LENNETH_CONTROLLER_PATH } from "@constants";
import { Metadata } from "@common";
import { RouterService } from "@services";
import { LennethSetting } from "./lenneth-setting";

/**
 *  服务抽象类，定义实现方法和钩子函数
 */
export abstract class LennethApplication implements ILennthApplication {
  private app: Koa;
  private port?: number | string;
  private hostname?: string;
  // 配置类实例
  private lennethSetting: LennethSetting;

  constructor() {
    this.app = new Koa();
    this.lennethSetting = new LennethSetting();
    // 获取设置的service参数
    const _settingParams = LennethSetting.getMetadata(this);
    if (_settingParams) {
      this.setSettings(_settingParams);
    }
  }

  /**
   * 设置参数
   * @param settings
   */
  private setSettings(settings: LennethSetting) {
    this.lennethSetting.set(settings);
  }

  /**
   * 统一调用hook方法
   * @param key
   * @param elseFn
   * @param args
   */
  private callHook(key: string, elseFn = new Function(), ...args: any[]) {
    const self = this;
    if (key in self) {
      return self[key](...args);
    }
    return elseFn();
  }

  /**
   * 加载拦截器
   * 拦截器要在其他中间件前加载
   * 1. hook函数中添加拦截器
   * 2. 修饰器 @Interceptor
   * 两者都有时给出警告提示，并只执行@Interceptor修饰器的方法
   */
  private async loadInterceptor() {
    const self = this;
    if ("$interceptor" in self) {
      this.use(self["$interceptor"]());
    }
  }

  /**
   * 设置controller路由
   */
  private async loadRouters(): Promise<any> {
    let imports = this.lennethSetting.imports;
    this._loadControllerPath(imports);
    // 读取路由map值
    let decoratedRouters = RouterService.DecoratedRouters;
    console.log(decoratedRouters);
  }

  /**
   * 在瑞controller 路径
   * @param imports
   */
  private _loadControllerPath(imports) {
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

  /**
   * 启动服务
   */
  private async startServer(): Promise<any> {
    let { hostname, port } = this.lennethSetting.getHttpPort();
    return new Promise((res, err) => {
      this.app.listen(<number>port, hostname);
      res();
    });
  }

  /**
   *
   * @param middleware koa中间件
   */
  public use(middleware: Koa.Middleware): this {
    this.app.use(middleware);
    return this;
  }

  /**
   * start
   */
  public async start(): Promise<any> {
    const startTime = new Date();
    try {
      // 初始化(DB)
      await this.callHook("$onInit");
      // 拦截器
      await this.loadInterceptor();
      // 载入中间件
      await this.callHook("$onMountingMiddlewares", undefined, this.app);
      // 载入路由
      await this.loadRouters();
      // 启动服务
      await this.startServer();
      // 启动服务完成
      await this.callHook("$onReady");
    } catch (error) {
      this.callHook("$onServerInitError", undefined, error);
      return Promise.reject(error);
    }
  }
}
