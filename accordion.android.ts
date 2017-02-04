import {Color} from "color";
import * as utils from "utils/utils";
import {View} from "ui/core/view";
import * as common from "./accordion.common";
import {StackLayout} from "ui/layouts/stack-layout";
import {PropertyChangeData} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/proxy";
import {PropertyMetadataSettings} from "ui/core/dependency-observable";
import {Property} from "ui/core/dependency-observable";
global.moduleMerge(common, exports);
export class Accordion extends common.Accordion {
    // private _android: android.widget.LinearLayout;
    private _android: android.widget.ExpandableListView;
    private _listAdapter: AccordionListAdapter;
    private _previousGroup: number = -1;
    private _views: any[] = [];

    constructor() {
        super();
        this.selectedIndexes = [];
    }

    get android() {
        return this._android;
    }

    get _nativeView() {
        return this._android;
    }

    addToView(view) {
        this._addView(view);
    }

    public updateItems(oldItems: Array<any>, newItems: Array<any>) {
        if (newItems) {
            if (this._listAdapter) {
                this._listAdapter.notifyDataSetChanged();
            }
        }
    }

    _createUI() {
        this._android = new android.widget.ExpandableListView(utils.ad.getApplicationContext());
        const that = new WeakRef(this);
        if (this.separatorColor) {
            this._android.setDivider(new android.graphics.drawable.ColorDrawable(new Color(this.separatorColor).android));
            this._android.setDividerHeight(1);
        }
        this._android.setGroupIndicator(null);
        this._android.setOnGroupExpandListener(new android.widget.ExpandableListView.OnGroupExpandListener({
            onGroupExpand(groupPosition: number) {
                const owner = that.get();
                if (!owner.allowMultiple) {
                    owner.selectedIndex = groupPosition;
                    if ((owner._previousGroup != -1) && (groupPosition != owner._previousGroup)) {
                        owner.android.collapseGroup(owner._previousGroup);
                    }
                    owner._previousGroup = groupPosition;
                }
                owner.selectedIndexes.forEach((item, index, arr) => {
                    if (item === groupPosition) {
                        owner.selectedIndexes.slice(index, 1);
                    }

                    if (index === arr.length) {
                        owner.selectedIndexes.push(groupPosition);
                    }
                })
            }
        }));
        this._android.setOnGroupCollapseListener(new android.widget.ExpandableListView.OnGroupCollapseListener({
            onGroupCollapse(groupPosition: number) {
                const owner = that.get();
                let items = owner.selectedIndexes;
                owner.groupCollapsed(groupPosition);
                owner.selectedIndexes = owner.selectedIndexes.map((item) => {
                    if (item != groupPosition) {
                        return item;
                    }
                });
            }
        }));

        if (this.selectedIndexes) {
            this.selectedIndexes.forEach((item) => {
                this._android.expandGroup(item);
            });
        }
        this._listAdapter = new AccordionListAdapter(this);
        this._android.setAdapter(this._listAdapter);
    }

    addItem(view: any) {
        this.items.push(view);
        this._addView(view);
        this._listAdapter.notifyDataSetChanged();
    }

    refresh() {
        this._android.setAdapter(null);
        this._listAdapter = null;
        this._listAdapter = new AccordionListAdapter(this);
        this._android.setAdapter(this._listAdapter);
    }

    public _eachChildView(callback: (child: View) => boolean): void {
        if (this.items) {
            let i;
            let length = this.items.length;
            let retVal: boolean;
            for (i = 0; i < length; i++) {
                retVal = callback(this.items[i]);
                if (retVal === false) {
                    break;
                }
            }
        }
    }

    indexChanged(index: number) {
        this.notifyPropertyChange("selectedIndex", index);
    }

    groupCollapsed(index: number) {
        this.notifyPropertyChange("groupCollapsed", index);
    }

    public expandItem(id: number) {
        if (id) {
            this._android.expandGroup(id);
        }
    }

    public isItemExpanded(id: number): boolean {
        return this._android.isGroupExpanded(id);
    }
}
const headerTextProperty = new Property("headerText", "Item", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
(<PropertyMetadata>headerTextProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    const item = <Item>data.object;
    item.headerTextChanged(data.newValue);
};
export class Item extends StackLayout{
    public static headerTextProperty = headerTextProperty;
    constructor(){
        super();
    }
    public headerTextChanged(text:string){
      //  console.log(text)
    }

    get headerText(){
        return this._getValue(Item.headerTextProperty);
    }

    set headerText(text:string){
        this._setValue(Item.headerTextProperty,text);
    }

}
export class AccordionListAdapter extends android.widget.BaseExpandableListAdapter {
    owner: Accordion;
    constructor(owner: Accordion) {
        super();
        this.owner = owner;
        return global.__native(this);
    }
    getChild(groupPosition: number, childPosition: number){
        return null;
    }

    getGroup(groupPosition: number){
        return null;
    }

    hasStableIds(): boolean {
        return true;
    }
    getGroupView(groupPosition: number, isExpanded: boolean, convertView: android.view.View, parent: android.view.ViewGroup) {
        if (this.owner.items) {
            let item: AccordionItem = this.owner.items[groupPosition];
            if (item.headerText) {
                const header = new android.widget.TextView(this.owner._context);
                header.setText(this.owner.items[groupPosition].headerText);
                if (this.owner.headerTextHorizontalAlignment === "center") {
                    header.setGravity(android.view.Gravity.CENTER_HORIZONTAL);
                } else if (this.owner.headerTextHorizontalAlignment === "right") {
                    header.setGravity(android.view.Gravity.RIGHT);
                } else if (this.owner.headerTextHorizontalAlignment === "left") {
                    header.setGravity(android.view.Gravity.LEFT);
                }

                if (this.owner.headerTextVerticalAlignment === "center") {
                    header.setGravity(android.view.Gravity.CENTER_VERTICAL);
                } else if (this.owner.headerTextVerticalAlignment === "top") {
                    header.setGravity(android.view.Gravity.TOP);
                } else if (this.owner.headerTextVerticalAlignment === "bottom") {
                    header.setGravity(android.view.Gravity.BOTTOM);
                }

                if (this.owner.headerHeight) {
                    header.setHeight(this.owner.headerHeight);
                }
                if (this.owner.headerColor) {
                    header.setBackgroundColor(new Color(this.owner.headerColor).android);
                }

                if (this.owner.headerTextColor) {
                    header.setTextColor(new Color(this.owner.headerTextColor).android);
                }

                if (this.owner.headerTextSize) {
                    header.setTextSize(this.owner.headerTextSize);
                }
                header.setPadding(this.owner.paddingLeft || this.owner.style.paddingLeft, this.owner.paddingTop || this.owner.style.paddingTop, this.owner.paddingRight || this.owner.style.paddingRight, this.owner.paddingBottom || this.owner.style.paddingBottom);
                return header;
            }
            return null
        }
    }

    getGroupCount(): number {
        return this.owner.items && this.owner.items.length ? this.owner.items.length : 0;
    }

    getGroupId(groupPosition: number): number {
        return groupPosition;
    }

    getChildView(groupPosition: number, childPosition: number, isLastChild: boolean, convertView: android.view.View, parent: android.view.ViewGroup) {
       if (!this.owner.items[groupPosition].parent) {
            this.owner._addView(this.owner.items[groupPosition]);
        }

        return this.owner.items[groupPosition]._nativeView;
    }

    getChildId(groupPosition: number, childPosition: number): number {
        return childPosition;
    }

    getChildrenCount(groupPosition: number): number {
        return this.owner.items[groupPosition] ? 1 : 0;
    }

    isChildSelectable(groupPosition: number, childPosition: number) {
        return true;
    }

}

