import * as Koa from "koa";
import { ILennthApplication } from "./interfaces";
import { LennethSetting } from "./lenneth-setting";

/**
 *  服务抽象类，定义实现方法和钩子函数
 */
export abstract class LennethApplication implements ILennthApplication {
  private app: Koa;
  private port?: number | string;
  protected map = new Map<string, any>();
  constructor(private lennethSetting: LennethSetting) {
    this.app = new Koa();
    this.port = 8080;
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
   * 调用hook
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
   * start
   */
  public start() {
    return new Promise((resolve, reject) => {
      this.app.listen;
    });
  }
}
