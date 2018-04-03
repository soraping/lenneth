import { IBaseInterface } from "./IBase.interface";
export interface ILenneth extends IBaseInterface {
  // hook
  // 拦截器
  $Interceptor?: Function;
  // 初始化
  $onInit?: Function;
  // 加载中间件
  $onMountingMiddlewares?: Function;
  // 路由编译后
  $afterRoutesInit?: Function;
  // start后
  $onReady?: Function;
  // server error
  $onServerInitError?: Function;
}
