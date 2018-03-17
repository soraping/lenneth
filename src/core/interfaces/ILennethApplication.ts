import { IBaseInterface } from "./IBase.interface";
export interface ILennthApplication extends IBaseInterface {
  //init(): Promise<this>;
  //use(...args): this;
  listen(port: number | string, callback?: () => void): Promise<any>;
  listen(
    port: number | string,
    hostname: string,
    callback?: () => void
  ): Promise<any>;
}
