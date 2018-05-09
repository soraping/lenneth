import { IBaseInterface } from "./IBase.interface";
export interface ILoggerService extends IBaseInterface {
  info(msg: any): void;
  debug(msg: any): void;
  error(msg: any): void;
}
