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
  async use(@Err() error: any, @Response() response: TResponse, ctx: IContext) {
    this.logger.error(error);
    // ctx.body = {
    //   status: error.status,
    //   message: error.message,
    //   data: error.data
    // };
  }
}
