import {
  LennethApplication,
  ServerSettings,
  ILenneth,
  IInterceptor,
  LennethLogger,
  Autowired
} from "@lenneth";
import { UserController } from "./user.controller";
import * as logger from "koa-logger";
@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  port: "8082"
})
export class Lenneth extends LennethApplication implements ILenneth {
  @Autowired("lenneth-app") logger: LennethLogger;

  // 初始化
  $onInit(): Promise<any> {
    this.logger.info("start $onInit");
    return new Promise((res, err) => {
      res();
    });
  }
  // 加载中间件
  $onMountingMiddlewares() {
    this.logger.info("start $onMountingMiddlewares");
    this.use(logger());
  }
  // 拦截器
  $interceptor(): IInterceptor {
    this.logger.info("start interceptor");
    return async (ctx, next) => {
      this.logger.info(ctx.method);
      await next();
    };
  }

  $onReady() {
    this.logger.info("lenneth server ready");
  }
}
