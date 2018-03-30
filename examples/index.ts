import { LennethApplication, ServerSettings } from "../src/index";
import { UserController } from "./user.controller";
import * as logger from "koa-logger";

@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  port: "8082"
})
export class LennethApp extends LennethApplication {}
