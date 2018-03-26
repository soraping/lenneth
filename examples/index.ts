import { Lenneth, ServerSettings } from "../src/index";
import { UserController } from "./user.controller";

@ServerSettings({
  imports: {
    "/apis": [UserController]
  },
  port: "8082"
})
class LennethApp extends Lenneth {}

new LennethApp()
  .start()
  .then(() => {})
  .catch(() => {});
