import { Controller, Router, QueryParams } from "@lenneth";

@Controller("/user")
export class UserController {
  @Router({
    method: "GET",
    path: "/test"
  })
  async testApi(ctx): Promise<any> {
    ctx.body = "hello world";
  }
}
