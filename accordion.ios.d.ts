import * as common from "./accordion.common";
import { AccordionItem } from "./accordion.common";
export declare class Accordion extends common.Accordion {
    private _ios;
    private _accordion;
    private widthMeasureSpec;
    private heightMeasureSpec;
    private left;
    private top;
    private right;
    private bottom;
    private _accordionStyle;
    private _accordionSections;
    constructor();
    readonly ios: any;
    readonly _nativeView: any;
    updateItems(oldItems: Array<AccordionItem>, newItems: Array<AccordionItem>): void;
    addItem(view: AccordionItem): void;
    onLoaded(): void;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
    onLayout(left: number, top: number, right: number, bottom: number): void;
    private prepareView(view);
    readonly _childrenCount: number;
    private _eachChildView(callback);
}
