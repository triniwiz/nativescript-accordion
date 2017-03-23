import { Compiler, NgModuleFactory, NgModuleFactoryLoader } from "@angular/core";
export declare class NSModuleFactoryLoader implements NgModuleFactoryLoader {
    private compiler;
    private offlineMode;
    constructor(compiler: Compiler);
    load(path: string): Promise<NgModuleFactory<any>>;
    private loadFactory(modulePath, exportName);
    private loadAndCompile(modulePath, exportName);
    private splitPath(path);
}
