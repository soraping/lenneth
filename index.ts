import { LennethApp } from "./examples";

new LennethApp()
  .start()
  .then(() => console.log("app start 8082"))
  .catch(() => console.log("app start failed"));
