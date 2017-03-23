import { Inject, forwardRef, Component, Directive, ElementRef, ViewContainerRef, TemplateRef, OnInit, ViewChild, ContentChild, Input, Optional, IterableDiffer } from "@angular/core";
import { Accordion } from "../accordion";
import { registerElement, ViewClassMeta, NgView, TemplateView, TEMPLATE } from "nativescript-angular/element-registry";
import { View } from "ui/core/view";
import { Placeholder } from "ui/placeholder";
import { Button } from "ui/button";
import { StackLayout } from "ui/layouts/stack-layout";
import * as platform from "platform";
import { parse } from "ui/builder";
import { LayoutBase } from "ui/layouts/layout-base";
import { Color } from "color";
import { ObservableArray } from "data/observable-array";
import { isListLikeIterable } from "@angular/core/src/facade/collection";
import * as utils from "utils/utils";
import { Observable } from "data/observable";
declare var zonedCallback: Function;
const NG_VIEW = "_ngViewRef";
const ITEMSLOADING = "itemsLoading";
const HEADERLOADING = "headerLoading";
const FOOTERLOADING = "footerLoading";
const STARTHEADERLOADING = "startHeaderLoading";
const STARTITEMLOADING = "startItemLoading";
const STARTFOOTERLOADING = "startFooterLoading";
let views = [];
let i = 0;
const accordionMeta: ViewClassMeta = {
    skipAddToDom: false,
    insertChild(parent: any, child: any, index: number) {
        const accordion: any = <Accordion>parent;
        const childView = <any>child;
        console.log(childView)
        // if (!Array.isArray(accordion.items)) {
        //     accordion.items = [];
        // }
        if (child instanceof Placeholder) {
        }
        else if (child.nodeName === TEMPLATE) {
            child.templateParent = parent;
        } //else if (child.nodeName !== "#text" && child instanceof View) {
        //     accordion.items.push(child);
        // }
    },
    removeChild(parent: any, child: any) {
        const accordion: any = <Accordion>parent;
        const childView = <any>child;
        /*
        if (child.parent === parent) {
          //  parent._nativeView.removeView(child._nativeView)
        //  console.dump(parent._nativeView)
       //   console.dump(child._nativeView.getParent().removeView(child.nativeView()))
           parent._removeView(child);
        }
*/
        /*
        console.log(parent.parent.getChildAt(0))
        console.log(parent.parent.getChildAt(1))
        console.log(parent.parent.getChildAt(2))
        console.log(parent.parent.getChild(3))
        */
        //  accordion._removeView(childView);
        // console.log(accordion._childrenCount)
        // accordion.parent._removeView(accordion);
        // child.r
    }
};

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


@Directive({
    selector: "[accordionHeaderTemplate]"
})
export class AccordionHeaderDirective {

    constructor(
        @Inject(forwardRef(() => AccordionComponent)) private owner: AccordionComponent,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
        owner.accordion.on(STARTHEADERLOADING, this.startHeaderLoading, this);
    }
    ngOnInit() { }

    startHeaderLoading(args) {
        const viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new AccordionHeaderContext(), 0);
        let context: AccordionHeaderContext = viewRef.context;
        context.item = new Observable(this.owner.accordion._getParentData(args.parentIndex));
        context.items = new ObservableArray(context.item.get("items"));
        context.parentindex = args.parentIndex;
        context.index = args.parentIndex;
        let resultView = getItemViewRoot(viewRef);
        resultView[NG_VIEW] = viewRef;
        //this.owner.accordion.headerTemplate = resultView.sin;
    }
}

@Directive({
    selector: "[accordionItemTemplate]"
})
export class AccordionItemDirective {
    constructor(
        @Inject(forwardRef(() => AccordionComponent)) private owner: AccordionComponent,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {
        //owner.accordion.on("itemLoading", this.itemsLoading);
    }
    ngOnInit() {
        const viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new AccordionItemContext(), 0);

        //const data = this.owner.accordion._getParentData
        // Filter out text nodes, etc
        const realViews = viewRef.rootNodes.filter((node) =>
            node.nodeName && node.nodeName !== "#text");

        if (realViews.length > 0) {
            //  this.owner.accordion.itemTemplate = realViews[0];

            const resultView = getItemViewRoot(viewRef);
            resultView[NG_VIEW] = viewRef;
            (<AccordionItemContext>viewRef.context).item = new Observable({
                text: "test",
                image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png"
            });

            this.owner.accordion.itemTemplate = resultView;
        }
    }


}

@Directive({
    selector: "[accordionFooterTemplate]"
})
export class AccordionFooterDirective {
    constructor(
        @Inject(forwardRef(() => AccordionComponent)) private owner: AccordionComponent,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }

    ngOnInit() {
        const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        // Filter out text nodes, etc
        const realViews = viewRef.rootNodes.filter((node) =>
            node.nodeName && node.nodeName !== "#text");

        if (realViews.length > 0) {
            console.log(realViews[0])
        }
    }
}

@Directive({
    selector: "Accordion"
})
export class AccordionComponent {
    private _items;
    public accordion: Accordion;
    private _headerTemplate;
    private _itemTemplate;
    private _footerTemplate;
    private _differ: IterableDiffer;
    constructor(el: ElementRef) {
        this.accordion = el.nativeElement;
    }
    itemsLoading(args) {

        //console.log(args.view.ios)
        //console.log(args.childIndex)
        //console.log(args.parentIndex)
        const rowHeight = -1;
        const infinity = utils.layout.makeMeasureSpec(0, utils.layout.UNSPECIFIED);
        const heightMeasureSpec: number = rowHeight >= 0 ? utils.layout.makeMeasureSpec(rowHeight, utils.layout.EXACTLY) : infinity;
        // const measuredSize = View.measureChild(this.accordion, args.view, this.accordion.widthMeasureSpec, heightMeasureSpec);
        // const height = measuredSize.measuredHeight;
        // const width = measuredSize.measuredWidth;
        // View.layoutChild(this.accordion, args.view, 0, 0, width, height);

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
        // if (needDiffer && !this._differ && isListLikeIterable(value)) {
        //     this._items = new ObservableArray(this._items);
        // }

        this.accordion.items = this._items;
    }

    set headerTemplate(value) {
        this._headerTemplate = value;
    }
    set itemTemplate(value) {
        this._itemTemplate = value;
    }
    set footerTemplate(value) {
        this._footerTemplate = value;
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

registerElement("Accordion", () => require("../accordion").Accordion);