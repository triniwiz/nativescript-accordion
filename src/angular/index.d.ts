import { AfterContentInit, DoCheck, ElementRef, EmbeddedViewRef, EventEmitter, InjectionToken, IterableDiffer, IterableDiffers, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { ItemEventData, ItemsSource } from 'tns-core-modules/ui/list-view';
import { EventData, KeyedTemplate, Template, View } from 'tns-core-modules/ui/core/view';
import { Accordion } from '../';
export declare class ItemContext {
    $implicit?: any;
    item?: any;
    index?: number;
    even?: boolean;
    odd?: boolean;
    constructor($implicit?: any, item?: any, index?: number, even?: boolean, odd?: boolean);
}
export declare class ChildItemContext {
    $implicit?: any;
    item?: any;
    parentIndex?: number;
    index?: number;
    even?: boolean;
    odd?: boolean;
    constructor($implicit?: any, item?: any, parentIndex?: number, index?: number, even?: boolean, odd?: boolean);
}
export interface SetupItemViewArgs {
    view: EmbeddedViewRef<any>;
    data: any;
    index: number;
    context: ItemContext;
}
export interface AccordionItemsView {
    items: any[] | ItemsSource;
    headerTemplate: string | Template;
    headerTemplates?: string | Array<KeyedTemplate>;
    itemHeaderTemplate: string | Template;
    itemHeaderTemplates?: string | Array<KeyedTemplate>;
    itemContentTemplate: string | Template;
    itemContentTemplates?: string | Array<KeyedTemplate>;
    footerTemplate: string | Template;
    footerTemplates?: string | Array<KeyedTemplate>;
    childItems: string;
    headerTemplateSelector: string | ((item: any, index: number, items: any) => string);
    itemHeaderTemplateSelector: string | ((item: any, index: number, items: any) => string);
    itemContentTemplateSelector: string | ((item: any, parentIndex: number, index: number, items: any) => string);
    footerTemplateSelector: string | ((item: any, index: number, items: any) => string);
    _getHasHeader: any;
    _getHasFooter: any;
    refresh(): void;
    on(event: 'headerLoading', callback: (args: EventData) => void, thisArg?: any): any;
    off(event: 'headerLoading', callback: (args: EventData) => void, thisArg?: any): any;
    on(event: 'itemHeaderLoading', callback: (args: EventData) => void, thisArg?: any): any;
    off(event: 'itemHeaderLoading', callback: (args: EventData) => void, thisArg?: any): any;
    on(event: 'itemContentLoading', callback: (args: EventData) => void, thisArg?: any): any;
    off(event: 'itemContentLoading', callback: (args: EventData) => void, thisArg?: any): any;
    on(event: 'footerLoading', callback: (args: EventData) => void, thisArg?: any): any;
    off(event: 'footerLoading', callback: (args: EventData) => void, thisArg?: any): any;
}
export declare abstract class AccordionItemsComponent implements DoCheck, OnDestroy, AfterContentInit {
    private _iterableDiffers;
    abstract readonly nativeElement: any;
    protected accordionItemsView: any;
    protected _items: any;
    protected _differ: IterableDiffer<KeyedTemplate>;
    protected _templateHeaderMap: Map<string, KeyedTemplate>;
    protected _templateItemHeaderMap: Map<string, KeyedTemplate>;
    protected _templateItemContentMap: Map<string, KeyedTemplate>;
    protected _templateFooterMap: Map<string, KeyedTemplate>;
    loader: ViewContainerRef;
    setupItemView: EventEmitter<SetupItemViewArgs>;
    itemTemplateQuery: TemplateRef<ItemContext>;
    headerTemplate: TemplateRef<ItemContext>;
    itemHeaderTemplate: TemplateRef<ItemContext>;
    itemContentTemplate: TemplateRef<ItemContext>;
    footerTemplate: TemplateRef<ItemContext>;
    items: any;
    constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private setItemTemplates;
    registerTemplate(key: string, template: TemplateRef<ItemContext>): void;
    onHeaderLoading(args: ItemEventData): void;
    onItemHeaderLoading(args: ItemEventData): void;
    onItemContentLoading(args: ItemEventData): void;
    onFooterLoading(args: ItemEventData): void;
    setupViewRef(viewRef: EmbeddedViewRef<ItemContext>, data: any, index: number): void;
    setupChildViewRef(viewRef: EmbeddedViewRef<ChildItemContext>, data: any, parentIndex: number, index: number): void;
    protected getItemTemplateViewFactory(template: TemplateRef<ItemContext>): () => View;
    protected getChildItemTemplateViewFactory(template: TemplateRef<ChildItemContext>): () => View;
    private detectChangesOnChild;
    ngDoCheck(): void;
}
export interface ComponentView {
    rootNodes: Array<any>;
    destroy(): void;
}
export declare type RootLocator = (nodes: Array<any>, nestLevel: number) => View;
export declare function getItemViewRoot(viewRef: ComponentView, rootLocator?: RootLocator): View;
export declare const ACCORDION_ITEMS_COMPONENT: InjectionToken<AccordionItemsView>;
export declare class TemplateKeyDirective {
    private templateRef;
    private comp;
    constructor(templateRef: TemplateRef<any>, comp: AccordionItemsComponent);
    acTemplateKey: any;
}
export declare class AccordionComponent extends AccordionItemsComponent {
    readonly nativeElement: Accordion;
    protected accordionItemsView: Accordion;
    constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers);
}
export declare class AccordionModule {
}
