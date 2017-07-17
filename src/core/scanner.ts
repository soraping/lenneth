import 'reflect-metadata'
import { LennethModuleMetatype } from '../common'
import { metadata } from '../common/constants'
import { LennethContainer } from './injector/container'

export class DependenciesScanner {
    constructor(private container: LennethContainer){}

    public scan(module: LennethModuleMetatype){
        this.scanForModules(module);
        this.scanModulesForDependencies()
    }

    /**
     * 
     * @param module 
     * @param scope 
     */
    private scanForModules(module: LennethModuleMetatype, scope: LennethModuleMetatype[] = []){
        this.storeModule(module, scope);
        const importModules = this.getMetadata(module, metadata.MODULES)
        importModules.map((itemModule)=>{
            this.scanForModules(itemModule, [].concat(scope, module))
        })
    }

    private storeModule(module: LennethModuleMetatype, scope: LennethModuleMetatype[]){
        this.container.addModule(module, scope)
    }

    
    private scanModulesForDependencies(){
        const modules = this.container.getModules()
        modules.forEach(({ metatype }, token) => {
            this.reflectRelatedModules(metatype, token)
        })
    }
    
    private reflectRelatedModules(module: LennethModuleMetatype, token: string){
        const modules = this.getMetadata(module, metadata.MODULES);
        modules.map((related) => {
            this.storeRelatedModule(related, token)
        })
    }

    public storeRelatedModule(related: LennethModuleMetatype, token: string){
        this.container.addRelatedModule(related, token)
    }

    /**
     * 
     * @param module 
     * @param metadata 
     */
    private getMetadata(module: LennethModuleMetatype, metadata: string){
        return Reflect.getMetadata(metadata, module) || []
    }

}