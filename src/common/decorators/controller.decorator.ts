import 'reflect-metadata';
import { ControllerMetadata } from './../interface/controller/controller-metadata.interface';
import { PATH_METADATA } from '../constants'
import { isUndefined, isObject } from '../utils'

export const Controller = (metadata?: ControllerMetadata | string): ClassDecorator => {
    let path = isObject(metadata) ? metadata[PATH_METADATA] : metadata;
    path = isUndefined(path) ? '/' : path;
    return (target: object) => {
        Reflect.defineMetadata(PATH_METADATA, path, target)
    }
}