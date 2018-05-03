/**
 * 基础设置类
 */
import { IServerSettings, TImports } from "@interfaces";
import { Env, Metadata } from "@common";
import { SERVER_SETTINGS } from "@constants";
import { Value } from "@decorators";
import { DebugController } from "./debug.controller";

// 根目录
const rootDir = process.cwd();
// 环境变量
const env = (process.env.NODE_ENV as Env) || Env.DEV;

export class LennethSetting implements IServerSettings {
  @Value(rootDir) rootDir: string;
  @Value(8080)
  port: string | number;
  @Value(env) env: string;
  @Value({ "/debug": DebugController })
  imports: TImports;

  /**
   * {
   *    imports,
   *    debug,
   *    env
   * }
   */
  static serverSettingMap = new Map<string, any>();

  /**
   * 子类实例对象,这个是关键的方法，用来获取设置参数的
   * @param target
   */
  getMetadata(target: any) {
    return Metadata.getOwn(SERVER_SETTINGS, target);
  }

  /**
   * 设置字段
   * @param propertyKey
   * @param value
   */
  setMap(propertyKey: string | IServerSettings, value?: any): void {
    if (typeof propertyKey == "string") {
      LennethSetting.serverSettingMap.set(propertyKey, value);
    } else {
      let setting = {
        rootDir: this.rootDir,
        port: this.port,
        env: this.env,
        ...propertyKey
      };
      // imports 特殊处理
      let _imports = this.imports;
      let imports = setting["imports"];
      setting["imports"] = { ...imports, ..._imports };
      Object.keys(setting).forEach(key => {
        this.setMap(key, setting[key]);
      });
    }
  }

  /**
   * 构建端口
   * listion(port, '0.0.0.0', callback)
   */
  getHttpPort(): { hostname: string; port: string | number } {
    let hostname = "0.0.0.0";
    return { hostname, port: LennethSetting.serverSettingMap.get("port") };
  }
}
