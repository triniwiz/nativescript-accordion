import * as common from "../accordion.common";
export declare const ITEMSLOADING = "itemsLoading";
export declare const HEADERLOADING = "headerLoading";
export declare const FOOTERLOADING = "footerLoading";
export declare const STARTHEADERLOADING = "startHeaderLoading";
export declare const STARTITEMLOADING = "startItemLoading";
export declare const STARTFOOTERLOADING = "startFooterLoading";
export declare class Accordion extends common.Accordion {
    private _android;
    private _listAdapter;
    private _previousGroup;
    private _views;
    _itemsMap: Map<any, any>;
    _headerMap: Map<any, any>;
    _footerMap: Map<any, any>;
    _expandedViews: Map<any, any>;
    constructor();
    headerTemplateUpdated(oldData: any, newData: any): void;
    footerTemplateUpdated(oldData: any, newData: any): void;
    templateUpdated(oldData: any, newData: any): void;
    updateNativeItems(oldItems: any, newItems: any): void;
    readonly android: any;
    addToView(view: any): void;
    createNativeView(): android.widget.ExpandableListView;
    addItem(view: any): void;
    refresh(): void;
    updateNativeIndex(oldIndex: number, newIndex: number): void;
    _selectedIndexUpdatedFromNative(newIndex: number): void;
    groupExpanded(index: number): void;
    groupCollapsed(index: number): void;
    expandItem(id: number): void;
    isItemExpanded(id: number): boolean;
}
export declare class AccordionListAdapter extends android.widget.BaseExpandableListAdapter {
    owner: Accordion;
    constructor(owner: Accordion);
    getChild(groupPosition: number, childPosition: number): any;
    getGroup(groupPosition: number): any;
    hasStableIds(): boolean;
    getGroupView(groupPosition: number, isExpanded: boolean, convertView: android.view.View, parent: android.view.ViewGroup): any;
    getGroupCount(): number;
    getGroupId(groupPosition: number): number;
    getChildView(groupPosition: number, childPosition: number, isLastChild: boolean, convertView: android.view.View, parent: android.view.ViewGroup): any;
    getChildId(groupPosition: number, childPosition: number): number;
    getChildrenCount(groupPosition: number): number;
    isChildSelectable(groupPosition: number, childPosition: number): boolean;
}
