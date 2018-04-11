/**
 * 基础设置类
 */
import { IServerSettings, TImports } from "@interfaces";
import { Env, Metadata } from "@common";
import { SERVER_SETTINGS } from "@constants";
import { DebugController } from "./debug.controller";

// 根目录
const rootDir = process.cwd();
// 环境变量
const env = (process.env.NODE_ENV as Env) || Env.DEV;

export class LennethSetting implements IServerSettings {
  // 存储设置参数
  protected map = new Map<string, any>();

  constructor() {
    this.rootDir = rootDir;
    this.port = 8080;
    this.env = env;
    this.debug = true;
    this.imports = {
      // "/debug": DebugController
    };
  }

  set rootDir(path: string) {
    this.map.set("rootDir", path);
  }

  get rootDir(): string {
    return this.map.get("rootDir");
  }

  set imports(values: TImports) {
    let imports = this.imports;
    let newImports = { ...imports, ...values };
    this.map.set("imports", newImports);
  }

  get imports(): TImports {
    return this.map.get("imports");
  }

  set port(value: string | number) {
    this.map.set("port", value);
  }

  get port(): string | number {
    return this.map.get("port");
  }

  set env(env: string) {
    this.map.set("env", env);
  }

  get env(): string {
    return this.map.get("env");
  }

  get debug(): boolean {
    return this.map.get("debug");
  }

  set debug(value: boolean) {
    this.map.set("debug", value);
  }

  static getMetadata(target: any) {
    return Metadata.getOwn(SERVER_SETTINGS, target);
  }

  /**
   * 设置字段
   * @param propertyKey
   * @param value
   */
  set(propertyKey: string | IServerSettings, value?: any): LennethSetting {
    if (typeof propertyKey == "string") {
      this.map.set(propertyKey, value);
    } else {
      const self: LennethSetting = this;
      Object.keys(propertyKey).forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(
          LennethSetting.prototype,
          key
        );
        if (descriptor && ["set", "map"].indexOf(key) === -1) {
          self[key] = propertyKey[key];
        } else {
          this.set(key, propertyKey[key]);
        }
      });
    }
    return this;
  }

  /**
   * 构建端口
   * listion(port, '0.0.0.0', callback)
   */
  getHttpPort(): { hostname: string; port: string | number } {
    let hostname = "0.0.0.0";
    return { hostname, port: this.map.get("port") };
  }
}
