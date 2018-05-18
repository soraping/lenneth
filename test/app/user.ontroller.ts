import {
  Controller,
  Autowired,
  Get,
  Response,
  TResponse,
  PathVariable
} from "../../lib";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  @Autowired() userService: UserService;

  @Get("/list")
  async getUserList(@Response() response: TResponse) {
    response.body = this.userService.getUserList();
  }

  @Get("/detail/:id")
  async getUserDetail(
    @PathVariable("id") id: string,
    @Response() response: TResponse
  ) {
    response.body = this.userService.getUserById(id);
  }
}
