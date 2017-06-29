import { Controller } from '../controller'

export interface ModuleMetadata {
    modules?: any[],
    controllers?: Controller[] | any[],
    exports?: any[],
    components?: any[]
}