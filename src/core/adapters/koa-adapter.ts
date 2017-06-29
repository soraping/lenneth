import * as Koa from 'koa'
import * as Router from 'koa-router'

export class KoaAdapter {

    public static create(): Koa {
        return new Koa()
    }

    public static createRouter(prefix: string): any {
        return new Router(prefix)
    }

}