import {View} from "ui/core/view";
import * as common from "./accordion.common";
import {AccordionItem} from "./accordion.common";
import {Color} from "color";
import * as utils from "utils/utils";
import * as platform from "platform";
import {StackLayout} from "ui/layouts/stack-layout";
import {Property} from "ui/core/dependency-observable";
import {PropertyMetadataSettings} from "ui/core/dependency-observable";
import {PropertyChangeData} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/proxy";
global.moduleMerge(common, exports);
export class Accordion extends common.Accordion {
    private _ios;
    private _accordion;
    private widthMeasureSpec: number;
    private heightMeasureSpec: number;
    private left = 0;
    private top = 0;
    private right = 0;
    private bottom = 0;
    private _accordionStyle: ODSAccordionSectionStyle;
    private _accordionSections;

    constructor() {
        super();
        this._ios = UIView.new();
        this._ios.frame = CGRectMake(0, 0, platform.screen.mainScreen.widthPixels, platform.screen.mainScreen.heightPixels)
    }

    get ios() {
        return this._ios;
    }

    get _nativeView() {
        return this._ios;
    }


    public updateItems(oldItems: Array<any>, newItems: Array<any>) {
    }

    addItem(view: AccordionItem) {
        this._addView(view);
        this.prepareView(view);
        let section = ODSAccordionSectionView.alloc().initWithTitleAndViewSectionStyle(view.headerText, view.ios, this._accordionStyle);
        this._accordion.addSection(section);
    }

    onLoaded() {
        super.onLoaded();
        this._accordionStyle = ODSAccordionSectionStyle.alloc().init();
        this._accordionStyle.arrowVisible = false;
        if (this.headerHeight) {
            this._accordionStyle.headerHeight = this.headerHeight;
        }

        if (this.headerTextAlignment === "center") {
            this._accordionStyle.headerStyle = ODSAccordionHeaderStyle.LabelCentered;
        } else if (this.headerTextAlignment === "right") {
            this._accordionStyle.headerStyle = ODSAccordionHeaderStyle.LabelRight;
        } else {
            this._accordionStyle.headerStyle = ODSAccordionHeaderStyle.LabelLeft;
        }

        if (this.headerHeight) {
            this._accordionStyle.headerHeight = this.headerHeight;
        }
        if (this.headerColor) {
            this._accordionStyle.headerBackgroundColor = new Color(this.headerColor).ios;
        }
        this._accordionStyle.headerBackgroundColor = new Color(this.headerColor).ios;

        if (this.headerTextColor) {
            this._accordionStyle.headerTitleLabelTextColor = new Color(this.headerTextColor).ios;
        }

        if (this.headerTextSize) {
            this._accordionStyle.headerTitleLabelFont = UIFont.systemFontOfSize(this.headerTextSize);
        }
        if (this.separatorColor) {
            this._accordionStyle.dividerColor = new Color(this.separatorColor).ios;
        }
        if (this.items) {
            this._accordionSections = this.items.map((item: AccordionItem, index: number) => {
                item.tag = index;
                if (item && !item.parent) {
                    this._addView(item);
                }
                return ODSAccordionSection.alloc().initWithTitleAndView(item.headerText, item.ios);
            });
            this._accordion = ODSAccordionView.alloc().initWithSectionsAndSectionStyle(this._accordionSections, this._accordionStyle);
            this._accordion.frame = CGRectMake(0, 0, this._ios.frame.size.width, this._ios.frame.size.height);
            this._ios.addSubview(this._accordion);
            /// this._accordion.subviews[0].subviews[0].setTitleForState("Week 1",UIControlState.Normal);
        }

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
        if (this.items) {
            this.items.forEach((item, index) => {
                this.prepareView(item);
            });
        }
    }

    private prepareView(view: View): void {
        View.adjustChildLayoutParams(view, this.widthMeasureSpec, this.heightMeasureSpec);
        let result = View.measureChild(this, view, this.widthMeasureSpec, 660);
        View.layoutChild(this, view, 0, 0, result.measuredWidth, result.measuredHeight);
        View.restoreChildOriginalParams(view);
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

    indexChanged(index: number) {
        this.notifyPropertyChange("selectedIndex", index);
    }
}

const headerTextProperty = new Property("headerText", "Item", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
(<PropertyMetadata>headerTextProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    const item = <Item>data.object;
    item.headerTextChanged(data.newValue, item);
};

export class Item extends StackLayout {
    public static headerTextProperty = headerTextProperty;

    constructor() {
        super();
    }

    public headerTextChanged(text: string, view: any) {
        const index = view.tag;
        if (view && view.parent.ios) {
            view.parent.ios.subviews[0].subviews[index].subviews[0].setTitleForState(text, UIControlState.Normal);
        }
    }

    get headerText() {
        return this._getValue(Item.headerTextProperty);
    }

    set headerText(text: string) {
        this._setValue(Item.headerTextProperty, text);
    }

}
