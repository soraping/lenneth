import {
  Controller,
  Router,
  QueryParams,
  PathParams,
  HeaderParams,
  Get,
  UseBefore,
  Request,
  Response,
  Autowired,
  TContext,
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
  @Autowired() private userService: UserService;

  // @Router({
  //   method: "GET",
  //   path: "/test"
  // })
  // async testApi(ctx: TContext): Promise<any> {
  //   ctx.body = "hello world";
  // }

  @Get("/detail/:id")
  // @UseBefore(UserMiddleware)
  async test2Api(
    @PathParams("id") aid: string,
    @QueryParams("userId") id: string,
    @QueryParams("userName") name: string,
    @HeaderParams() header: any,
    @Request() request: TRequest,
    @Response() response: TResponse
  ) {
    console.log("test2Api");
    console.log("pathid", aid);
    console.log("userId", id);
    console.log("userName", name);
    console.log("HeaderParams", header);
    console.log("request", request);
    console.log("response", response);

    response.body = this.userService.getUserInfo();
  }
}
