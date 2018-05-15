import {
  Interceptor,
  IInterceptor,
  HeaderParams,
  Next,
  TNext,
  Logger,
  Autowired
} from "@lenneth";

/**
 * 拦截器
 */
@Interceptor()
export class InterceptorClass implements IInterceptor {
  @Autowired("InterceptorClass") logger: Logger;
  async use(@HeaderParams() headers: any, @Next() next: TNext) {
    this.logger.info("InterceptorClass use");
    await next();
  }
}
