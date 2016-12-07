import { View, AddArrayFromBuilder } from "ui/core/view";
import { Property } from "ui/core/dependency-observable";
import { StackLayout } from "ui/layouts/stack-layout";
export declare module knownCollections {
    const items = "items";
}
export declare abstract class Accordion extends StackLayout implements AddArrayFromBuilder {
    private _selectedIndexes;
    private _selectedIndex;
    private _allowMultiple;
    private _separatorColor;
    private _headerHeight;
    private _headerTextColor;
    private _headerColor;
    private _headerTextAlignment;
    private _headerTextSize;
    constructor();
    static itemsProperty: Property;
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    headerHeight: number;
    headerTextColor: string;
    headerColor: string;
    headerTextAlignment: string;
    headerTextSize: number;
    items: Array<any>;
    selectedIndex: any;
    selectedIndexes: any;
    allowMultiple: boolean;
    separatorColor: string;
    abstract updateItems(oldItems: Array<AccordionItem>, newItems: Array<AccordionItem>): void;
    abstract addItem(view: AccordionItem): void;
}
export interface AccordionItem extends View {
    headerText: string;
}
