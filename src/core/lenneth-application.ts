import * as Koa from "koa";
import { ILennthApplication } from "./interfaces";
export class LennethApplication implements ILennthApplication {
  private app: Koa;
  private port?: number | string;
  protected map = new Map<string, any>();
  constructor() {
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
   * 启动监听
   * @param port 端口号
   * @param args hostname | callback
   */
  public listen(port?: number | string, ...args): void {
    this.app.listen(port || this.port, ...args);
  }
}
