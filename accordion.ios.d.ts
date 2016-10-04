import { StackLayout } from "ui/layouts/stack-layout";
export declare class Accordion extends StackLayout {
    private _ios;
    bgColor: any;
    duration: any;
    constructor();
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    onLoaded(): void;
    toggle(): void;
    expand(): void;
    collapse(): void;
    isExpanded(): boolean;
}
