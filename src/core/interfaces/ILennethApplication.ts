import * as Koa from "koa";
import { IBaseInterface } from "./IBase.interface";
export interface ILennthApplication extends IBaseInterface {
  //init(): Promise<this>;
  // use(middleware: Koa.Middleware): this;
  // listen(port: number | string, callback?: () => void): void;
  // listen(port: number | string, hostname: string, callback?: () => void): void;
  // hook
  // 初始化
  $onInit?(): void | Promise<any>;
  // 加载中间件
  $onMountingMiddlewares?: Function;
  // 路由编译后
  $afterRoutesInit?: Function;
  // start后
  $onReady?: Function;
  // server error
  $onServerInitError?(error: any): any;
}
