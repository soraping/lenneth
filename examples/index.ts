import {
  LennethApplication,
  ServerSettings,
  ILenneth,
  Logger,
  Autowired
} from "@lenneth";
import * as logger from "koa-logger";
import { UserController } from "./user.controller";
import { InterceptorClass } from "./interceptor";
import { GlobalError } from "./error";
@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  interceptor: InterceptorClass,
  // error: GlobalError,
  port: "8082"
})
export class Lenneth extends LennethApplication implements ILenneth {
  @Autowired("lenneth-app") logger: Logger;

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
    // this.use(logger());
  }

  $onReady() {
    this.logger.info("lenneth server ready 8082");
  }
}
