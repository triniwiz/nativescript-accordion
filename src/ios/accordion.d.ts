import * as common from "../accordion.common";
export declare const ITEMSLOADING = "itemsLoading";
export declare const HEADERLOADING = "headerLoading";
export declare const FOOTERLOADING = "footerLoading";
export declare const STARTHEADERLOADING = "startHeaderLoading";
export declare const STARTITEMLOADING = "startItemLoading";
export declare const STARTFOOTERLOADING = "startFooterLoading";
export declare const ITEMTAP = "itemTap";
export declare const LOADMOREITEMS = "loadMoreItems";
export declare const ITEMHEIGHT = "itemHeight";
export declare class Accordion extends common.Accordion {
    _isDataDirty: boolean;
    _headerMap: Map<any, any>;
    _itemsMap: Map<any, any>;
    _footerMap: Map<any, any>;
    headerTemplateUpdated(oldData: any, newData: any): void;
    footerTemplateUpdated(oldData: any, newData: any): void;
    templateUpdated(oldData: any, newData: any): void;
    updateNativeItems(oldItems: any, newItems: any): void;
    _expandedViews: Map<any, any>;
    _indexSet: NSMutableIndexSet;
    groupCollapsed(index: number): void;
    groupExpanded(index: number): void;
    private _ios;
    private _accordion;
    widthMeasureSpec: number;
    heightMeasureSpec: number;
    private left;
    private top;
    private right;
    private bottom;
    _dataSource: AccordionDataSource;
    _delegate: any;
    private _map;
    constructor();
    _setNativeClipToBounds(): void;
    readonly ios: UITableView;
    readonly _nativeView: UITableView;
    addItem(view: any): void;
    refresh(): void;
    _selectedIndexUpdatedFromNative(newIndex: number): void;
    onLoaded(): void;
    onUnloaded(): void;
    scrollToIndex(index: number): void;
    measure(widthMeasureSpec: number, heightMeasureSpec: number): void;
    readonly _childrenCount: number;
    updateNativeIndex(oldIndex: number, newIndex: number): void;
}
export declare class AccordionHeaderViewCell extends UITableViewCell {
    owner: WeakRef<any>;
    readonly view: any;
}
export declare class AccordionDataSource extends NSObject implements UITableViewDataSource {
    static ObjCProtocols: {
        prototype: UITableViewDataSource;
    }[];
    private _owner;
    static initWithOwner(owner: WeakRef<Accordion>): AccordionDataSource;
    tableViewNumberOfRowsInSection(tableView: UITableView, section: number): any;
    numberOfSectionsInTableView(tableView: any): number;
    tableViewTitleForHeaderInSection(tableView: UITableView, section: number): any;
    tableViewCellForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): AccordionCell;
}
export declare class AccordionCell extends UITableViewCell {
    willMoveToSuperview(newSuperview: UIView): void;
}
export declare class UITableViewDelegateImpl extends NSObject implements UITableViewDelegate {
    static ObjCProtocols: {
        prototype: UITableViewDelegate;
    }[];
    private _owner;
    static initWithOwner(owner: WeakRef<Accordion>): UITableViewDelegateImpl;
    tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): any;
    tableViewEstimatedHeightForHeaderInSection(tableView: UITableView, section: number): number;
    tableViewHeightForHeaderInSection(tableView: UITableView, section: number): number;
    tableViewHeightForFooterInSection(tableView: UITableView, section: number): number;
    tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;
    tableViewWillDisplayHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void;
    tableViewWillDisplayFooterViewForSection(tableView: UITableView, view: UIView, section: number): void;
    tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void;
    tableViewViewForHeaderInSection(tableView: UITableView, section: number): any;
    tableViewViewForFooterInSection(tableView: UITableView, section: number): any;
}
