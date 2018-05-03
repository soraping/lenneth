import {
  Controller,
  Router,
  QueryParams,
  PathParams,
  HeaderParams,
  RequestBody,
  Get,
  Post,
  UseBefore,
  Request,
  Response,
  Autowired,
  TContext,
  TRequest,
  TResponse
} from "@lenneth";

import { UserService } from "./user.service";
import { UserAuth } from "./auth.middleware";

@Controller("/user")
export class UserController {
  @Autowired() private userService: UserService;

  @Post("/add")
  async add(
    @RequestBody() user: { name: string },
    @Response() response: TResponse
  ) {
    console.log("RequestBody", user);
    response.body = user;
  }

  @Get("/detail/:id")
  // @UseBefore(UserAuth)
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
