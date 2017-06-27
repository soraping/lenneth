import { IlennethApplication, isFunction } from '../common'
import { KoaAdapter } from './adapters/koa-adapter'
import { LennethApplocation } from './lenneth-application'

export class LennethFactory {

    public static create(
        koa = KoaAdapter.create()
    ): IlennethApplication {
        return new LennethApplocation(koa)
    }

}