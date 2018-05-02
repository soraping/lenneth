import {
  Controller,
  Router,
  QueryParams,
  Get,
  UseBefore,
  Request,
  Response,
  Autowired,
  TContext,
  TNext,
  TRequest,
  TResponse
} from "@lenneth";

import { UserService } from "./user.service";

// const UserMiddleware = async (ctx: TContext, next: TNext): Promise<any> => {
//   console.log("UserMiddleware");
//   await next();
// };

@Controller("/user")
export class UserController {
  @Autowired() userService: UserService;

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
    @QueryParams("userId") id: string,
    @QueryParams("userName") name: string
    // @Request() request: TRequest,
    // @Response() response: TResponse
  ) {
    console.log("test2Api");
    console.log("userId", id);
    console.log("userName", name);
    // console.log("request", request);
    // console.log("response", response);
    // this.userService.getUserInfo();
  }
}
