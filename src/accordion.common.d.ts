import { View } from "ui/core/view";
import { Property } from "ui/core/dependency-observable";
export declare module knownCollections {
    const items = "items";
}
export declare module knownTemplates {
    const itemTemplate = "itemTemplate";
    const headerTemplate = "headerTemplate";
    const footerTemplate = "footerTemplate";
}
export declare module knownMultiTemplates {
    const itemTemplates = "itemTemplates";
}
export declare abstract class Accordion extends View {
    private _footerTextSize;
    private _footerTextAlignment;
    private _footerColor;
    private _footerTextColor;
    private _footerHeight;
    private _footerTextBold;
    private _headerTextAlignment;
    private _selectedIndexes;
    private _allowMultiple;
    private _separatorColor;
    private _headerHeight;
    private _headerTextColor;
    private _headerColor;
    private _headerTextVerticalAlignment;
    private _headerTextHorizontalAlignment;
    private _headerTextSize;
    private _headerTextBold;
    static itemsProperty: Property;
    static headerTemplateProperty: Property;
    static itemTemplateProperty: Property;
    static footerTemplateProperty: Property;
    static selectedIndexProperty: Property;
    _effectiveRowHeight: number;
    constructor();
    _getParentData(parentIndex: number): any;
    _getChildData(parentIndex: number, childIndex: number): any;
    headerTextBold: boolean;
    headerHeight: number;
    headerTextColor: string;
    headerColor: string;
    headerTextVerticalAlignment: string;
    headerTextHorizontalAlignment: string;
    headerTextAlignment: string;
    headerTextSize: number;
    footerTextBold: boolean;
    footerHeight: number;
    footerTextColor: string;
    footerColor: string;
    footerTextAlignment: string;
    footerTextSize: number;
    items: Array<any>;
    headerTemplate: string;
    itemTemplate: string;
    footerTemplate: string;
    selectedIndex: number;
    selectedIndexes: any;
    allowMultiple: boolean;
    separatorColor: string;
    abstract updateItems(oldItems: Array<any>, newItems: Array<any>): void;
    abstract addItem(view: any): void;
    abstract indexChanged(index: number): void;
    abstract groupCollapsed(index: number): void;
    abstract headerTemplateUpdated(oldData: any, newData: any): void;
    abstract templateUpdated(oldData: any, newData: any): void;
    abstract footerTemplateUpdated(oldData: any, newData: any): void;
}
