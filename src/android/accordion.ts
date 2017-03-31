import { Color } from "color";
import { parse } from "ui/builder";
import * as types from "utils/types";
import * as utils from "utils/utils";
import { View } from "ui/core/view";
import * as common from "../accordion.common";
import { StackLayout } from "ui/layouts/stack-layout";
import { PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import { PropertyMetadataSettings } from "ui/core/dependency-observable";
import { Property } from "ui/core/dependency-observable";
import { Observable } from "data/observable";
import { Label } from "ui/label";
export const ITEMSLOADING = "itemsLoading";
export const HEADERLOADING = "headerLoading";
export const FOOTERLOADING = "footerLoading";
export const STARTHEADERLOADING = "startHeaderLoading";
export const STARTITEMLOADING = "startItemLoading";
export const STARTFOOTERLOADING = "startFooterLoading";
const NG_VIEW = "_ngViewRef";
global.moduleMerge(common, exports);
function notifyForItemAtIndex(owner, nativeView: any, view: any, eventName: string, parentIndex: number, childIndex: number) {
    let args = { eventName: eventName, object: owner, parentIndex: parentIndex, childIndex: childIndex, view: view, ios: undefined, android: nativeView };
    owner.notify(args);
    return args;
}

function notifyForHeaderOrFooterAtIndex(owner, nativeView: any, view: any, eventName: string, parentIndex: number) {
    let args = { eventName: eventName, object: owner, parentIndex: parentIndex, view: view, ios: undefined, android: nativeView };
    owner.notify(args);
    return args;
}

function notifyForHeaderOrFooterStartAtIndex(owner, eventName: string, parentIndex: number) {
    let args = { eventName: eventName, object: owner, parentIndex: parentIndex };
    owner.notify(args);
    return args;
}

function notifyForItemStartAtIndex(owner, eventName: string, parentIndex: number, childIndex: number) {
    let args = { eventName: eventName, object: owner, parentIndex: parentIndex, childIndex: childIndex };
    owner.notify(args);
    return args;
}


export class Accordion extends common.Accordion {
    // private _android: android.widget.LinearLayout;
    private _android: android.widget.ExpandableListView;
    private _listAdapter: AccordionListAdapter;
    private _previousGroup: number = -1;
    private _views: any[] = [];
    _itemsMap: Map<any, any>;
    _headerMap: Map<any, any>;
    _footerMap: Map<any, any>;
    _expandedViews: Map<any, any>;
    constructor() {
        super();
        this.selectedIndexes = [];
        this._itemsMap = new Map();
        this._headerMap = new Map();
        this._itemsMap = new Map();
        this._expandedViews = new Map();
    }

    public headerTemplateUpdated(oldData: any, newData: any): void {
    }

    public footerTemplateUpdated(oldData: any, newData: any): void {
    }

    public templateUpdated(oldData: any, newData: any): void {

    }

    public updateNativeItems(oldItems: any, newItems: any) {

        if (oldItems) {
            if (this._listAdapter) {
                this._listAdapter.notifyDataSetChanged();
            }
        }

        if (newItems) {
            if (Array.isArray(newItems)) {
                if (this._listAdapter) {
                    this._listAdapter.notifyDataSetChanged();
                }
            } else {
                if (newItems && newItems.on) {
                    newItems.on("change", (args) => {
                        if (this._listAdapter) {
                            this._listAdapter.notifyDataSetChanged();
                        }
                    });
                }
            }
        }
    }

    get android() {
        return this._android;
    }

    get _nativeView() {
        return this._android;
    }

    addToView(view) {
        this._addView(view);
    }

    _createUI() {
        this._android = new android.widget.ExpandableListView(utils.ad.getApplicationContext());
        const that = new WeakRef(this);
        if (this.separatorColor) {
            this._android.setDivider(new android.graphics.drawable.ColorDrawable(new Color(this.separatorColor).android));
            this._android.setDividerHeight(1);
        }
        this._android.setGroupIndicator(null);
        this._android.setOnGroupExpandListener(new android.widget.ExpandableListView.OnGroupExpandListener({
            onGroupExpand(groupPosition: number) {
                const owner = that.get();
                owner._expandedViews.set(groupPosition, true);
                owner.groupExpanded(groupPosition);
                if (!owner.allowMultiple) {
                    owner._selectedIndexUpdatedFromNative(groupPosition);
                    if ((owner._previousGroup != -1) && (groupPosition != owner._previousGroup)) {
                        owner.android.collapseGroup(owner._previousGroup);
                    }
                    owner._previousGroup = groupPosition;
                }
                owner.selectedIndexes.forEach((item, index, arr) => {
                    if (item === groupPosition) {
                        owner.selectedIndexes.slice(index, 1);
                    }

                    if (index === arr.length) {
                        owner.selectedIndexes.push(groupPosition);
                    }
                })
            }
        }));

        this._android.setOnGroupCollapseListener(new android.widget.ExpandableListView.OnGroupCollapseListener({
            onGroupCollapse(groupPosition: number) {
                const owner = that.get();
                owner._expandedViews.set(groupPosition, false);
                let items = owner.selectedIndexes;
                owner.groupCollapsed(groupPosition);
                owner.selectedIndexes = owner.selectedIndexes.map((item) => {
                    if (item != groupPosition) {
                        return item;
                    }
                });
            }
        }));

        this._listAdapter = new AccordionListAdapter(this);
        this._android.setAdapter(this._listAdapter);

        if (this.selectedIndexes) {
            this.selectedIndexes.forEach((item) => {
                this._android.expandGroup(item);
            });
        }
    }

    addItem(view: any) {
        this.items.push(view);
        this._addView(view);
        this._listAdapter.notifyDataSetChanged();
    }

    public refresh() {
        if (!this._android || !this._android.getExpandableListAdapter()) {
            return;
        }
        if (this._headerMap) {
            this._headerMap.forEach((view, id) => {
                if (!(view.bindingContext instanceof Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        if (this._itemsMap) {
            this._itemsMap.forEach((view, id) => {
                if (!(view.bindingContext instanceof Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        if (this._footerMap) {
            this._footerMap.forEach((view, id) => {
                if (!(view.bindingContext instanceof Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        this._listAdapter.notifyDataSetChanged();
    }


    updateNativeIndex(oldIndex: number, newIndex: number) {
        if (this._android) {
            if (newIndex >= 0) {
                this._android.expandGroup(newIndex);
            }
        }
    }

    _selectedIndexUpdatedFromNative(newIndex: number) {
        if (this.selectedIndex !== newIndex) {
            let old = this._previousGroup;
            this._onPropertyChangedFromNative(common.Accordion.selectedIndexProperty, newIndex);
            this.notify({ eventName: common.Accordion.selectedIndexChangedEvent, object: this, old, newIndex });
        }
    }

    groupExpanded(index: number) {
        this.notifyPropertyChange("groupExpanded", index);
    }
    groupCollapsed(index: number) {
        this.notifyPropertyChange("groupCollapsed", index);
    }

    public expandItem(id: number) {
        if (id) {
            this._android.expandGroup(id);
        }
    }
    public isItemExpanded(id: number): boolean {
        return this._android.isGroupExpanded(id);
    }
}

export class AccordionListAdapter extends android.widget.BaseExpandableListAdapter {
    owner: Accordion;
    constructor(owner: Accordion) {
        super();
        this.owner = owner;
        return global.__native(this);
    }
    getChild(groupPosition: number, childPosition: number) {
        return null;
    }

    getGroup(groupPosition: number) {
        return null;
    }

    hasStableIds(): boolean {
        return true;
    }
    getGroupView(groupPosition: number, isExpanded: boolean, convertView: android.view.View, parent: android.view.ViewGroup) {
        let owner = this.owner;
        if (convertView) {
            convertView = owner._headerMap.get(groupPosition) ? owner._headerMap.get(groupPosition)._nativeView : null;
            if (convertView) {
                return convertView;
            }

        }
        let view: any = !types.isNullOrUndefined(owner.headerTemplate) ? parse(owner.headerTemplate, this) : null;
        let _args = notifyForHeaderOrFooterAtIndex(owner, view ? view._nativeView : null, view, HEADERLOADING, groupPosition);
        view = view || _args.view;
        if (view) {
            const data = owner._getParentData(groupPosition);
            view.bindingContext = new Observable(data);
            if (!view.parent) {
                owner._addView(view);
            }
            owner._headerMap.set(groupPosition, view);
            return view._nativeView;
        }
        const header = new Label();
        header.text = owner._getParentData(groupPosition) ? owner._getParentData(groupPosition).headerText : "";
        if (owner.headerTextAlignment === "center") {
            header.android.setTextAlignment(android.view.View.TEXT_ALIGNMENT_CENTER);
        } else if (owner.headerTextAlignment === "right") {
            header.android.setTextAlignment(android.view.View.TEXT_ALIGNMENT_VIEW_END);
        } else if (owner.headerTextAlignment === "left") {
            header.android.setTextAlignment(android.view.View.TEXT_ALIGNMENT_VIEW_START);
        }

        if (owner.headerHeight) {
            header.android.setHeight(owner.headerHeight);
        }
        if (owner.headerColor) {
            header.android.setBackgroundColor(new Color(owner.headerColor).android);
        }

        if (owner.headerTextColor) {
            header.android.setTextColor(new Color(owner.headerTextColor).android);
        }

        if (owner.headerTextSize) {
            header.android.setTextSize(this.owner.headerTextSize);
        }
        owner._addView(header);
        owner._headerMap.set(groupPosition, header);
        return header;

    }

    getGroupCount(): number {
        return this.owner.items && this.owner.items.length ? this.owner.items.length : 0;
    }

    getGroupId(groupPosition: number): number {
        return groupPosition;
    }

    getChildView(groupPosition: number, childPosition: number, isLastChild: boolean, convertView: android.view.View, parent: android.view.ViewGroup) {
        const owner = this.owner;
        let prop = parseInt(`${groupPosition + 1}${childPosition}`);
        if (convertView) {
            convertView = owner._headerMap.get(prop) ? owner._headerMap.get(prop)._nativeView : null;
            if (convertView) {
                return convertView;
            }

        }
        let view: any = !types.isNullOrUndefined(owner.itemTemplate) ? parse(owner.itemTemplate, this) : null;
        let _args = notifyForItemAtIndex(owner, view ? view._nativeView : null, view, ITEMSLOADING, groupPosition, childPosition);
        view = view || _args.view;
        owner._itemsMap.set(prop, view);
        if (view) {
            const data = owner._getChildData(groupPosition, childPosition);
            view.bindingContext = new Observable(data);
            if (!view.parent) {
                owner._addView(view);
            }
            return view._nativeView;
        }

        return null;
    }

    getChildId(groupPosition: number, childPosition: number): number {
        return childPosition;
    }

    getChildrenCount(groupPosition: number): number {
        const owner = this.owner;
        if (owner && owner.items && owner._getParentData(groupPosition)) {
            if (typeof owner._getParentData(groupPosition).get === "function") {
                return owner._getParentData(groupPosition).get('items').length;
            } else {
                return owner._getParentData(groupPosition)['items'].length;
            }
        } else {
            return 0;
        }
        //   return (owner && owner.items && owner._getParentData(groupPosition)['items']) ? owner._getParentData(groupPosition)['items'].length : 0;
    }

    isChildSelectable(groupPosition: number, childPosition: number) {
        return true;
    }

}

