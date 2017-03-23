import { Frame } from "ui/frame";
import { Page } from "ui/page";
import { OpaqueToken } from "@angular/core";
import { Device } from "platform";
export declare const APP_ROOT_VIEW: OpaqueToken;
export declare const DEVICE: OpaqueToken;
export declare const PAGE_FACTORY: OpaqueToken;
export declare function getDefaultPage(): Page;
export declare const defaultPageProvider: {
    provide: typeof Page;
    useFactory: () => Page;
};
export declare function getDefaultFrame(): Frame;
export declare const defaultFrameProvider: {
    provide: typeof Frame;
    useFactory: () => Frame;
};
export declare function getDefaultDevice(): Device;
export declare const defaultDeviceProvider: {
    provide: OpaqueToken;
    useFactory: () => Device;
};
export declare type PageFactory = (options: PageFactoryOptions) => Page;
export interface PageFactoryOptions {
    isBootstrap?: boolean;
    isLivesync?: boolean;
    isModal?: boolean;
    isNavigation?: boolean;
    componentType?: any;
}
export declare const defaultPageFactory: PageFactory;
export declare const defaultPageFactoryProvider: {
    provide: OpaqueToken;
    useValue: PageFactory;
};
