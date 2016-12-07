import { View } from "ui/core/view";
import * as common from "./accordion.common";
import { AccordionItem } from "./accordion.common";
export declare class Accordion extends common.Accordion {
    private _android;
    private _listAdapter;
    private _previousGroup;
    constructor();
    readonly android: android.widget.ExpandableListView;
    readonly _nativeView: android.widget.ExpandableListView;
    updateItems(oldItems: Array<AccordionItem>, newItems: Array<AccordionItem>): void;
    _createUI(): void;
    addItem(view: AccordionItem): void;
    _eachChildView(callback: (child: View) => boolean): void;
}
export declare class AccordionListAdapter extends android.widget.BaseExpandableListAdapter {
    owner: Accordion;
    constructor(owner: Accordion);
    hasStableIds(): boolean;
    getGroupView(groupPosition: number, isExpanded: boolean, convertView: android.view.View, parent: android.view.ViewGroup): android.view.View;
    getGroupCount(): number;
    getGroupId(groupPosition: number): number;
    getChildView(groupPosition: number, childPosition: number, isLastChild: boolean, convertView: android.view.View, parent: android.view.ViewGroup): any;
    getChildId(groupPosition: number, childPosition: number): number;
    getChildrenCount(groupPosition: number): number;
    isChildSelectable(groupPosition: number, childPosition: number): boolean;
}
