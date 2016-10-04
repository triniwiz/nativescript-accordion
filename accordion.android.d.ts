import { StackLayout } from "ui/layouts/stack-layout";
export declare class Accordion extends StackLayout {
    private _android;
    private _androidViewId;
    private _expandableLayout;
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
