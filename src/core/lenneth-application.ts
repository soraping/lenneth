import * as Koa from 'koa'
import { IlennethApplication, Logger, validatePath } from './../common'
import { messages } from './constants'
import { ApplicationConfig } from './application-config'
import { KoaAdapter } from './adapters/koa-adapter'

export class LennethApplocation implements IlennethApplication {
    // 配置
    private readonly config = new ApplicationConfig()
    // 日志
    private readonly logger = new Logger(LennethApplocation.name)
    // 是否初始化
    private isInitialized = false
    // 缓存服务
    private server = null

    constructor(private readonly koa: Koa){

    }

    init(){
        this.logger.log(messages.LENNETH_APPLICATION_READY)
        // 注册路由
        //const router = KoaAdapter.createRouter(validatePath(this.config.getGlobalPrefix()))

        this.isInitialized = true
    }

    listen(port: number, callback?: () => void){
        (!this.isInitialized) && this.init()
        this.server = this.koa.listen(port, callback)
        return this.server
    }

}