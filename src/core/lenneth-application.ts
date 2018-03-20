import * as Koa from "koa";
import { ILennthApplication } from "./interfaces";
export abstract class LennethApplication implements ILennthApplication {
  private app: Koa;
  private port?: number | string;
  constructor() {
    this.app = new Koa();
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
   * 启动监听
   * @param port 端口号
   * @param args hostname | callback
   */
  public listen(port: number | string, ...args): void {
    this.app.listen(port, ...args);
  }
}
