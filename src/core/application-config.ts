export class ApplicationConfig {

    // set globalPrefix(prefix: string){
    //     this.globalPrefix = prefix || ''
    // }

    // get globalPrefix(){
    //     return this.globalPrefix
    // }
    // 路由base path
    private globalPrefix = 'api';

    public setGlobalPrefix(prefix: string) {
        this.globalPrefix = prefix;
    }

    public getGlobalPrefix() {
        return this.globalPrefix;
    }

}