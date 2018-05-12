import { IBaseInterface } from "./IBase.interface";
export interface IInterceptor extends IBaseInterface {
  use(...args: any[]): void | any | Promise<any>;
}
