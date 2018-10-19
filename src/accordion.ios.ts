import { View } from 'tns-core-modules/ui/core/view';
import { parse } from 'tns-core-modules/ui/builder';
import * as common from './accordion.common';
import { AccordionBase, selectedIndexesProperty } from './accordion.common';
import * as types from 'tns-core-modules/utils/types';
import { Color } from 'tns-core-modules/color';
import * as utils from 'tns-core-modules/utils/utils';
import { fromObject } from 'tns-core-modules/data/observable';

export const ITEMSLOADING = 'itemsLoading';
export const HEADERLOADING = 'headerLoading';
export const FOOTERLOADING = 'footerLoading';
export const STARTHEADERLOADING = 'startHeaderLoading';
export const STARTITEMLOADING = 'startItemLoading';
export const STARTFOOTERLOADING = 'startFooterLoading';
export const ITEMTAP = 'itemTap';
export const LOADMOREITEMS = 'loadMoreItems';
export const ITEMHEIGHT = 'itemHeight';
const NG_VIEW = '_ngViewRef';

global.moduleMerge(common, exports);
const DEFAULT_HEIGHT: number = 44;
const infinity = utils.layout.makeMeasureSpec(0, utils.layout.UNSPECIFIED);

function notifyForItemAtIndex(owner, nativeView: any, view: any, eventName: string, indexPath: NSIndexPath) {
    let args = {
        eventName: eventName,
        object: owner,
        parentIndex: indexPath.section,
        childIndex: indexPath.row,
        view: view,
        ios: nativeView,
        android: undefined
    };
    owner.notify(args);
    return args;
}

function notifyForHeaderOrFooterAtIndex(owner, nativeView: any, view: any, eventName: string, parentIndex: number) {
    let args = {
        eventName: eventName,
        object: owner,
        parentIndex: parentIndex,
        view: view,
        ios: nativeView,
        android: undefined
    };
    owner.notify(args);
    return args;
}

const AccordionViewCellReuseIdentifier = 'AccordionCellReuseIdentifier';
const DefaultAccordionHeaderViewHeight = 44.0;
const AccordionHeaderViewReuseIdentifier = 'AccordionHeaderViewReuseIdentifier';
const AccordionFooterViewReuseIdentifier = 'AccordionFooterViewReuseIdentifier';

export class Accordion extends AccordionBase {
    _isDataDirty: boolean;
    _headerMap: Map<any, any>;
    _itemsMap: Map<any, any>;
    _footerMap: Map<any, any>;

    public headerTemplateUpdated(oldData: any, newData: any): void {
        this.refresh();
    }

    public footerTemplateUpdated(oldData: any, newData: any): void {
        this.refresh();
    }

    public templateUpdated(oldData: any, newData: any): void {
        this.refresh();

    }

    public updateNativeItems(oldItems: any, newItems: any) {
        this._ios.reloadData();
    }

    _expandedViews: Map<any, any>;
    _indexSet: NSMutableIndexSet;

    public groupCollapsed(index: number): void {
        this.notifyPropertyChange('groupCollapsed', index);
    }

    public groupExpanded(index: number): void {
        this.notifyPropertyChange('groupExpanded', index);
    }

    private _ios: UITableView;
    private _accordion;
    public widthMeasureSpec: number;
    public heightMeasureSpec: number;
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;
    _dataSource: AccordionDataSource;
    _delegate;
    private _map: Map<AccordionCell, View>;

    constructor() {
        super();
        this._ios = UITableView.new();
    }

    public createNativeView() {
        this._ios.registerClassForCellReuseIdentifier(AccordionCell.class(), AccordionViewCellReuseIdentifier);
        this.ios.registerNibForHeaderFooterViewReuseIdentifier(UINib.nibWithNibNameBundle('AccordionHeaderView', null), AccordionHeaderViewReuseIdentifier);
        this.ios.registerNibForHeaderFooterViewReuseIdentifier(UINib.nibWithNibNameBundle('AccordionFooterView', null), AccordionFooterViewReuseIdentifier);
        this._ios.autoresizingMask = UIViewAutoresizing.None;
        this._ios.estimatedRowHeight = DEFAULT_HEIGHT;
        this._ios.rowHeight = UITableViewAutomaticDimension;
        this._dataSource = AccordionDataSource.initWithOwner(new WeakRef(this));
        this._delegate = UITableViewDelegateImpl.initWithOwner(new WeakRef(this));
        this._setNativeClipToBounds();
        this._expandedViews = new Map();
        this._itemsMap = new Map();
        this._indexSet = NSMutableIndexSet.alloc().init();
        return this._ios;
    }

    public initNativeView() {
        if (this._isDataDirty) {
            this.requestLayout();
            this.refresh();
        }
        this._ios.dataSource = this._dataSource;
        this._ios.delegate = this._delegate;
        if (this.separatorColor) {
            this.ios.separatorColor = new Color(this.separatorColor).ios;
        }
    }

    public disposeNativeView() {
        this._ios.delegate = null;
        if (this._indexSet) {
            this._indexSet.removeAllIndexes();
        }
    }

    _setNativeClipToBounds() {
        this._ios.clipsToBounds = true;
    }

    get ios() {
        return this._ios;
    }

    addItem(view: any) {
    }

    public refresh() {
        if (this.isLoaded) {
            this._ios.reloadData();
            this.requestLayout();
            this._isDataDirty = false;
        } else {
            this._isDataDirty = true;
        }
    }

    _selectedIndexesUpdatedFromNative(newIndexes: any) {
        selectedIndexesProperty.nativeValueChange(this, newIndexes);
    }


    public scrollToIndex(index: number) {
        if (this._ios) {
            this._ios.scrollToRowAtIndexPathAtScrollPositionAnimated(NSIndexPath.indexPathForItemInSection(index, 0),
                UITableViewScrollPosition.Top, false);
        }
    }

    public measure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        this.widthMeasureSpec = widthMeasureSpec;
        const changed = (<any>this)._setCurrentMeasureSpecs(widthMeasureSpec, heightMeasureSpec);
        super.measure(widthMeasureSpec, heightMeasureSpec);
        if (changed) {
            this._ios.reloadData();
        }
    }

    get _childrenCount(): number {
        return this.items ? this.items.length : 0;
    }

    updateNativeIndexes(oldIndex: any, newIndex: any) {
        // this.notifyPropertyChange("selectedIndex", newIndex);
        const reloadSection = (index: number, sections?: any) => {
            let section = NSMutableIndexSet.alloc().initWithIndex(index);
            if (!sections) {
                this._ios.reloadSectionsWithRowAnimation(section, UITableViewRowAnimation.None);
            } else {
                this._ios.reloadSectionsWithRowAnimation(sections, UITableViewRowAnimation.Automatic);
            }

        }
        if (this.allowMultiple) {
            if (!this._expandedViews.get(newIndex)) {
                this._expandedViews.set(newIndex, true);
                this._indexSet.addIndex(newIndex);
                this._selectedIndexesUpdatedFromNative(newIndex);
            }
            // reloadSection(newIndex, this._indexSet);
            this._ios.reloadData();
        } else {

            if (!this._expandedViews.get(newIndex)) {
                if (this._indexSet.count > 0) {
                    // const previous = this._indexSet.firstIndex;
                    this._expandedViews.clear();
                    // this._expandedViews.set(previous, false);
                    this._indexSet.removeAllIndexes();

                    // reloadSection(previous);
                    this._selectedIndexesUpdatedFromNative(newIndex);
                    this._expandedViews.set(newIndex, true);
                    this._indexSet.addIndex(newIndex);

                } else {

                    this._expandedViews.set(newIndex, true);
                    this._indexSet.addIndex(newIndex);
                }
                this._ios.reloadData();
                // reloadSection(newIndex, this._indexSet);

            }

        }

    }

    expandAll(): void {
    }
}

export class AccordionHeaderViewCell extends UITableViewCell {
    public owner: WeakRef<any>;

    get view() {
        return this.owner ? this.owner.get() : null;
    }
}

export class AccordionDataSource extends NSObject implements UITableViewDataSource {
    public static ObjCProtocols = [UITableViewDataSource];
    private _owner: WeakRef<Accordion>;

    public static initWithOwner(owner: WeakRef<Accordion>): AccordionDataSource {
        let dataSource = <AccordionDataSource>AccordionDataSource.new();
        dataSource._owner = owner;
        return dataSource;
    }

    public tableViewNumberOfRowsInSection(tableView: UITableView, section: number) {
        let owner = this._owner.get();
        if (owner._expandedViews.has(section)) {
            return (owner && owner.items && owner._getParentData(section)['items']) ? owner._getParentData(section)['items'].length : 0;
        } else {
            return 0;
        }

    }

    public numberOfSectionsInTableView(tableView) {
        let owner = this._owner.get();
        return (owner && owner.items) ? owner.items.length : 0;
    }

    public tableViewTitleForHeaderInSection(tableView: UITableView, section: number) {
        let owner = this._owner.get();
        return owner._getParentData(section).headerText;
    }

    public tableViewCellForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath) {
        let owner = this._owner.get();
        let cell: AccordionCell;
        if (owner) {
            const has = owner._expandedViews.has(indexPath.section);
            const selected = owner._expandedViews.get(indexPath.section);

            if (has && !selected) {
                cell = <AccordionCell>AccordionCell.new();
            } else {
                cell = <AccordionCell>AccordionCell.new();
                owner._expandedViews.set(indexPath.section, true);

                let view: any = !types.isNullOrUndefined(owner.itemContentTemplate) ? parse(owner.itemContentTemplate, this) : null;
                let _args = notifyForItemAtIndex(owner, null, view, ITEMSLOADING, indexPath);
                view = view || _args.view;

                let prop = parseInt(`${indexPath.section + 1}${indexPath.row}`);
                owner._itemsMap.set(prop, view);
                if (view) {
                    const data = owner._getChildData(indexPath.section, indexPath.row);
                    if (!types.isNullOrUndefined(data)) {
                        view.bindingContext = fromObject(data);
                    }
                    if (!view.parent) {
                        owner._addView(view);
                    }
                    const rowHeight = owner._effectiveRowHeight;
                    const heightMeasureSpec: number = rowHeight >= 0 ? utils.layout.makeMeasureSpec(rowHeight, utils.layout.EXACTLY) : infinity;
                    const measuredSize = View.measureChild(owner, view, owner.widthMeasureSpec, heightMeasureSpec);
                    const height = measuredSize.measuredHeight;
                    const width = measuredSize.measuredWidth;
                    View.layoutChild(owner, view, 0, 0, width, height);
                    cell.contentView.addSubview(view.nativeView);
                }
            }
        }
        else {
            cell = <AccordionCell>AccordionCell.new();
        }
        cell.selectionStyle = UITableViewCellSelectionStyle.None;
        return cell;
    }


}

export class AccordionCell extends UITableViewCell {

    public willMoveToSuperview(newSuperview: UIView): void {

        // let parent = <Accordion>(this.view ? this.view.parent : null);

        // When inside ListView and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        // if (parent && !newSuperview) {
        //  parent._removeContainer(this);
        // }
    }
}

export class UITableViewDelegateImpl extends NSObject implements UITableViewDelegate {
    public static ObjCProtocols = [UITableViewDelegate];
    private _owner: WeakRef<Accordion>;

    public static initWithOwner(owner: WeakRef<Accordion>): UITableViewDelegateImpl {
        let delegate = <UITableViewDelegateImpl>UITableViewDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    }

    public tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath) {
        let owner = this._owner.get();
        if (owner._expandedViews.get(indexPath.section)) {
            let view: any = parse(owner.itemContentTemplate, this);
            const data = owner._getChildData(indexPath.section, indexPath.row);
            if (!view) {
                let prop = parseInt(`${indexPath.section + 1}${indexPath.row}`);
                view = owner._itemsMap.get(prop);
                return (view && view.ios) ? view.ios.frame.size.height : DEFAULT_HEIGHT;
            }
            if (view) {
                if (!types.isNullOrUndefined(data)) {
                    view.bindingContext = data;
                }
                if (!view.parent) {
                    owner._addView(view);
                }
                const rowHeight = owner._effectiveRowHeight;
                const heightMeasureSpec: number = rowHeight >= 0 ? utils.layout.makeMeasureSpec(rowHeight, utils.layout.EXACTLY) : infinity;
                const measuredSize = View.measureChild(owner, view, owner.widthMeasureSpec, heightMeasureSpec);
                const height = measuredSize.measuredHeight;
                const width = measuredSize.measuredWidth;
                View.layoutChild(owner, view, 0, 0, width, height);
            }

            return (view && view.ios) ? view.ios.frame.size.height : DEFAULT_HEIGHT;
        }
        return 0;
    }

    public tableViewEstimatedHeightForHeaderInSection(tableView: UITableView, section: number) {
        return DEFAULT_HEIGHT;
    }

    public tableViewHeightForHeaderInSection(tableView: UITableView, section: number) {
        let owner = this._owner.get();

        return DEFAULT_HEIGHT;
    }

    public tableViewHeightForFooterInSection(tableView: UITableView, section: number) {
        let owner = this._owner.get();

        return -1;
    }

    public tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath) {
        let owner = this._owner.get();
        // let view = parse(owner.itemTemplate, this);
        // view.bindingContext = new Observable(owner._getChildData(indexPath.section, indexPath.row))
        const data = owner._getChildData(indexPath.section, indexPath.row);
        let args = {
            eventName: 'itemTapped',
            data: data,
            object: owner,
            childIndex: indexPath.row,
            parentIndex: indexPath.section,
            view: null,
            ios: null,
            android: undefined
        };
        owner.notify(args);
    }

    public tableViewWillDisplayHeaderViewForSection(tableView: UITableView, view: UIView, section: number) {
        let owner = this._owner.get();

    }

    public tableViewWillDisplayFooterViewForSection(tableView: UITableView, view: UIView, section: number) {
        let owner = this._owner.get();

    }

    public tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath) {
    }

    public tableViewViewForHeaderInSection(tableView: UITableView, section: number) {
        let owner = this._owner.get();

        const hv = UITableViewHeaderFooterView.new();


        return hv;
    }

    public tableViewViewForFooterInSection(tableView: UITableView, section: number) {


        return null;
    }

}

class AccordionHeaderTap extends NSObject {
    private _owner: WeakRef<Accordion>;

    public static initWithOwner(owner: WeakRef<Accordion>): AccordionHeaderTap {
        let tap: AccordionHeaderTap = new AccordionHeaderTap();
        tap._owner = owner;
        return tap;
    }

    tap(args) {
        let owner = this._owner.get();
        let current = args.view.tag;
        const reloadSection = (index: number) => {
            let section = NSMutableIndexSet.alloc().initWithIndex(index);
            owner.ios.reloadSectionsWithRowAnimation(section, UITableViewRowAnimation.Automatic);
        }
        /**
         *  Checks the allowMultiple property
         */
        if (owner.allowMultiple) {
            /**
             * Checks if the current tapped header is expanded
             * If expanded close item then remove  item from the indexSet
             */
            if (!owner._expandedViews.get(current)) {
                owner.groupExpanded(current);
                owner._expandedViews.set(current, true);
                owner._indexSet.addIndex(current);
            } else {
                owner._expandedViews.set(current, false);
                owner._indexSet.removeIndex(current);
                owner.groupCollapsed(current);
            }
            /**
             * Call reload to expand or collapse section
             */
            // owner.ios.reloadData();
            reloadSection(current);
        } else {

            /**
             * Check if the view tapped is currently opened
             */
            if (!owner._expandedViews.get(current)) {

                /**
                 * Check if indexSet has more items
                 */
                if (owner._indexSet.count > 0) {
                    const previous = owner._indexSet.firstIndex;
                    owner._expandedViews.set(previous, false);
                    owner.groupCollapsed(previous);
                    owner._indexSet.removeAllIndexes();

                    /**
                     * Call reload to collapse section
                     */
                    // owner.ios.reloadData();
                    reloadSection(previous);
                    owner._selectedIndexesUpdatedFromNative(current);
                    owner._expandedViews.set(current, true);
                    owner._indexSet.addIndex(current);
                    owner.groupExpanded(current);

                } else {
                    owner._selectedIndexesUpdatedFromNative(current);
                    owner._expandedViews.set(current, true);
                    owner._indexSet.addIndex(current);
                    owner.groupExpanded(current);
                }

                /**
                 * Call reload to expand section
                 */

                // owner.ios.reloadData();
                reloadSection(current);

            } else {
                owner._selectedIndexesUpdatedFromNative(current);
                owner._expandedViews.set(current, false);
                owner._indexSet.removeIndex(current);
                owner.groupCollapsed(current);
                /**
                 * Call reload to collapse section
                 */
                // owner.ios.reloadData();
                reloadSection(current);
            }

        }

    }

    public static ObjCExposedMethods = {
        'tap': {returns: interop.types.void, params: [interop.types.id]}
    };
}
