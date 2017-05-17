import {
    View,
    AddArrayFromBuilder,
    KeyedTemplate,
    Template,
    CssProperty,
    Style
} from "tns-core-modules/ui/core/view";
import {Property, CoercibleProperty} from "tns-core-modules/ui/core/view";
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

function onHeaderTemplateChanged(accordion: Accordion, oldValue, newValue) {
    accordion.headerTemplateUpdated(oldValue, newValue);
}

function onItemTemplateChanged(accordion: Accordion, oldValue, newValue) {
    accordion.templateUpdated(oldValue, newValue);
}

function onFooterTemplateChanged(accordion: Accordion, oldValue, newValue) {
    accordion.footerTemplateUpdated(oldValue, newValue);
}

function onItemsChanged(accordion: Accordion, oldValue, newValue) {
    accordion.updateNativeItems(oldValue, newValue);
}

function onSelectedIndexChanged(accordion: Accordion, oldValue, newValue) {
    if (accordion && accordion.items && types.isNumber(newValue)) {
        accordion.updateNativeIndex(oldValue, newValue);
        accordion.notify({
            eventName: Accordion.selectedIndexChangedEvent,
            object: accordion,
            oldIndex: oldValue,
            newIndex: newValue
        });
    }
}

export abstract class Accordion extends View {
    private _selectedIndexes;
    private _allowMultiple: boolean;
    public _effectiveRowHeight: number = autoEffectiveRowHeight;
    public static selectedIndexChangedEvent = "selectedIndexChanged";
    items: any;
    headerTemplate: any;
    itemTemplate: any;
    footerTemplate: any;
    selectedIndex: number;
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
        return (<any>this.style).headerTextBold;
    }

    set headerTextBold(value: boolean) {
        (<any>this.style).headerTextBold = value;
    }

    get headerHeight(): number {
        return (<any>this.style).headerHeight;
    }

    set headerHeight(value: number) {
        (<any>this.style).headerHeight = value;
    }

    get headerTextColor(): string {
        return (<any>this.style).headerTextColor;
    }

    set headerTextColor(value: string) {
        (<any>this.style).headerTextColor = value;
    }

    get headerColor(): string {
        return (<any>this.style).headerColor;
    }

    set headerColor(value: string) {
        (<any>this.style).headerColor = value;
    }

    get headerTextAlignment(): string {
        return (<any>this.style).headerTextAlignment;
    }

    set headerTextAlignment(value: string) {
        (<any>this.style).headerTextAlignment = value;
    }

    get headerTextSize(): number {
        return (<any>this.style).headerTextSize;
    }

    set headerTextSize(value: number) {
        (<any>this.style).headerTextSize = value;
    }

    get footerTextBold(): boolean {
        return (<any>this.style).footerTextBold;
    }

    set footerTextBold(value: boolean) {
        (<any>this.style).footerTextBold = value;
    }

    get footerHeight(): number {
        return (<any>this.style).footerHeight;
    }

    set footerHeight(value: number) {
        (<any>this.style).footerHeight = value;
    }

    get footerTextColor(): string {
        return (<any>this.style).footerTextColor;
    }

    set footerTextColor(value: string) {
        (<any>this.style).footerTextColor = value;
    }

    get footerColor(): string {
        return (<any>this.style).footerColor;
    }

    set footerColor(value: string) {
        (<any>this.style).footerColor = value;
    }

    get footerTextAlignment(): string {
        return (<any>this.style).footerTextAlignment;
    }

    set footerTextAlignment(value: string) {
        (<any>this.style).footerTextAlignment = value;
    }

    get footerTextSize(): number {
        return (<any>this.style).footerTextSize;
    }

    set footerTextSize(value: number) {
        (<any>this.style).footerTextSize = value;
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
        return this.style.separatorColor;
    }

    set separatorColor(value: any) {
        this.style.separatorColor = value;
    }

    public abstract updateNativeItems(oldItems: Array<any>, newItems: Array<any>): void;

    public abstract addItem(view: any): void;

    public abstract updateNativeIndex(oldData, newData): void;

    public abstract groupCollapsed(index: number): void;

    public abstract groupExpanded(index: number): void;

    public abstract headerTemplateUpdated(oldData, newData): void;

    public abstract templateUpdated(oldData, newData): void;

    public abstract footerTemplateUpdated(oldData, newData): void;
}


export const footerTextSizeProperty  = new CssProperty<Style,number>({
    name:'footerTextSize',
    cssName:'footer-text-size',
    valueConverter:(v) => parseInt(v)
});

footerTextSizeProperty.register(Style);

export type TextAlignment = "left" | "center" | "right";
export const footerTextAlignmentProperty  = new CssProperty<Style,TextAlignment>({
    name:'footerTextAlignment',
    cssName:'footer-text-align'
});

footerTextAlignmentProperty.register(Style);

export const footerColorProperty  = new CssProperty<Style,string>({
    name:'footerColor',
    cssName:'footer-color'
});

footerColorProperty.register(Style);


export const footerTextColorProperty  = new CssProperty<Style,string>({
    name:'footerTextColor',
    cssName:'footer-text-color'
});

footerTextColorProperty.register(Style);

export const footerHeightProperty  = new CssProperty<Style,number>({
    name:'footerHeight',
    cssName:'footer-height',
    valueConverter: (v) => parseInt(v)
});

footerHeightProperty.register(Style);


export const footerTextBoldProperty  = new CssProperty<Style,boolean>({
    name:'footerTextBold',
    cssName:'footer-text-bold',
    valueConverter: (v) => Boolean(v)
});

footerTextBoldProperty.register(Style);

export const separatorColorProperty  = new CssProperty<Style,string>({
    name:'separatorColor',
    cssName:'separator-color',
    valueConverter: (v) => String(v)
});

separatorColorProperty.register(Style);


export const headerTextSizeProperty  = new CssProperty<Style,number>({
    name:'headerTextSize',
    cssName:'header-text-size',
    valueConverter:(v) => parseInt(v)
});

headerTextSizeProperty.register(Style);


export const headerTextAlignmentProperty  = new CssProperty<Style,TextAlignment>({
    name:'headerTextAlignment',
    cssName:'header-text-align'
});

headerTextAlignmentProperty.register(Style);

export const headerColorProperty  = new CssProperty<Style,string>({
    name:'headerColor',
    cssName:'header-color'
});

headerColorProperty.register(Style);


export const headerTextColorProperty  = new CssProperty<Style,string>({
    name:'headerTextColor',
    cssName:'header-text-color'
});

headerTextColorProperty.register(Style);

export const headerHeightProperty  = new CssProperty<Style,number>({
    name:'headerHeight',
    cssName:'header-height',
    valueConverter: (v) => parseInt(v)
});

headerHeightProperty.register(Style);


export const headerTextBoldProperty  = new CssProperty<Style,boolean>({
    name:'headerTextBold',
    cssName:'header-text-bold',
    valueConverter: (v) => Boolean(v)
});

headerTextBoldProperty.register(Style);


export const headerTemplateProperty = new Property<Accordion, string>({
    name: "headerTemplate",
    affectsLayout: true,
    valueChanged: onHeaderTemplateChanged
});
headerTemplateProperty.register(Accordion);

export const itemTemplateProperty = new Property<Accordion, string>({
    name: "itemTemplate",
    affectsLayout: true,
    valueChanged: onItemTemplateChanged
});
itemTemplateProperty.register(Accordion);

export const footerTemplateProperty = new Property<Accordion, string>({
    name: "footerTemplate",
    affectsLayout: true,
    valueChanged: onFooterTemplateChanged
});

footerTemplateProperty.register(Accordion);

export const itemsProperty = new Property<Accordion, any>({
    name: "items",
    affectsLayout: true,
    valueChanged: onItemsChanged
});

itemsProperty.register(Accordion);

export const selectedIndexProperty = new CoercibleProperty<Accordion, number>({
    name: "selectedIndex",
    defaultValue: 0,
    valueChanged: onSelectedIndexChanged,
    coerceValue: (target, value) => {
        const max = target.items ? target.items.length - 1 : 0;
        value = Math.min(value, max);
        value = Math.max(value, 0);
        return value;
    },
    valueConverter: (v) => parseInt(v)
});

selectedIndexProperty.register(Accordion);