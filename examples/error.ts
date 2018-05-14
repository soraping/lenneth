import {
  ErrorMiddlewar,
  IErrorMiddlewar,
  Err,
  Response,
  TResponse,
  Next,
  TNext,
  IContext
} from "@lenneth";

@ErrorMiddlewar()
export class GlobalError implements IErrorMiddlewar {
  async use(@Err() error: any, @Response() response: TResponse) {
    console.log(error);
  }
}
