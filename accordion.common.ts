import {View, AddArrayFromBuilder} from "ui/core/view";
import {PropertyMetadata} from "ui/core/proxy";
import {Property, PropertyChangeData, PropertyMetadataSettings} from "ui/core/dependency-observable";
import {StackLayout} from "ui/layouts/stack-layout";
import {isAndroid} from "platform";
export module knownCollections {
    export const items = "items";
}
// function onItemsChanged(data: PropertyChangeData) {
//     const accordion = <any>data.object;
//     accordion.updateItems(<Array<any>>data.oldValue, <Array<any>>data.newValue);
// }

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
let AffectsLayout = isAndroid ? PropertyMetadataSettings.None : PropertyMetadataSettings.AffectsLayout;

const itemsProperty = new Property("items", "Accordion", new PropertyMetadata(undefined, AffectsLayout));
const selectedIndexProperty = new Property("selectedIndex", "Accordion", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
(<PropertyMetadata>itemsProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.updateItems(<Array<any>>data.oldValue, <Array<any>>data.newValue);
};

(<PropertyMetadata>selectedIndexProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.indexChanged(data.newValue);
};

export abstract class Accordion extends View implements AddArrayFromBuilder {
    private _selectedIndexes;
    private _allowMultiple: boolean;
    private _separatorColor: string;
    private _headerHeight: number;
    private _headerTextColor: string;
    private _headerColor: string;
    private _headerTextVerticalAlignment: string;
    private _headerTextHorizontalAlignment: string;
    private _headerTextSize: number;
    public static itemsProperty = itemsProperty;
    public static selectedIndexProperty = selectedIndexProperty;
    constructor() {
        super();
    }

    public _addArrayFromBuilder(name: string, value: Array<any>) {
        if (name === "items") {
            this.items = value;
        }
    }

    get headerHeight(): number {
        return this._headerHeight;
    }

    set headerHeight(value: number) {
        this._headerHeight = value;
    }

    get headerTextColor(): string {
        return this._headerTextColor;
    }

    set headerTextColor(value: string) {
        this._headerTextColor = value;
    }


    get headerColor(): string {
        return this._headerColor;
    }

    set headerColor(value: string) {
        this._headerColor = value;
    }


    get headerTextVerticalAlignment(): string {
        return this._headerTextVerticalAlignment;
    }

    set headerTextVerticalAlignment(value: string) {
        this._headerTextVerticalAlignment = value;
    }

    get headerTextHorizontalAlignment(): string {
        return this._headerTextHorizontalAlignment;
    }

    set headerTextHorizontalAlignment(value: string) {
        this._headerTextHorizontalAlignment = value;
    }

    get headerTextSize(): number {
        return this._headerTextSize;
    }

    set headerTextSize(value: number) {
        this._headerTextSize = value;
    }

    get items() {
        return this._getValue(Accordion.itemsProperty);
    }

    set items(value: Array<any>) {
        this._setValue(Accordion.itemsProperty, value);
    }

    get selectedIndex() {
        return this._getValue(Accordion.selectedIndexProperty);
    }

    set selectedIndex(value:number) {
        this._setValue(Accordion.selectedIndexProperty,value);
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

    get separatorColor() {
        return this._separatorColor;
    }

    set separatorColor(value: string) {
        this._separatorColor = value;
    }

    public abstract updateItems(oldItems: Array<any>, newItems: Array<any>): void;

    public abstract addItem(view: any): void;

    public abstract indexChanged(index:number):void;

    public abstract groupCollapsed(index:number):void;

}

