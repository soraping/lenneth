import { IBaseInterface } from "./IBase.interface";

export type TImports = { [path: string]: Function[] | Function };

export interface IServerSettings extends IBaseInterface {
  rootDir?: string;
  port?: string | number;
  imports?: TImports;
  env?: string;
  debug?: boolean;
  [key: string]: any;
}
