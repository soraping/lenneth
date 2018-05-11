import { Middleware, HeaderParams, Next } from "@decorators";
import { IMiddleware, TNext } from "@interfaces";

@Middleware()
export class UserAuth implements IMiddleware {
  async use(@HeaderParams() headers: any, @Next() next: TNext) {
    console.log("UserAuth - headers", headers);
    await next();
  }
}
