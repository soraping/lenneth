import { Lenneth, ServerSettings } from "../src/index";
import { UserController } from "./user.controller";

@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  port: "8082"
})
export class LennethApp extends Lenneth {}
