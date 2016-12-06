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
import {Button} from "ui/button";
import {Label} from "ui/label";
export module knownCollections {
    export const items = "items";
}
function onItemsChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.updateItems(<Array<View>>data.oldValue, <Array<View>>data.newValue);
}
export class Accordion extends View implements AddArrayFromBuilder {
    private _android: android.widget.ExpandableListView;
    private _listAdapter;
    private _accordion: AccordionView;
    private _selectedIndexes;
    private _selectedIndex;
    private _allowMultiple: boolean;

    constructor() {
        super();
        this._android = new android.widget.ExpandableListView(utils.ad.getApplicationContext());
        this._listAdapter = new AccordionListAdapter(this);
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

    get android() {
        return this._android;
    }

    get _nativeView() {
        return this._android;
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    set selectedIndex(value) {
        this._selectedIndex = value;
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

    _createUI() {
        this._android.setAdapter(this._listAdapter);
    }

    public updateItems(oldItems: Array<View>, newItems: Array<View>) {
    }

    addItem(view: View) {

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

}


export class AccordionListAdapter extends android.widget.BaseExpandableListAdapter {
    owner: Accordion;

    constructor(owner: Accordion) {
        super();
        this.owner = owner;
        return global.__native(this);
    }

    hasStableIds(): boolean {
        return true;
    }

    getGroupView(groupPosition: number, isExpanded: boolean, convertView: android.view.View, parent: android.view.ViewGroup) {

        if (convertView === null) {
            const header = new android.widget.TextView(this.owner._context);
            header.setText(this.owner.items[groupPosition].headerText);
            return header;
        }

        return convertView;
    }

    getGroupCount(): number {
        return this.owner.items.length ? this.owner.items.length : 0;
    }

    getGroupId(groupPosition: number): number {
        return new java.lang.String(this.owner.items[groupPosition].headerText).hashCode();
    }

    getChildView(groupPosition: number, childPosition: number, isLastChild: boolean, convertView: android.view.View, parent: android.view.ViewGroup) {
        if (convertView === null) {

            console.log(this.owner.items[groupPosition]._nativeView) //is null
            const header = new android.widget.TextView(this.owner._context);
            header.setText("child");
            return header;
        }
        return convertView;
    }

    getChildId(groupPosition: number, childPosition: number): number {
        return new java.lang.String(this.owner.items[groupPosition].headerText + childPosition.toString()).hashCode();
    }

    getChildrenCount(groupPosition: number): number {
        return this.owner.items[groupPosition] ? 1 : 0;
    }

    isChildSelectable(groupPosition: number, childPosition: number) {
        return true;
    }
}

export class CustomView extends ContentView {
    private _android: android.widget.LinearLayout;

    constructor() {
        super();
        this._android = new android.widget.LinearLayout(utils.ad.getApplicationContext());
    }

    get _nativeView() {
        return this._android
    }

    get android() {
        return this._android;
    }
}