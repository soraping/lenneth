import { Logger, BaseLayout, LogEvent, Layout } from "ts-log-debug";
import { formatLogData } from "@utils";
import { ILoggerService, ILogTableSettings } from "@interfaces";
import { BaseService } from "./base.service";

/**
 * 自定义日志模版
 */
@Layout({ name: "customJson" })
class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent): string {
    const log = {
      startTime: loggingEvent.startTime,
      categoryName: loggingEvent.categoryName,
      level: loggingEvent.level.toString(),
      data: loggingEvent.data,
      context: loggingEvent.context
    };

    log.data = log.data.map(data => formatLogData([data]));

    return JSON.stringify(log);
  }
}

export class LoggerService implements ILoggerService {
  private _loggerName: string;

  constructor(loggerName: string = "lenneth") {
    this._loggerName = loggerName;
  }

  info(msg: any) {
    this.use().info(msg);
  }

  debug(msg: any) {
    this.use().debug(msg);
  }

  error(msg: any) {
    this.use().error(msg);
  }

  drawTable(list: any[], setting: ILogTableSettings): string {
    return this.use().drawTable(list, setting);
  }

  private use(): Logger {
    const logger = new Logger(this._loggerName);
    logger.appenders.set("std-log", {
      type: "console",
      level: ["debug", "info", "trace"]
    });
    return logger;
  }
}
