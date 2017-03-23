/**
 * Contains the ListView class, which represents a standard list view widget.
 */
declare module "nativescript-accordion" {
    import observable = require("data/observable");
    import dependencyObservable = require("ui/core/dependency-observable");
    import view = require("ui/core/view");
    import color = require("color");


    export module knownTemplates {
        export var itemTemplate: string;

        export var childTemplate: string;
    }


    export class ListView extends view.View {

        public static itemLoadingEvent: string;

        public static itemTapEvent: string;

        public static loadMoreItemsEvent: string;

        public static itemsProperty: dependencyObservable.Property;

        public static itemTemplateProperty: dependencyObservable.Property;

        public static childTemplateProperty: dependencyObservable.Property;

        public static rowHeightProperty: dependencyObservable.Property;


        android: any;

        ios: any;

        items: any;

        itemTemplate: string | view.Template;

        childTemplate: string | view.Template;

        itemTemplates: string | Array<view.KeyedTemplate>;

        childTemplates: string | Array<view.KeyedTemplate>;


        itemTemplateSelector: string | ((item: any, index: number, items: any) => string);

        childTemplateSelector: string | ((item: any, parent: number, index: number, items: any) => string);

        separatorColor: color.Color;

        rowHeight: number;

        refresh();

        scrollToIndex(index: number);

        on(eventNames: string, callback: (data: observable.EventData) => void, thisArg?: any);

        on(event: "itemLoading", callback: (args: ItemEventData) => void, thisArg?: any);

        on(event: "itemTap", callback: (args: ItemEventData) => void, thisArg?: any);

        on(event: "loadMoreItems", callback: (args: observable.EventData) => void, thisArg?: any);
    }


    export interface ItemEventData extends observable.EventData {

        index: number;

        view: view.View;

        ios: any;

        android: any;
    }
}