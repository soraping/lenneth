import * as Koa from "koa";
import { ILennthApplication } from "./interfaces";
class LennethApplication implements ILennthApplication {
  constructor(private app: Koa) {}
  /**
   * 启动监听
   * @param port 端口号
   * @param args hostname | callback
   */
  public async listen(port: number | string, ...args) {
    this.app.listen(port, ...args);
  }
}

export const lenneth = new LennethApplication(new Koa());
