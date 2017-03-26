import { View, AddArrayFromBuilder, KeyedTemplate, Template } from "ui/core/view";
import { PropertyMetadata } from "ui/core/proxy";
import { Property, PropertyChangeData, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { StackLayout } from "ui/layouts/stack-layout";
import { isAndroid } from "platform";
import { Label } from "ui/label";
import { parse } from "ui/builder";
import { ObservableArray } from "data/observable-array";
import { EventData } from "data/observable";
import * as types from "utils/types";
const autoEffectiveRowHeight = -1;

export module knownCollections {
    export const items = "items";
}
export module knownTemplates {
    export const itemTemplate = "itemTemplate";
    export const headerTemplate = "headerTemplate";
    export const footerTemplate = "footerTemplate";
}

export module knownMultiTemplates {
    export const itemTemplates = "itemTemplates";
}

let AffectsLayout = isAndroid ? PropertyMetadataSettings.None : PropertyMetadataSettings.AffectsLayout;

function onHeaderTemplateChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.headerTemplateUpdated(data.oldValue, data.newValue);
};


function onItemTemplateChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.templateUpdated(data.oldValue, data.newValue);
};


function onFooterTemplateChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.footerTemplateUpdated(data.oldValue, data.newValue);
};


function onItemsChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;
    accordion.updateNativeItems(data.oldValue, data.newValue);
};

function onSelectedIndexChanged(data: PropertyChangeData) {
    const accordion = <Accordion>data.object;

    if (accordion && accordion.items && types.isNumber(data.newValue)) {
        accordion.updateNativeIndex(data.oldValue, data.newValue);
        accordion.notify({ eventName: Accordion.selectedIndexChangedEvent, object: accordion, oldIndex: data.oldValue, newIndex: data.newValue });
    }
};

export abstract class Accordion extends View {
    private _footerTextSize: any;
    private _footerTextAlignment: any;
    private _footerColor: any;
    private _footerTextColor: any;
    private _footerHeight: any;
    private _footerTextBold: boolean;
    private _headerTextAlignment: any;
    private _selectedIndexes;
    private _allowMultiple: boolean;
    private _separatorColor: string;
    private _headerHeight: number;
    private _headerTextColor: string;
    private _headerColor: string;
    private _headerTextSize: number;
    private _headerTextBold: boolean;
    public static headerTemplateProperty = new Property("headerTemplate", "Accordion", new PropertyMetadata(undefined, AffectsLayout, onHeaderTemplateChanged));
    public static itemTemplateProperty = new Property("itemTemplate", "Accordion", new PropertyMetadata(undefined, AffectsLayout, onItemTemplateChanged));
    public static footerTemplateProperty = new Property("footerTemplate", "Accordion", new PropertyMetadata(undefined, AffectsLayout, onFooterTemplateChanged));
    public static itemsProperty = new Property("items", "Accordion", new PropertyMetadata(undefined, AffectsLayout, null, null, onItemsChanged));
    public static selectedIndexProperty = new Property("selectedIndex", "Accordion", new PropertyMetadata(undefined, PropertyMetadataSettings.None, null, null, onSelectedIndexChanged));
    public _effectiveRowHeight: number = autoEffectiveRowHeight;
    public static selectedIndexChangedEvent = "selectedIndexChanged";
    constructor() {
        super();
    }

    _getParentData(parentIndex: number) {
        let items = <any>this.items;
        return items.getItem ? items.getItem(parentIndex) : items[parentIndex];
    }
    _getChildData(parentIndex: number, childIndex: number) {
        let items = <any>this.items;
        return items.getItem ? items.getItem(parentIndex)['items'][childIndex] : items[parentIndex]['items'][childIndex];
    }

    get headerTextBold(): boolean {
        return this._headerTextBold;
    }
    set headerTextBold(value: boolean) {
        this._headerTextBold = value;
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
    get footerTextBold(): boolean {
        return this._footerTextBold;
    }
    set footerTextBold(value: boolean) {
        this._footerTextBold = value;
    }
    get footerHeight(): number {
        return this._footerHeight;
    }
    set footerHeight(value: number) {
        this._footerHeight = value;
    }
    get footerTextColor(): string {
        return this._footerTextColor;
    }
    set footerTextColor(value: string) {
        this._footerTextColor = value;
    }
    get footerColor(): string {
        return this._footerColor;
    }
    set footerColor(value: string) {
        this._footerColor = value;
    }
    get footerTextAlignment(): string {
        return this._footerTextAlignment;
    }
    set footerTextAlignment(value: string) {
        this._footerTextAlignment = value;
    }
    get footerTextSize(): number {
        return this._footerTextSize;
    }
    set footerTextSize(value: number) {
        this._footerTextSize = value;
    }
    get items() {
        return this._getValue(Accordion.itemsProperty);
    }
    set items(value: Array<any>) {
        this._setValue(Accordion.itemsProperty, value);
    }
    get headerTemplate() {
        return this._getValue(Accordion.headerTemplateProperty);
    }
    set headerTemplate(value: string) {
        this._setValue(Accordion.headerTemplateProperty, value);
    }
    get itemTemplate() {
        return this._getValue(Accordion.itemTemplateProperty);
    }
    set itemTemplate(value: string) {
        this._setValue(Accordion.itemTemplateProperty, value);
    }
    get footerTemplate() {
        return this._getValue(Accordion.footerTemplateProperty);
    }
    set footerTemplate(value: string) {
        this._setValue(Accordion.footerTemplateProperty, value);
    }
    get selectedIndex() {
        return this._getValue(Accordion.selectedIndexProperty);
    }
    set selectedIndex(value: number) {
        this._setValue(Accordion.selectedIndexProperty, value);
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
        this._allowMultiple = value;
    }
    get separatorColor() {
        return this._separatorColor;
    }
    set separatorColor(value: string) {
        this._separatorColor = value;
    }

    public abstract updateNativeItems(oldItems: Array<any>, newItems: Array<any>): void;

    public abstract addItem(view: any): void;

    public abstract updateNativeIndex(oldData, newData): void;

    public abstract groupCollapsed(index: number): void;

    public abstract headerTemplateUpdated(oldData, newData): void;

    public abstract templateUpdated(oldData, newData): void;

    public abstract footerTemplateUpdated(oldData, newData): void;
}