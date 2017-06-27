declare const process: any;
import * as clc from 'cli-color'

export class Logger {

    private readonly yellow = clc.xterm(3);
    constructor(private context: string){

    }

    log(message: string){
        this.logMessage(message, clc.green)
    }

    error(message: string, trace = ''){
        this.logMessage(message, clc.red)
        this.printStackTrace(trace)
    }

    warn(message: string){
        this.logMessage(message, clc.yellow)
    }

    private logMessage(message: string, color: (msg: string) => string) {
        process.stdout.write(color(`[lenneth] ${process.pid}   - `));
        process.stdout.write(`${new Date(Date.now()).toLocaleString()}   `);
        process.stdout.write(this.yellow(`[${this.context}] `));
        process.stdout.write(color(message));
        process.stdout.write(`\n`);
    }
    
    private printStackTrace(trace: string){
        process.stdout.write(trace)
        process.stdout.write(`\n`)
    }


}