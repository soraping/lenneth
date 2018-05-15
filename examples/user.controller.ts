import {
  Controller,
  Router,
  RequestParam,
  PathVariable,
  HeaderParams,
  RequestBody,
  Description,
  Get,
  Post,
  UseBefore,
  Request,
  Response,
  Autowired,
  IContext,
  TRequest,
  TResponse
} from "@lenneth";

import { UserService } from "./user.service";
import { UserAuth, GoodsAuth } from "./auth.middleware";

@Controller("/user")
export class UserController {
  @Autowired() private userService: UserService;

  @Post("/add")
  @Description("添加用户")
  async add(
    @RequestBody() user: { name: string },
    @Response() response: TResponse
  ) {
    console.log("RequestBody", user);
    response.body = user;
  }

  @Get("/detail/:id")
  @UseBefore(UserAuth, GoodsAuth)
  @Description("获取用户信息")
  async test2Api(
    @PathVariable("id") aid: string,
    @RequestParam("userId") id: string,
    @RequestParam("userName") name: string,
    @HeaderParams() header: any,
    @Request() request: TRequest,
    @Response() response: TResponse,
    ctx: IContext
  ) {
    // console.log("test2Api");
    // console.log("pathid", aid);
    // console.log("userId", id);
    // console.log("userName", name);
    // console.log("HeaderParams", header);
    // console.log("request", request);
    // console.log("response", response);
    // response.body = this.userService.getUserInfo();
    ctx.throw(400, "haha", { errorData: { user: "zhangsan" } });
  }
}
