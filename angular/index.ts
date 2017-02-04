import { Component } from "@angular/core";
import { Accordion } from "../accordion";
import { registerElement, ViewClassMeta, NgView, TemplateView, TEMPLATE } from "nativescript-angular/element-registry";
import { View } from "ui/core/view";
import { Placeholder } from "ui/placeholder";
import { Button } from "ui/button";
import { StackLayout } from "ui/layouts/stack-layout";
import * as platform from "platform";
declare var zonedCallback: Function;
let views = [];
let i = 0;
const pagerMeta: ViewClassMeta = {
    skipAddToDom: false,
    insertChild(parent: any, child: any, index: number) {
        const accordion: any = <Accordion>parent;
        const childView = <any>child;
        if (!Array.isArray(accordion.items)) {
            accordion.items = [];
        }
        if (child instanceof Placeholder) {
        }
        else if (child.nodeName === TEMPLATE) {
            child.templateParent = parent;
        } else if (child.nodeName !== "#text" && child instanceof View) {
            accordion.items.push(child);
        }
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
registerElement("Accordion", () => require("../accordion").Accordion, pagerMeta);
registerElement("AccordionItem", () => require("../accordion").Item);
@Component({
    selector: 'Accordion',
    template: '<ng-content></ng-content>'
})
export class AccordionComponent {
}




// import { ElementRef, Directive, Input, TemplateRef, ViewContainerRef, OnInit, AfterViewInit } from "@angular/core";
// import { Accordion} from "../accordion";
// import {StackLayout} from "ui/layouts/stack-layout";
// @Directive({
//     selector: "Accordion", // tslint:disable-line:directive-selector
// })
// export class AccordionDirective implements AfterViewInit {
//     public accordion: Accordion;
//     private _selectedIndex: number;
//     private viewInitialized: boolean;

//     @Input()
//     get selectedIndex(): number {
//         return this._selectedIndex;
//     }

//     set selectedIndex(value) {
//         // this._selectedIndex = convertToInt(value);
//         if (this.viewInitialized) {
//             this.accordion.selectedIndex = this._selectedIndex;
//         }
//     }

//     constructor(element: ElementRef) {
//         this.accordion = element.nativeElement;
//     }

//     ngAfterViewInit() {
//         this.viewInitialized = true;
//     }
// }

// @Directive({
//     selector: "[accordionItem]" // tslint:disable-line:directive-selector
// })
// export class AccordionItemDirective implements OnInit {
//     private item: AccordionItem;
//     private _headerText: string;

//     constructor(
//         private owner: AccordionDirective,
//         private templateRef: TemplateRef<any>,
//         private viewContainer: ViewContainerRef
//     ) {
//     }

//     @Input("accordionItem") config: any; // tslint:disable-line:no-input-rename

//     @Input()
//     get headerText() {
//         return this._headerText;
//     }

//     set headerText(value: string) {
//         if (this._headerText !== value) {
//             this._headerText = value;
//             console.log(value)
//            // this.ensureItem();
//            // this.item.headerText = this._headerText;
//         }
//     }

//     // @Input()
//     // get iconSource() {
//     //     return this._iconSource;
//     // }

//     // set iconSource(value: string) {
//     //     if (this._iconSource !== value) {
//     //         this._iconSource = value;
//     //         this.ensureItem();
//     //         this.item.iconSource = this._iconSource;
//     //     }
//     // }

//     private ensureItem() {
//         if (!this.item) {
//             this.item = new AccordionItem();
//         }
//     }

//     ngOnInit() {
//        // this.ensureItem();
//         // if (this.config) {
//         //     this.item.title = this._title || this.config.title;
//         //     this.item.iconSource = this._iconSource || this.config.iconSource;
//         // }

//         const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
//         // Filter out text nodes, etc
//         const realViews = viewRef.rootNodes.filter((node) =>
//             node.nodeName && node.nodeName !== "#text");
//         if (realViews.length > 0) {
//             this.item = realViews[0];

//             //const newItems = (this.owner.accordion.items || []).concat([this.item]);
//             //this.owner.accordion.items = newItems;

//         }
//     }
// }

// export class AccordionItem extends StackLayout {

// }