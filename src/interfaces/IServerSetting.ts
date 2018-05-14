import { IBaseInterface } from "./IBase.interface";

export type TImports = { [path: string]: Function[] | Function };

export interface IServerSettings extends IBaseInterface {
  // 根目录
  rootDir?: string;
  // 监听端口
  port?: string | number;
  // api
  imports?: TImports;
  // 拦截器
  interceptor?: Function;
  // 错误处理error middlewara
  error?: Function;
  // 环境变量
  env?: string;
  debug?: boolean;
  [key: string]: any;
}
