import { LennethApplication, ServerSettings, ILenneth } from "../src";
import { UserController } from "./user.controller";
import * as logger from "koa-logger";

@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  port: "8082"
})
export class Lenneth extends LennethApplication implements ILenneth {}
