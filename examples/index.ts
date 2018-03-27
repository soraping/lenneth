import { LennethApplication, ServerSettings } from "../src/index";
import { UserController } from "./user.controller";

@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  port: "8082"
})
class LennethApp extends LennethApplication {}

new LennethApp().listen();
