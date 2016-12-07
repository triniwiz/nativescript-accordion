import {View, AddArrayFromBuilder} from "ui/core/view";
import {PropertyMetadata} from "ui/core/proxy";
import {Property, PropertyChangeData, PropertyMetadataSettings} from "ui/core/dependency-observable";
import {StackLayout} from "ui/layouts/stack-layout";

export module knownCollections {
    export const items = "items";
}
function onItemsChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.updateItems(<Array<AccordionItem>>data.oldValue, <Array<AccordionItem>>data.newValue);
}

export abstract class Accordion extends StackLayout implements AddArrayFromBuilder {
    private _selectedIndexes;
    private _selectedIndex;
    private _allowMultiple: boolean;
    private _separatorColor: string;
    private _headerHeight: number;
    private _headerTextColor: string;
    private _headerColor: string;
    private _headerTextAlignment: string;
    private _headerTextSize: number;
    constructor() {
        super();
    }

    public static itemsProperty = new Property("items", "Accordion", new PropertyMetadata(undefined, PropertyMetadataSettings.None, onItemsChanged));

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


    get headerTextAlignment(): string {
        return this._headerTextAlignment;
    }

    set headerTextAlignment(value: string) {
        this._headerTextAlignment = value;
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

    get separatorColor() {
        return this._separatorColor;
    }

    set separatorColor(value: string) {
        this._separatorColor = value;
    }

    public abstract updateItems(oldItems: Array<AccordionItem>, newItems: Array<AccordionItem>): void;

    public abstract  addItem(view: AccordionItem): void;

}

export interface AccordionItem extends View {
    headerText: string;
}
