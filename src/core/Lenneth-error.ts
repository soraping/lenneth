/**
 * 全局默认error处理
 */
import { ErrorMiddlewar, Err, Response, Autowired } from "@decorators";
import {
  IErrorMiddlewar,
  TResponse,
  IErrorResponse,
  IContext
} from "@interfaces";
import { HttpStatus } from "@common";
import { LoggerService } from "@services";

@ErrorMiddlewar()
export class LennethGlobalError implements IErrorMiddlewar {
  @Autowired("lenneth-global-error") logger: LoggerService;
  async use(@Err() error: any, @Response() response: TResponse): Promise<any> {
    // 默认500
    this.logger.error(error);
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (typeof error == "string") {
      return (response.body = { message: error, status });
    }
    return (response.body = {
      status: error.status,
      message: error.message,
      data: error.data
    });
  }
}
