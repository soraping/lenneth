import {
  LennethApplication,
  ServerSettings,
  ILenneth,
  IInterceptor
} from "lenneth";
import { UserController } from "./user.controller";
import * as logger from "koa-logger";

@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  port: "8082"
})
export class Lenneth extends LennethApplication implements ILenneth {
  // 初始化
  $onInit(): Promise<any> {
    console.log("start $onInit");
    return new Promise((res, err) => {
      res();
    });
  }
  // 加载中间件
  $onMountingMiddlewares() {
    console.log("start $onMountingMiddlewares");
    this.use(logger()).use(async (ctx, next) => {
      ctx.body = "hello world";
    });
  }
  // 拦截器
  $interceptor(): IInterceptor {
    console.log("interceptor");
    return async (ctx, next) => {
      console.log(ctx.method);
      await next();
    };
  }
  //
  $onReady() {
    console.log("lenneth server ready");
  }
}
