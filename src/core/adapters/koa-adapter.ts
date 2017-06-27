import * as Koa from 'koa'

export class KoaAdapter {

    public static create(): Koa {
        return new Koa()
    }

}