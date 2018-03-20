import { Lenneth } from "./examples";

new Lenneth().listen("8081", () => {
  console.log("lenneth start 8081");
});
