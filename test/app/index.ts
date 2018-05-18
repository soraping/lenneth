import { LennethApplication, ILenneth, ServerSettings } from "../../src";

@ServerSettings({
  port: 8087
})
export class App extends LennethApplication implements ILenneth {}
