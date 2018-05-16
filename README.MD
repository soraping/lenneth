### lenneth -- a simple and quick node web framework on top of Koa2

> explain

基于 ES6+typescript 的一些特性，做了一些类似 spring 的注解方便开发，对开发本身不增加复杂度，不失 koa 的灵活性。

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
