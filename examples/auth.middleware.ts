import { Middleware } from "@decorators";
import { IMiddleware } from "@interfaces";

@Middleware()
class Auth implements IMiddleware {
  use() {}
}
