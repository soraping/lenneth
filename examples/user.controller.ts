import {
  Controller,
  Router,
  QueryParams,
  Get,
  UseBefore,
  Request,
  Response,
  TContext,
  TNext,
  TRequest,
  TResponse
} from "@lenneth";

// const UserMiddleware = async (ctx: TContext, next: TNext): Promise<any> => {
//   console.log("UserMiddleware");
//   await next();
// };

@Controller("/user")
export class UserController {
  // @Router({
  //   method: "GET",
  //   path: "/test"
  // })
  // async testApi(ctx: TContext): Promise<any> {
  //   ctx.body = "hello world";
  // }

  @Get("/detail")
  // @UseBefore(UserMiddleware)
  async test2Api(
    @QueryParams("userId") userId: string,
    @QueryParams("userName") userName: string,
    @Request() request: TRequest,
    @Response() response: TResponse
  ) {
    console.log("test2Api");
  }
}
