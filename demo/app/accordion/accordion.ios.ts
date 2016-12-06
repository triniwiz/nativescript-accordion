import {StackLayout} from "ui/layouts/stack-layout";
import {Color} from "color";
import * as utils from "utils/utils";
import * as app from "application"
import {ContentView} from "ui/content-view";
import {View, CustomLayoutView} from "ui/core/view";
import * as common from "./accordion.common";
//global.moduleMerge(common, exports);
import {Image} from "ui/image"
import {AddChildFromBuilder} from "ui/core/view";
import {AddArrayFromBuilder} from "ui/core/view";
import {PropertyChangeData} from "ui/core/dependency-observable";
import {Property} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/dependency-observable";
import {PropertyMetadataSettings} from "ui/core/dependency-observable";
import {screen} from 'platform';
export module knownCollections {
    export const items = "items";
}
function onItemsChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.updateItems(<Array<View>>data.oldValue, <Array<View>>data.newValue);
}
export class Accordion extends StackLayout implements AddArrayFromBuilder {
    private _ios;
    private _accordion: AccordionView;
    private _selectedIndexes: NSMutableIndexSet;
    private _selectedIndex;
    private _allowMultiple: boolean;
    private widthMeasureSpec: number;
    private heightMeasureSpec: number;
    private left = 0;
    private top = 0;
    private right = 0;
    private bottom = 0;

    constructor() {
        super();
        this._ios = UIView.new();
    }

    public static itemsProperty = new Property("items", "Accordion", new PropertyMetadata(undefined, PropertyMetadataSettings.None, onItemsChanged));

    public _addArrayFromBuilder(name: string, value: Array<any>) {
        if (name === "items") {
            this.items = value;
        }
    }

    get items() {
        return this._getValue(Accordion.itemsProperty);
    }

    set items(value: Array<any>) {
        this._setValue(Accordion.itemsProperty, value);
    }

    get ios() {
        return this._ios;
    }

    get _nativeView() {
        return this._ios;
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    set selectedIndex(value) {
        this._selectedIndex = value;
        this.selectedIndexes = NSMutableIndexSet.new();
        this.selectedIndexes.addIndex(value);
    }

    get selectedIndexes() {
        return this._selectedIndexes;
    }

    set selectedIndexes(indexes) {
        this._selectedIndexes = indexes;
    }

    get allowMultiple() {
        return this._allowMultiple;
    }

    set allowMultiple(value: boolean) {
        this._allowMultiple = true;
    }

    public updateItems(oldItems: Array<View>, newItems: Array<View>) {
    }

    addItem(view: View) {
        const header = UIButton.alloc().initWithFrame(CGRectMake(0, 0, 0, 30));
        header.setTitleForState(view.headerText, UIControlState.Normal);
        if (view.headerColor) {
            header.backgroundColor = new Color(view.headerColor).ios;
        }
        if (view.headerTextColor) {
            header.setTitleColorForState(new Color(view.headerTextColor).ios, UIControlState.Normal)
        }
        this._accordion.addHeaderWithView(header, view.ios);
    }

    onLoaded() {
        super.onLoaded();
        this._accordion = AccordionView.alloc().initWithFrame(CGRectMake(0, 0, this._ios.frame.size.width, this._ios.frame.size.height));
        let AccordionViewDelegateImpl = NSObject.extend({

            accordionDidChangeSelection(accordion: AccordionView, selection: NSIndexSet){
                this._selectedIndexes = selection;
            }
        }, {
            name: "AccordionViewDelegateImpl",
            protocols: [AccordionViewDelegate]
        });
        this._accordion.delegate = AccordionViewDelegateImpl.new();
        this.items.forEach((item, index) => {
            let header;
            if(item.headerHeight){
                header = UIButton.alloc().initWithFrame(CGRectMake(0, 0, 0, item.headerHeight));
            }else{
                header = UIButton.alloc().initWithFrame(CGRectMake(0, 0, 0, 30));
            }
            header.setTitleForState(item.headerText, UIControlState.Normal);
            if (item.headerColor) {
                header.backgroundColor = new Color(item.headerColor).ios;
            }
            if (item.headerTextColor) {
                header.setTitleColorForState(new Color(item.headerTextColor).ios, UIControlState.Normal)
            }
            this._accordion.addHeaderWithView(header, item.ios);
            this._accordion.setNeedsLayout();

        });
        if (this.allowMultiple) {
            this._accordion.allowsMultipleSelection = true;
        }
        this._accordion.selectionIndexes = this._selectedIndexes;
        this._ios.addSubview(this._accordion);
    }

    onUnloaded(){
        super.onUnloaded();
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        this.widthMeasureSpec = widthMeasureSpec;
        this.heightMeasureSpec = heightMeasureSpec;
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }


    public onLayout(left: number, top: number, right: number, bottom: number): void {
        super.onLayout(left, top, right, bottom);
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.items.forEach((item, index) => {
            this.prepareView(item);
        });
    }

    private prepareView(view: View): void {
        View.adjustChildLayoutParams(view, this.widthMeasureSpec, this.heightMeasureSpec);
        let result = View.measureChild(this, view, this.widthMeasureSpec, this.heightMeasureSpec);
        View.layoutChild(this, view, 0, 0, result.measuredWidth, result.measuredHeight);
        View.restoreChildOriginalParams(view);
        view.requestLayout();

    }

    get _childrenCount(): number {
        return this.items ? this.items.length : 0;
    }

    private _eachChildView(callback) {
        if (!this.items) {
            return;
        }
        for (let i = 0, length = this.items.length; i < length; i++) {
            callback(this.items[i]);
        }
    }
}
