import { View, CssProperty, Style } from "tns-core-modules/ui/core/view";
import { Property, CoercibleProperty } from "tns-core-modules/ui/core/view";
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
    private _selectedIndexes;
    private _allowMultiple;
    _effectiveRowHeight: number;
    static selectedIndexChangedEvent: string;
    items: any;
    headerTemplate: any;
    itemTemplate: any;
    footerTemplate: any;
    selectedIndex: number;
    constructor();
    _getParentData(parentIndex: number): any;
    _getChildData(parentIndex: number, childIndex: number): any;
    headerTextBold: boolean;
    headerHeight: number;
    headerTextColor: string;
    headerColor: string;
    headerTextAlignment: string;
    headerTextSize: number;
    footerTextBold: boolean;
    footerHeight: number;
    footerTextColor: string;
    footerColor: string;
    footerTextAlignment: string;
    footerTextSize: number;
    selectedIndexes: any;
    allowMultiple: boolean;
    separatorColor: any;
    abstract updateNativeItems(oldItems: Array<any>, newItems: Array<any>): void;
    abstract addItem(view: any): void;
    abstract updateNativeIndex(oldData: any, newData: any): void;
    abstract groupCollapsed(index: number): void;
    abstract groupExpanded(index: number): void;
    abstract headerTemplateUpdated(oldData: any, newData: any): void;
    abstract templateUpdated(oldData: any, newData: any): void;
    abstract footerTemplateUpdated(oldData: any, newData: any): void;
}
export declare const footerTextSizeProperty: CssProperty<Style, number>;
export declare type TextAlignment = "left" | "center" | "right";
export declare const footerTextAlignmentProperty: CssProperty<Style, TextAlignment>;
export declare const footerColorProperty: CssProperty<Style, string>;
export declare const footerTextColorProperty: CssProperty<Style, string>;
export declare const footerHeightProperty: CssProperty<Style, number>;
export declare const footerTextBoldProperty: CssProperty<Style, boolean>;
export declare const separatorColorProperty: CssProperty<Style, string>;
export declare const headerTextSizeProperty: CssProperty<Style, number>;
export declare const headerTextAlignmentProperty: CssProperty<Style, TextAlignment>;
export declare const headerColorProperty: CssProperty<Style, string>;
export declare const headerTextColorProperty: CssProperty<Style, string>;
export declare const headerHeightProperty: CssProperty<Style, number>;
export declare const headerTextBoldProperty: CssProperty<Style, boolean>;
export declare const headerTemplateProperty: Property<Accordion, string>;
export declare const itemTemplateProperty: Property<Accordion, string>;
export declare const footerTemplateProperty: Property<Accordion, string>;
export declare const itemsProperty: Property<Accordion, any>;
export declare const selectedIndexProperty: CoercibleProperty<Accordion, number>;
