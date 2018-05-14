import { Interceptor, IInterceptor, HeaderParams, Next, TNext } from "@lenneth";

/**
 * 拦截器
 */
@Interceptor()
export class InterceptorClass implements IInterceptor {
  async use(@HeaderParams() headers: any, @Next() next: TNext) {
    await next();
  }
}
