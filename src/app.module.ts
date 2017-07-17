import { Module } from './common'
import { TestModule } from './test.module'

@Module({
    modules: [ TestModule ]
})
export class ApplicationModule{

}