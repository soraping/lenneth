import * as Koa from "koa";
import { Controller, Get } from "../src/common";

@Controller("test")
export class TestController {
  @Get("list")
  async getList(ctx: Koa.Context) {
    console.log(ctx.req);
  }
}
