import { 
    LennethModuleMetatype, 
    Injectable, 
    IController, 
    LennethModule } from '../../common'

import { InstanceWrapper } from './container'


export class Module {

    private _relatedModules = new Set<Module>();
    private _components = new Map<any, InstanceWrapper<Injectable>>();
    private _routes = new Map<any, InstanceWrapper<IController>>();
    private _exports = new Set<string>();

    constructor(
        private _metatype: LennethModuleMetatype,
        private _scope: LennethModuleMetatype[]
    ){
        this.addModuleAsComponent();
    }

    get scope(): LennethModuleMetatype[] {
        return this._scope;
    }

    get relateModules(): Set<Module> {
        return this._relatedModules;
    }

    get routes(): Map<any, InstanceWrapper<IController>>{
        return this._routes;
    }

    get exports(): Set<string>{
        return this._exports;
    }

    get components(): Map<any, InstanceWrapper<Injectable>>{
        return this._components;
    }

    get metatype(): LennethModuleMetatype{
        return this._metatype;
    }

    get instance(): LennethModule{
        if(!this._components.has(this._metatype.name)){
            console.error(`has no ${this._metatype.name}`)
        }
        const module = this._components.get(this._metatype.name)
        return module.instance
    }

    public addModuleAsComponent() {
        this._components.set(this._metatype.name, {
            name: this._metatype.name,
            metatype: this._metatype,
            isResolved: false,
            instance: null
        })
    }

    public addRelatedModule(relatedModule){
        this._relatedModules.add(relatedModule);
    }

}