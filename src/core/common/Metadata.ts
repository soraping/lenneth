/**
 * reflect 方法封装
 */
import "reflect-metadata";
import { getClass } from "../utils";
import { DESIGN_TYPE } from "../../constants";

export class Metadata {
  static get(key: string, target: any, propertyKey?: string | symbol): any {
    return Reflect.getMetadata(key, getClass(target), propertyKey);
  }

  static set(
    key: string,
    value: any,
    target: any,
    propertyKey?: string | symbol
  ): any {
    return Reflect.defineMetadata(key, value, getClass(target), propertyKey);
  }

  static getOwn(key: string, target: any, propertyKey?: string | symbol): any {
    return Reflect.getOwnMetadata(key, getClass(target), propertyKey);
  }
}
