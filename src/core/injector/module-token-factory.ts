import { Metatype, LennethModuleMetatype, isUndefined } from '../../common'

export class ModuleTokenFactory {
    public create(metatype: LennethModuleMetatype, scope: LennethModuleMetatype[]): string {
        const opaqueToken = {
            module: this.getModuleName(metatype),
            scope: this.getScopeStack(scope)
        }
        return JSON.stringify(opaqueToken)
    }

    public getModuleName(metatype: LennethModuleMetatype): string{
        return metatype.name
    }

    public getScopeStack(scope: LennethModuleMetatype[]): string[]{
        return scope.map(module => module.name)
    }
}