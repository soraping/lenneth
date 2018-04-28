import { Lenneth } from "./examples";
new Lenneth()
  .start()
  .then()
  .catch(e => console.error("app start failed => ", e));
