import { Controller, Router } from "@lenneth";

@Controller("/user")
export class UserController {
  @Router({
    method: "GET",
    path: "/test"
  })
  async test(): Promise<any> {}
}
