import 'reflect-metadata'

import { metadata } from '../constants'

const metadateKeys = [
    metadata.MODULES,
    metadata.EXPORTS,
    metadata.COMPONENTS,
    metadata.CONTROLLERS,
]

/**
 * 校验参数
 */
const validateKeys = (keys: string[]) => {
    const isKeyValid = (key) => metadateKeys.findIndex(k => k === key) < 0
    const validateKey = (key) => {
        if(isKeyValid(key)){
            console.error(`不存在${key}`)
        }
    }
    keys.forEach(validateKey);
}

export const Module = (props): ClassDecorator => {
    const propsKeys = Object.keys(props)
    validateKeys(propsKeys)
    return (target: object) => {
        for(let property in props){
            if(props.hasOwnProperty(property)){
                Reflect.defineMetadata(property, props[property], target)
            }
        }
    }
}