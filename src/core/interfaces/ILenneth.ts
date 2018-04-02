import { IBaseInterface } from "./IBase.interface";
export interface ILenneth extends IBaseInterface {
  start(): Promise<any>;
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
