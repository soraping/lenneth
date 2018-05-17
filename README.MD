### lenneth -- a simple and quick node web framework on top of Koa2

> 案例

[lenneth-demo](https://github.com/soraping/lenneth-demo)

> explain

基于 ES6+typescript 的一些特性，做了一些类似 spring 的注解，对开发本身不增加复杂度，并且不失 koa 的灵活性。
lenneth 内部已经集成了 koa, koa-bodyparser, koa-router 这 3 个基础库，已经满足了大部分的开发，如果需要引入其他的中间件，可以在入口文件中引入。

```javascript
import { LennethApplication, ILenneth, ServerSettings } from "lenneth";
import { logger } from "koa-logger";
import { UserController } from "./src/apis";

@ServerSettings({
  port: 8081,
  imports: {
    apis: UserController
  }
})
class App extends LennethApplication implements ILenneth {
  $onMountingMiddlewares() {
    // 引入logger中间件
    this.use(logger());
  }
}
```

> lenneth 抽象了 3 个模块，分别是 controller,middleware,service，内部不接入任何 db 和 cache。

延续 koa 在开发中的灵活性，不做任何操作规范

> install

```bash
yarn add lenneth
# or
npm install lenneth
```

> quick start

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
