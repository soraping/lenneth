import { IlennethApplication, isFunction, LennethModuleMetatype, Logger } from '../common'
import { KoaAdapter } from './adapters/koa-adapter'
import { LennethApplocation } from './lenneth-application'
import { messages } from './constants'
import { DependenciesScanner } from './scanner'
import { LennethContainer } from './injector/container'

export class LennethFactory {

    private static logger = new Logger(LennethFactory.name)

    private static container = new LennethContainer();
    private static dependenciesScanner = new DependenciesScanner(LennethFactory.container)

    /**
     * 创建应用
     * @param module 模块
     * @param koa koa对象
     */
    public static create(
        module: LennethModuleMetatype,
        koa = KoaAdapter.create()
    ): IlennethApplication {
        this.initialize(module)
        return this.createNestInstance<LennethApplocation>(
            new LennethApplocation(koa)
        )
    }

    /**
     * 初始化
     * @param module 
     */
    private static initialize(module: LennethModuleMetatype){
        this.logger.log(messages.LENNETH_APPLICATION_START)
        this.dependenciesScanner.scan(module);
    }

    private static createNestInstance<T>(instance: T){
        return this.createProxy(instance)
    }

    private static createProxy(target){
        const proxy = this.createExceptionProxy()
        return new Proxy(target, {
            get: proxy,
            set: proxy,
        })
    }

    private static createExceptionProxy() {
        return (receiver, prop) => {
            if (!(prop in receiver))
                return;

            if (isFunction(receiver[prop])) {
                return (...args) => {
                    let result;
                    result = receiver[prop](...args);
                    return result;
                };
            }
            return receiver[prop];
        };
    }

}