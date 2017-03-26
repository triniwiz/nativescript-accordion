import { NgModule, Inject, forwardRef, Component, Directive, ElementRef, ViewContainerRef, TemplateRef, OnInit, ViewChild, ContentChild, Input, Optional, IterableDiffer, ChangeDetectorRef, IterableDiffers, ChangeDetectionStrategy, Output, EventEmitter, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerElement, ViewClassMeta, NgView, TemplateView, TEMPLATE } from "nativescript-angular/element-registry";
import { View } from "ui/core/view";
import { Placeholder } from "ui/placeholder";
import { Button } from "ui/button";
import { StackLayout } from "ui/layouts/stack-layout";
import * as platform from "platform";
import { LayoutBase } from "ui/layouts/layout-base";
import { ObservableArray } from "data/observable-array";
import * as utils from "utils/utils";
import { Observable } from "data/observable";
import * as types from "utils/types";
import { isListLikeIterable } from "nativescript-angular/collection-facade"
import { isBlank } from "nativescript-angular/lang-facade";
import { convertToInt } from "nativescript-angular/common/utils";
import { ProxyViewContainer } from "ui/proxy-view-container";
const NG_VIEW = "_ngViewRef";
const ITEMSLOADING = "itemsLoading";
const HEADERLOADING = "headerLoading";
const FOOTERLOADING = "footerLoading";
const STARTHEADERLOADING = "startHeaderLoading";
const STARTITEMLOADING = "startItemLoading";
const STARTFOOTERLOADING = "startFooterLoading";

export interface ComponentView {
    rootNodes: Array<any>;
    destroy(): void;
};

function getSingleViewRecursive(nodes: Array<any>, nestLevel: number): View {
    const actualNodes = nodes.filter((n) => !!n && n.nodeName !== "#text");

    if (actualNodes.length === 0) {
        throw new Error("No suitable views found in list template! Nesting level: " + nestLevel);
    } else if (actualNodes.length > 1) {
        throw new Error("More than one view found in list template! Nesting level: " + nestLevel);
    } else {
        if (actualNodes[0]) {
            let parentLayout = actualNodes[0].parent;
            if (parentLayout instanceof LayoutBase) {
                parentLayout.removeChild(actualNodes[0]);
            }
            return actualNodes[0];
        } else {
            return getSingleViewRecursive(actualNodes[0].children, nestLevel + 1);
        }
    }
}

export type RootLocator = (nodes: Array<any>, nestLevel: number) => View;

export function getItemViewRoot(viewRef: ComponentView, rootLocator: RootLocator = getSingleViewRecursive): View {
    const rootView = rootLocator(viewRef.rootNodes, 0);
    rootView.on("unloaded", () => {
        viewRef.destroy();
    });
    return rootView;
}

registerElement("Accordion", () => require("../").Accordion);

@Directive({
    selector: "[accordionHeaderTemplate]"
})
export class AccordionHeaderDirective {
    constructor(
        @Inject(forwardRef(() => AccordionComponent)) private owner: AccordionComponent,
        private templateRef: TemplateRef<any>) {
        owner.headerTemplate = templateRef;
    }

}

@Directive({
    selector: "[accordionItemTemplate]"
})
export class AccordionItemDirective {
    constructor(
        @Inject(forwardRef(() => AccordionComponent)) private owner: AccordionComponent,
        private templateRef: TemplateRef<any>) {
        owner.itemTemplate = templateRef;
    }
}

@Directive({
    selector: "[accordionFooterTemplate]"
})
export class AccordionFooterDirective {
    constructor(
        @Inject(forwardRef(() => AccordionComponent)) private owner: AccordionComponent,
        private templateRef: TemplateRef<any>) {
        owner.footerTemplate = templateRef;
    }
}

@Component({
    selector: "Accordion",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent {
    public get nativeElement(): any {
        return this.accordion;
    }
    _nativeView;
    private _selectedIndex: number;
    private accordion: any;
    private _differ: IterableDiffer;
    private _items: any;
    private viewInitialized: boolean;
    headerTemplate: TemplateRef<AccordionHeaderContext>;
    itemTemplate: TemplateRef<AccordionItemContext>;
    footerTemplate: TemplateRef<AccordionFooterContext>;
    constructor(
        el: ElementRef,
        private _iterableDiffers: IterableDiffers,
        private _cdr: ChangeDetectorRef,
        private loader: ViewContainerRef) {
        this.accordion = el.nativeElement;
        this.accordion.on(HEADERLOADING, this.headerLoading, this);
        this.accordion.on(ITEMSLOADING, this.itemsLoading, this);
        this.accordion.on(FOOTERLOADING, this.footerLoading, this);
    }
    @Input()
    get items() {
        return this._items;
    }
    set items(value: any) {
        this._items = value;
        let needDiffer = true;
        if (value instanceof ObservableArray) {
            needDiffer = false;
        }
        if (needDiffer && !this._differ && isListLikeIterable(value)) {
            this._differ = this._iterableDiffers.find(this._items)
                .create(this._cdr, (_index, item) => { return item; });
        }

        this.accordion.items = this._items;
    }

    @Input()
    get selectedIndex(): number {
        return this._selectedIndex;
    }

    set selectedIndex(value) {
        this._selectedIndex = convertToInt(value);
        if (this.viewInitialized) {
            this.accordion.selectedIndex = this._selectedIndex;
        }
    }

    ngAfterViewInit() {
        this.viewInitialized = true;
        if (!isBlank(this._selectedIndex)) {
            this.accordion.selectedIndex = this._selectedIndex;
        }
    }
    headerLoading(args): void {
        if (this.headerTemplate) {
            const data = this.accordion._getParentData(args.parentIndex);
            const viewRef = this.loader.createEmbeddedView(this.headerTemplate, new AccordionHeaderContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefHeaderOrFooter(viewRef, data, args.parentIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    }
    itemsLoading(args): void {
        if (this.itemTemplate) {
            const data = new Observable(this.accordion._getChildData(args.parentIndex, args.childIndex));
            const viewRef = this.loader.createEmbeddedView(this.itemTemplate, new AccordionItemContext(), args.childIndex);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefItem(viewRef, data, args.parentIndex, args.childIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    }
    footerLoading(args): void {
        if (this.footerTemplate) {
            const data = this.accordion._getParentData(args.parentIndex);
            const viewRef = this.loader.createEmbeddedView(this.footerTemplate, new AccordionFooterContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefHeaderOrFooter(viewRef, data, args.parentIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    }
    setupViewRefHeaderOrFooter(viewRef, data, index): void {
        if (isBlank(viewRef)) {
            return;
        }
        const context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.items = ((data && (typeof data.get === "function")) ? data.get("items") : data["items"]);
        context.index = index;
        context.even = (index % 2 === 0);
        context.odd = !context.even;

    }
    setupViewRefItem(viewRef, data, parentIndex, childIndex): void {
        if (isBlank(viewRef)) {
            return;
        }
        const context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = childIndex;
        context.parentIndex = parentIndex;
        context.childIndex = childIndex;
        context.even = (childIndex % 2 === 0);
        context.odd = !context.even;
    }
    detectChangesOnChild(viewRef, index): void {
        const childChangeDetector = <ChangeDetectorRef>(<any>viewRef);
        childChangeDetector.markForCheck();
        childChangeDetector.detectChanges();
    }
    ngDoCheck(): void {
        if (this._differ) {
            const changes = this._differ.diff(this._items);
            if (changes) {
                if (this.accordion) {
                    if (typeof this.accordion.refresh === "function") {
                        this.accordion.refresh();
                    }
                }
            }
        }
    }
}

export class AccordionItemContext {
    constructor(
        public $implicit?: any,
        public item?: any,
        public parentIndex?: number,
        public childIndex?: number,
        public index?: number,
        public even?: boolean,
        public odd?: boolean
    ) {
    }
}

export class AccordionHeaderContext {
    constructor(
        public $implicit?: any,
        public item?: any,
        public items?: any,
        public parentindex?: number,
        public index?: number,
        public even?: boolean,
        public odd?: boolean
    ) {
    }
}

export class AccordionFooterContext {
    constructor(
        public $implicit?: any,
        public item?: any,
        public items?: any,
        public parentindex?: number,
        public index?: number,
        public even?: boolean,
        public odd?: boolean
    ) {
    }
}

@NgModule({
    declarations: [
        AccordionComponent,
        AccordionHeaderDirective,
        AccordionItemDirective,
        AccordionFooterDirective
    ],
    exports: [
        AccordionComponent,
        AccordionHeaderDirective,
        AccordionItemDirective,
        AccordionFooterDirective
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AccordionModule { }