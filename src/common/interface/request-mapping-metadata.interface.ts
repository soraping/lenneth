import { RequestMethod } from '../enums'

export interface RequestMappingMetadata {
    path?: string,
    method?: RequestMethod
}