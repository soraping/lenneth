import * as Koa from 'koa'
import { LennethFactory } from './core'
import { IlennethApplication } from './common'
import { ApplicationModule } from './app.module'

const koa = new Koa()

koa.use(async (ctx) => {
    ctx.body = 'hello world'
})

const app: IlennethApplication = LennethFactory.create(ApplicationModule, koa)

app.listen(3035)