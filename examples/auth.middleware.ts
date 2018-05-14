import { Middleware, HeaderParams, Next } from "@decorators";
import { IMiddleware, TNext } from "@interfaces";

@Middleware()
export class UserAuth implements IMiddleware {
  async use(@HeaderParams() headers: any, @Next() next: TNext) {
    await next();
  }
}

@Middleware()
export class GoodsAuth implements IMiddleware {
  async use(@HeaderParams("user-agent") ua: string, @Next() next: TNext) {
    await next();
  }
}
