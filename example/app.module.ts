import { Module } from "../src/common";
import { TestModule } from "./test.module";

@Module({
  modules: [TestModule]
})
export class ApplicationModule {}
