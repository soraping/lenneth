import { Module } from './common'
import { TestController } from './test.controller'

@Module({
    controllers: [TestController]
})
export class TestModule {

}