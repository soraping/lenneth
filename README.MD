### lenneth -- a simple and quick node web framework on top of Koa2

> 案例

[lenneth-demo](https://github.com/soraping/lenneth-demo)

> 说明

封装 lenneth 旨在快速方便的搭建出一个 node web 应用，不过度封装也不随波逐流，kao 的 node 是简单的，lenneth 也是。

基于 ES6+typescript 的一些特性，做了一些类似 spring 的注解，对开发本身不增加复杂度，并且不失 koa 的灵活性。
lenneth 内部已经集成了 koa, koa-bodyparser, koa-router 这 3 个基础库，已经满足了大部分的开发，如果需要引入其他的中间件，可以在入口文件中引入。

lenneth 抽象了 3 个模块，分别是 controller,middleware,service，内部不接入任何 db 和 cache。

> 安装

```bash
yarn add lenneth
# or
npm install lenneth
```

> 瞄一眼

```javascript
import { LennethApplication, ServerSettings, ILenneth } from "lenneth";

@ServerSettings({
  port: 8081
})
class App extends LennethApplication implements ILenneth {
  $onMountingMiddlewares() {
    this.use(async (ctx, next) => {
      ctx.body = "hello world";
    });
  }
}

new App().start();
```

open in browser

```
http://localhost:8081
```

> 各个模块

* application

入口文件处，使用 ServerSettings 修饰，里面的参数都是一些全局方法，如 interceptor，response 等，这些都是一个 middleware，lenneth 只是依照 koa 的洋葱模型调整了他们的执行顺利

```javascript
@ServerSettings({
  port: 8081,
  // controller
  imports: {
    "/apis": UserController
  },
  // 拦截器
  interceptor: Interceptor,
  // 返回值封装
  response: AppResponse,
  // error事件捕获
  globalError: GlobalError
})
class App extends LennethApplication implements ILenneth {
  $onMountingMiddlewares() {
    this.use(logger());
  }
}
```

* controller

controller 主要是设置 router 和注入 services

router 的修饰器有 Post,Get 等,params 参数的获取同 spring，注入 service 使用修饰器 Autowired,这个也和 spring 一致

```javascript
import {
  Controller,
  Autowired,
  Post,
  Get,
  RequestBody,
  PathVariable,
  Response,
  TResponse,
  UseBefore,
  Description
} from "lenneth";
import { UserService } from "../services";
import { IUserInfo } from "../interface";
import { UserAuth, RuleAuth } from "../middleware";

@Controller("/user")
export class UserController {
  @Autowired() userService: UserService;

  @Post("/add")
  @Description("添加会员")
  @UseBefore(UserAuth, RuleAuth)
  async addUser(
    @RequestBody() user: IUserInfo,
    @Response() response: TResponse
  ) {
    response.body = this.userService.addUser(user);
  }

  @Get("/detail/:userId")
  @UseBefore(UserAuth)
  @Description("查询会员")
  async getUser(
    @PathVariable("userId") userId: string,
    @Response() response: TResponse
  ) {
    response.body = this.userService.getUserInfo(userId);
  }
}
```

* middleware

middleware 本质上其实就是 koa 的中间件，只不过我在此基础上又抽象出一层方法来引入获取 params 的方法，用来方便开发

在 controller 每个 api 上，使用 UseBefore 修饰器即可使用这些 middleware，在运行期，middleware 先于 controller 定义的接口，如果 middleware 没有调用 next 函数，则不会调用下一个中间件(kao 洋葱模型)

```javascript
import { IMiddleware, Middleware, Next, TNext, HeaderParams } from "lenneth";

@Middleware()
export class UserAuth implements IMiddleware {
  async use(@HeaderParams() headers: any, @Next() next: TNext) {
    await next();
  }
}

@Middleware()
export class RuleAuth implements IMiddleware {
  async use(@HeaderParams() headers: any, @Next() next: TNext) {
    await next();
  }
}
```

* service

这个模块只是做一个类输出方法

```javascript
export class UserService {
  addUser(userInfo: IUserInfo) {
    return userInfo;
  }

  getUserInfo(id: string) {
    return {
      name: "zhangsan",
      age: 30
    };
  }
}
```
