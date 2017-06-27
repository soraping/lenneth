import { IlennethApplication, Logger } from './../common'
import * as Koa from 'koa'
import { messages } from './constants'

export class LennethApplocation implements IlennethApplication {

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
        this.isInitialized = true
    }

    listen(port: number, callback?: () => void){
        (!this.isInitialized) && this.init()
        this.server = this.koa.listen(port, callback)
        return this.server
    }

}