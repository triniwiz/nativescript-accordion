import { ChangeDetectorRef, ElementRef, IterableDiffers, TemplateRef, ViewContainerRef } from "@angular/core";
import { View } from "ui/core/view";
export interface ComponentView {
    rootNodes: Array<any>;
    destroy(): void;
}
export interface ComponentView {
    rootNodes: Array<any>;
    destroy(): void;
}
export declare type RootLocator = (nodes: Array<any>, nestLevel: number) => View;
export declare function getItemViewRoot(viewRef: ComponentView, rootLocator?: RootLocator): View;
export declare class AccordionHeaderDirective {
    private owner;
    private templateRef;
    constructor(owner: AccordionComponent, templateRef: TemplateRef<any>);
}
export declare class AccordionItemDirective {
    private owner;
    private templateRef;
    constructor(owner: AccordionComponent, templateRef: TemplateRef<any>);
}
export declare class AccordionFooterDirective {
    private owner;
    private templateRef;
    constructor(owner: AccordionComponent, templateRef: TemplateRef<any>);
}
export declare class AccordionComponent {
    private _iterableDiffers;
    private _cdr;
    private loader;
    readonly nativeElement: any;
    _nativeView: any;
    private _selectedIndex;
    private accordion;
    private _differ;
    private _items;
    private viewInitialized;
    headerTemplate: TemplateRef<AccordionHeaderContext>;
    itemTemplate: TemplateRef<AccordionItemContext>;
    footerTemplate: TemplateRef<AccordionFooterContext>;
    constructor(el: ElementRef, _iterableDiffers: IterableDiffers, _cdr: ChangeDetectorRef, loader: ViewContainerRef);
    items: any;
    selectedIndex: number;
    ngAfterViewInit(): void;
    headerLoading(args: any): void;
    itemsLoading(args: any): void;
    footerLoading(args: any): void;
    setupViewRefHeaderOrFooter(viewRef: any, data: any, index: any): void;
    setupViewRefItem(viewRef: any, data: any, parentIndex: any, childIndex: any): void;
    detectChangesOnChild(viewRef: any, index: any): void;
    ngDoCheck(): void;
}
export declare class AccordionItemContext {
    $implicit: any;
    item: any;
    parentIndex: number;
    childIndex: number;
    index: number;
    even: boolean;
    odd: boolean;
    constructor($implicit?: any, item?: any, parentIndex?: number, childIndex?: number, index?: number, even?: boolean, odd?: boolean);
}
export declare class AccordionHeaderContext {
    $implicit: any;
    item: any;
    items: any;
    parentindex: number;
    index: number;
    even: boolean;
    odd: boolean;
    constructor($implicit?: any, item?: any, items?: any, parentindex?: number, index?: number, even?: boolean, odd?: boolean);
}
export declare class AccordionFooterContext {
    $implicit: any;
    item: any;
    items: any;
    parentindex: number;
    index: number;
    even: boolean;
    odd: boolean;
    constructor($implicit?: any, item?: any, items?: any, parentindex?: number, index?: number, even?: boolean, odd?: boolean);
}
export declare class AccordionModule {
}
