import {
  Controller,
  Router,
  QueryParams,
  Get,
  UseBefore,
  TContext,
  TNext
} from "@lenneth";

const UserMiddleware = async (ctx: TContext, next: TNext): Promise<any> => {
  console.log("UserMiddleware");
  await next();
};

@Controller("/user")
export class UserController {
  @Router({
    method: "GET",
    path: "/test"
  })
  async testApi(ctx: TContext): Promise<any> {
    ctx.body = "hello world";
  }

  @Get("/test2")
  @UseBefore(UserMiddleware)
  async test2Api(ctx: TContext) {
    console.log("test2Api");
    ctx.body = "test2";
  }
}
