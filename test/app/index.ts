import { LennethApplication, ILenneth, ServerSettings } from "../../lib";
import { UserController } from "./user.ontroller";

@ServerSettings({
  port: 8087,
  imports: {
    apis: UserController
  }
})
export class App extends LennethApplication implements ILenneth {}
