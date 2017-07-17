import { IController } from '../controller'

export interface ModuleMetadata {
    modules?: any[],
    controllers?: IController[] | any[],
    exports?: any[],
    components?: any[]
}