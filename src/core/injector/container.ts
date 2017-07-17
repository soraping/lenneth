import 'reflect-metadata'
import { Metatype, LennethModuleMetatype } from '../../common'
import { Module } from './module';
import { ModuleTokenFactory } from './module-token-factory';

export class LennethContainer {

    private readonly modules = new Map<string, Module>();
    private readonly moduleTokenFactory = new ModuleTokenFactory()
    
    public addModule(metatype: LennethModuleMetatype, scope: LennethModuleMetatype[]){
        const token = this.moduleTokenFactory.create(metatype, scope)
        if(this.modules.has(token)){
            return
        }
        this.modules.set(token, new Module(metatype, scope))
    }

    public getModules(): Map<string, Module> {
        return this.modules;
    }

    public addRelatedModule(relatedModule: LennethModuleMetatype, token: string){
        if(!this.modules.has(token)) return;
        const module = this.modules.get(token);
        const parent = module.metatype
        const relatedModuleToken = this.moduleTokenFactory.create(
            relatedModule,
            [].concat(module.scope, parent)
        )
        const related = this.modules.get(relatedModuleToken);
        module.addRelatedModule(related);
    }

}

export interface InstanceWrapper<T> {
    name: any;
    metatype: Metatype<T>;
    instance: T;
    isResolved: boolean;
    inject?: Metatype<any>[];
    isNotMetatype?: boolean;
}