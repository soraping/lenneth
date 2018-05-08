import { IBaseInterface } from "./IBase.interface";
export interface ILoggerService extends IBaseInterface {
  log(msg: any): void;
  info(msg: any): void;
  debug(msg: any): void;
  error(msg: any): void;
}
