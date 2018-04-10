import * as Koa from "koa";
import { IBaseInterface } from "./IBase.interface";

export type IInterceptor = Koa.Middleware;

export interface ILenneth extends IBaseInterface {
  // hook
  // 初始化
  $onInit?(): void | Promise<any>;
  // 加载中间件
  $onMountingMiddlewares?: Function;
  // 路由编译前
  $beforeRoutesInit?: Function;
  // 路由编译时
  $onRoutesInit?: Function;
  // 路由编译后
  $afterRoutesInit?: Function;
  // start后
  $onReady?: Function;
  // 执行拦截器
  $interceptor?(): IInterceptor;
  // server error
  $onServerInitError?(error: any): any;
  // 自添加参数方法
  [key: string]: any;
}
