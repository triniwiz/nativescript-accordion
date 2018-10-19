import { KeyedTemplate, layout, Length, View } from 'tns-core-modules/ui/core/view';
import * as common from './accordion.common';
import {
    AccordionBase,
    footerTemplatesProperty,
    headerTemplatesProperty,
    iosEstimatedRowHeightProperty,
    itemContentTemplatesProperty,
    itemHeaderTemplatesProperty,
    selectedIndexesProperty
} from './accordion.common';
import { Color } from 'tns-core-modules/color';
import * as utils from 'tns-core-modules/utils/utils';
import { profile } from 'tns-core-modules/profiling';
import { fromObject, Observable } from 'tns-core-modules/data/observable';
import { ProxyViewContainer } from 'tns-core-modules/ui/proxy-view-container';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';

export const ITEMTAP = 'itemTap';
const NG_VIEW = '_ngViewRef';

global.moduleMerge(common, exports);
const DEFAULT_HEIGHT: number = 44;
const infinity = utils.layout.makeMeasureSpec(0, utils.layout.UNSPECIFIED);
const majorVersion = utils.ios.MajorVersion;

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
const AccordionViewHeaderCellReuseIdentifier = 'AccordionHeaderCellReuseIdentifier';
const AccordionViewFooterCellReuseIdentifier = 'AccordionFooterCellReuseIdentifier';
const DefaultAccordionHeaderViewHeight = 44.0;
const AccordionHeaderViewReuseIdentifier = 'AccordionHeaderViewReuseIdentifier';
const AccordionFooterViewReuseIdentifier = 'AccordionFooterViewReuseIdentifier';


interface ChildItemIndex {
    _accordionChildItemIndex?: number;
}

interface ItemIndex {
    _accordionItemIndex?: number;
}

type ChildItemView = View & ChildItemIndex;

type ItemView = View & ItemIndex;

export class Accordion extends AccordionBase {
    private _preparingCell: boolean;
    _isDataDirty: boolean;

    public updateNativeItems(oldItems: any, newItems: any) {
        this._ios.reloadData();
    }

    _expandedViews: Map<any, any>;
    _indexSet: NSMutableIndexSet;

    private _itemContentHeights: Array<number>;
    private _itemHeaderHeights: Array<number>;
    private _headerHeights: Array<number>;
    private _footerHeights: Array<number>;
    private _ios: UITableView;
    private _accordion;
    public widthMeasureSpec: number;
    public heightMeasureSpec: number;
    nativeViewProtected: UITableView;
    _dataSource: AccordionDataSource;
    _delegate;
    private _map: Map<AccordionCell, ChildItemView>;
    private _mapItemHeader: Map<AccordionHeader, ItemView>;
    private _mapItemContent: Map<AccordionCell, ChildItemView>;
    private _mapHeader: Map<AccordionHeader, ItemView>;
    private _mapFooter: Map<AccordionHeader, ItemView>;

    constructor() {
        super();
        this._itemContentHeights = [];
        this._itemHeaderHeights = [];
        this._headerHeights = [];
        this._footerHeights = [];
        this._map = new Map<AccordionCell, ChildItemView>();
        this._mapItemContent = new Map<AccordionCell, ChildItemView>();
        this._mapItemHeader = new Map<AccordionHeader, ItemView>();
        this._mapHeader = new Map<AccordionHeader, ItemView>();
        this._mapFooter = new Map<AccordionHeader, ItemView>();
    }


    public createNativeView() {
        return UITableView.new();
    }

    public initNativeView() {
        super.initNativeView();
        const nativeView = this.nativeViewProtected;
        nativeView.registerClassForCellReuseIdentifier(AccordionCell.class(), AccordionViewCellReuseIdentifier);
        nativeView.registerClassForCellReuseIdentifier(AccordionHeaderCell.class(), AccordionViewHeaderCellReuseIdentifier);
        nativeView.registerClassForCellReuseIdentifier(AccordionFooterCell.class(), AccordionViewFooterCellReuseIdentifier);
        nativeView.registerClassForHeaderFooterViewReuseIdentifier(AccordionHeader.class(), AccordionHeaderViewReuseIdentifier);
        nativeView.autoresizingMask = UIViewAutoresizing.None;
        nativeView.estimatedRowHeight = DEFAULT_HEIGHT;
        nativeView.rowHeight = UITableViewAutomaticDimension;
        if (this.separatorColor) {
            this.ios.separatorColor = new Color(this.separatorColor).ios;
        }
        this._dataSource = AccordionDataSource.initWithOwner(new WeakRef(this));
        this._delegate = UITableViewDelegateImpl.initWithOwner(new WeakRef(this));
        this._setNativeClipToBounds();
        this._expandedViews = new Map();
        this._indexSet = NSMutableIndexSet.alloc().init();
    }


    @profile
    public onLoaded() {
        super.onLoaded();
        if (this._isDataDirty) {
            this.requestLayout();
            this.refresh();
        }
        this.ios.dataSource = this._dataSource;
        this.ios.delegate = this._delegate;
    }

    public onUnloaded() {
        this.ios.delegate = null;
        super.onUnloaded();
    }


    public getItemHeaderHeight(index: number): number {
        return this._itemHeaderHeights[index];
    }

    public setItemHeaderHeight(index: number, value: number): void {
        this._itemHeaderHeights[index] = value;
    }

    public getItemContentHeight(index: number): number {
        return this._itemContentHeights[index];
    }

    public setItemContentHeight(index: number, value: number): void {
        this._itemContentHeights[index] = value;
    }


    public getHeaderHeight(index: number): number {
        return this._headerHeights[index];
    }

    public setHeaderHeight(index: number, value: number): void {
        this._headerHeights[index] = value;
    }

    public getFooterHeight(index: number): number {
        return this._footerHeights[index];
    }

    public setFooterHeight(index: number, value: number): void {
        this._footerHeights[index] = value;
    }


    public disposeNativeView() {
        this.ios.delegate = null;
        if (this._indexSet) {
            this._indexSet.removeAllIndexes();
        }
    }

    _setNativeClipToBounds() {
        this.ios.clipsToBounds = true;
    }

    get ios() {
        return this.nativeViewProtected;
    }

    public refresh() {
        // clear bindingContext when it is not observable because otherwise bindings to items won't reevaluate
        this._map.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });

        this._mapItemContent.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });

        this._mapItemHeader.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });
        this._mapHeader.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });

        this._mapFooter.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });

        if (this.isLoaded) {
            this.ios.reloadData();
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
        if (this.ios) {
            this.ios.scrollToRowAtIndexPathAtScrollPositionAnimated(NSIndexPath.indexPathForItemInSection(index, 0),
                UITableViewScrollPosition.Top, false);
        }
    }

    public requestLayout(): void {
        // When preparing cell don't call super - no need to invalidate our measure when cell desiredSize is changed.
        if (!this._preparingCell) {
            super.requestLayout();
        }
    }

    public measure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        this.widthMeasureSpec = widthMeasureSpec;
        // @ts-ignore
        let changed = this._setCurrentMeasureSpecs(widthMeasureSpec, heightMeasureSpec);
        super.measure(widthMeasureSpec, heightMeasureSpec);
        if (changed) {
            this.ios.reloadData();
        }
    }

    public onLayout(left: number, top: number, right: number, bottom: number): void {
        super.onLayout(left, top, right, bottom);
        this._map.forEach((childView, accordionCell) => {
            let rowHeight = this._effectiveRowHeight;
            let cellHeight = rowHeight > 0 ? rowHeight : this.getItemContentHeight(childView._accordionChildItemIndex);
            if (cellHeight) {
                let width = layout.getMeasureSpecSize(this.widthMeasureSpec);
                View.layoutChild(this, childView, 0, 0, width, cellHeight);
            }
        });

        this._mapItemHeader.forEach((childView, accordionHeader) => {
            let rowHeight = this._effectiveRowHeight;
            let cellHeight = rowHeight > 0 ? rowHeight : this.getItemHeaderHeight(childView._accordionItemIndex);
            if (cellHeight) {
                let width = layout.getMeasureSpecSize(this.widthMeasureSpec);
                View.layoutChild(this, childView, 0, 0, width, cellHeight);
            }
        });

        this._mapHeader.forEach((childView, accordionHeaderCell) => {
            let rowHeight = this._effectiveRowHeight;
            let cellHeight = rowHeight > 0 ? rowHeight : this.getItemHeaderHeight(childView._accordionItemIndex);
            if (cellHeight) {
                let width = layout.getMeasureSpecSize(this.widthMeasureSpec);
                View.layoutChild(this, childView, 0, 0, width, cellHeight);
            }
        });


        this._mapFooter.forEach((childView, accordionFooterCell) => {
            let rowHeight = this._effectiveRowHeight;
            let cellHeight = rowHeight > 0 ? rowHeight : this.getItemHeaderHeight(childView._accordionItemIndex);
            if (cellHeight) {
                let width = layout.getMeasureSpecSize(this.widthMeasureSpec);
                View.layoutChild(this, childView, 0, 0, width, cellHeight);
            }
        });
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        this._map.forEach((childView, accordionCell) => {
            // @ts-ignore
            View.measureChild(this, childView, childView._currentWidthMeasureSpec, childView._currentHeightMeasureSpec);
        });
    }

    private _layoutHeaderCell(cellView: View, indexPath: NSIndexPath): number {
        if (cellView) {
            const rowHeight = this._effectiveRowHeight;
            const heightMeasureSpec: number = rowHeight >= 0 ? layout.makeMeasureSpec(rowHeight, layout.EXACTLY) : infinity;
            const measuredSize = View.measureChild(this, cellView, this.widthMeasureSpec, heightMeasureSpec);
            const height = measuredSize.measuredHeight;
            this.setHeaderHeight(indexPath.section, height);
            return height;
        }

        return this.ios.estimatedRowHeight;
    }

    private _layoutFooterCell(cellView: View, indexPath: NSIndexPath): number {
        if (cellView) {
            const rowHeight = this._effectiveRowHeight;
            const heightMeasureSpec: number = rowHeight >= 0 ? layout.makeMeasureSpec(rowHeight, layout.EXACTLY) : infinity;
            const measuredSize = View.measureChild(this, cellView, this.widthMeasureSpec, heightMeasureSpec);
            const height = measuredSize.measuredHeight;
            this.setFooterHeight(indexPath.section, height);
            return height;
        }

        return this.ios.estimatedRowHeight;
    }

    private _layoutCell(cellView: View, indexPath: NSIndexPath): number {
        if (cellView) {
            const rowHeight = this._effectiveRowHeight;
            const heightMeasureSpec: number = rowHeight >= 0 ? layout.makeMeasureSpec(rowHeight, layout.EXACTLY) : infinity;
            const measuredSize = View.measureChild(this, cellView, this.widthMeasureSpec, heightMeasureSpec);
            const height = measuredSize.measuredHeight;
            this.setItemContentHeight(parseInt(`${indexPath.section + 1 }${indexPath.row}`), height);
            return height;
        }

        return this.ios.estimatedRowHeight;
    }

    private _layoutHeader(cellView: View, section: number): number {
        if (cellView) {
            const rowHeight = this._effectiveRowHeight;
            const heightMeasureSpec: number = rowHeight >= 0 ? layout.makeMeasureSpec(rowHeight, layout.EXACTLY) : infinity;
            const measuredSize = View.measureChild(this, cellView, this.widthMeasureSpec, heightMeasureSpec);
            const height = measuredSize.measuredHeight;
            this.setItemHeaderHeight(section, height);
            return height;
        }

        return this.ios.estimatedRowHeight;
    }

    public _prepareCell(cell: AccordionCell, indexPath: NSIndexPath): number {
        let cellHeight: number;
        try {
            this._preparingCell = true;
            let view: ChildItemView = cell.view;
            if (!view) {
                view = this._getItemContentTemplate(indexPath.section, indexPath.row).createView();
            }

            let args = notifyForItemAtIndex(this, cell, view, AccordionBase.itemContentLoadingEvent, indexPath);
            view = args.view || this._getDefaultItemContentContent(indexPath.section, indexPath.row);

            // Proxy containers should not get treated as layouts.
            // Wrap them in a real layout as well.
            if (view instanceof ProxyViewContainer) {
                let sp = new StackLayout();
                sp.addChild(view);
                view = sp;
            }

            // If cell is reused it have old content - remove it first.
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            } else if (cell.view !== view) {
                this._removeContainer(cell);
                (<UIView>cell.view.nativeViewProtected).removeFromSuperview();
                cell.owner = new WeakRef(view);
            }

            this._prepareItemContent(view, indexPath.section, indexPath.row);
            view._accordionChildItemIndex = indexPath.section;
            this._map.set(cell, view);

            // We expect that views returned from itemLoading are new (e.g. not reused).
            if (view && !view.parent) {
                this._addView(view);
                cell.contentView.addSubview(view.nativeViewProtected);
            }

            cellHeight = this._layoutCell(view, indexPath);
        } finally {
            this._preparingCell = false;
        }
        return cellHeight;
    }

    public _prepareItemHeaderView(header: AccordionHeader, section: number): number {
        let headerHeight: number;
        try {
            // this._preparingCell = true;
            let view: ItemView = header.view;
            if (!view) {
                view = this._getItemHeaderTemplate(section).createView();
            }

            let args = notifyForHeaderOrFooterAtIndex(this, header, view, AccordionBase.itemHeaderLoadingEvent, section);
            view = args.view || this._getDefaultItemHeaderContent(section);

            // Proxy containers should not get treated as layouts.
            // Wrap them in a real layout as well.
            if (view instanceof ProxyViewContainer) {
                let sp = new StackLayout();
                sp.addChild(view);
                view = sp;
            }

            // If cell is reused it have old content - remove it first.
            if (!header.view) {
                header.owner = new WeakRef(view);
            } else if (header.view !== view) {
                this._removeHeaderContainer(header);
                (<UIView>header.view.nativeViewProtected).removeFromSuperview();
                header.owner = new WeakRef(view);
            }

            this._prepareItemHeader(view, section);
            view._accordionItemIndex = section;
            this._mapItemHeader.set(header, view);

            // We expect that views returned from itemLoading are new (e.g. not reused).
            if (view && !view.parent) {
                this._addView(view);
                header.contentView.addSubview(view.nativeViewProtected);
            }

            headerHeight = this._layoutHeader(view, section);
        } finally {
            this._preparingCell = false;
        }
        return headerHeight;
    }

    public _prepareHeaderCell(cell: AccordionHeaderCell, indexPath: NSIndexPath): number {
        let cellHeight: number;
        try {
            this._preparingCell = true;
            let view: ChildItemView = cell.view;
            if (!view) {
                view = this._getHeaderTemplate(indexPath.section).createView();
            }

            let args = notifyForItemAtIndex(this, cell, view, AccordionBase.footerLoadingEvent, indexPath);
            view = args.view || this._getDefaultHeaderContent(indexPath.row);

            // Proxy containers should not get treated as layouts.
            // Wrap them in a real layout as well.
            if (view instanceof ProxyViewContainer) {
                let sp = new StackLayout();
                sp.addChild(view);
                view = sp;
            }

            // If cell is reused it have old content - remove it first.
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            } else if (cell.view !== view) {
                this._removeContainer(cell);
                (<UIView>cell.view.nativeViewProtected).removeFromSuperview();
                cell.owner = new WeakRef(view);
            }

            this._prepareItemHeader(view, indexPath.section);
            view._accordionChildItemIndex = indexPath.section;
            this._map.set(cell, view);

            // We expect that views returned from itemLoading are new (e.g. not reused).
            if (view && !view.parent) {
                this._addView(view);
                cell.contentView.addSubview(view.nativeViewProtected);
            }

            cellHeight = this._layoutHeaderCell(view, indexPath);
        } finally {
            this._preparingCell = false;
        }
        return cellHeight;
    }

    public _prepareFooterCell(cell: AccordionFooterCell, indexPath: NSIndexPath): number {
        let cellHeight: number;
        try {
            this._preparingCell = true;
            let view: ChildItemView = cell.view;
            if (!view) {
                view = this._getFooterTemplate(indexPath.section).createView();
            }

            let args = notifyForItemAtIndex(this, cell, view, AccordionBase.headerLoadingEvent, indexPath);
            view = args.view || this._getDefaultFooterContent(indexPath.section);

            // Proxy containers should not get treated as layouts.
            // Wrap them in a real layout as well.
            if (view instanceof ProxyViewContainer) {
                let sp = new StackLayout();
                sp.addChild(view);
                view = sp;
            }

            // If cell is reused it have old content - remove it first.
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            } else if (cell.view !== view) {
                this._removeContainer(cell);
                (<UIView>cell.view.nativeViewProtected).removeFromSuperview();
                cell.owner = new WeakRef(view);
            }

            this._prepareFooterItem(view, indexPath.section);
            view._accordionChildItemIndex = indexPath.section;
            this._map.set(cell, view);

            // We expect that views returned from itemLoading are new (e.g. not reused).
            if (view && !view.parent) {
                this._addView(view);
                cell.contentView.addSubview(view.nativeViewProtected);
            }

            cellHeight = this._layoutFooterCell(view, indexPath);
        } finally {
            this._preparingCell = false;
        }
        return cellHeight;
    }

    public _removeHeaderContainer(header: AccordionHeader): void {
        let view: ItemView = header.view;
        // This is to clear the StackLayout that is used to wrap ProxyViewContainer instances.
        if (!(view.parent instanceof Accordion)) {
            this._removeView(view.parent);
        }

        // No need to request layout when we are removing cells.
        const preparing = this._preparingCell;
        this._preparingCell = true;
        view.parent._removeView(view);
        view._accordionItemIndex = undefined;
        this._preparingCell = preparing;
        this._mapItemHeader.delete(header);
    }

    public _removeContainer(cell: AccordionCell): void {
        let view: ChildItemView = cell.view;
        // This is to clear the StackLayout that is used to wrap ProxyViewContainer instances.
        if (!(view.parent instanceof Accordion)) {
            this._removeView(view.parent);
        }

        // No need to request layout when we are removing cells.
        const preparing = this._preparingCell;
        this._preparingCell = true;
        view.parent._removeView(view);
        view._accordionChildItemIndex = undefined;
        this._preparingCell = preparing;
        this._map.delete(cell);
    }

    get _childrenCount(): number {
        return this._map.size;
    }

    public eachChildView(callback: (child: View) => boolean): void {
        this._map.forEach((view, key) => {
            callback(view);
        });
    }

    updateNativeIndexes(oldIndexes: any, newIndexes: any) {
        const allowMultiple = String(this.allowMultiple) === 'true';
        if (allowMultiple) {
            newIndexes.forEach(index => {
                if (!this._expandedViews.get(index)) {
                    this._expandedViews.set(index, true);
                    this._indexSet.addIndex(index);
                }
            });
            this.ios.reloadData();
        } else {
            if (newIndexes.length > 0) {
                const index = newIndexes.length - 1;
                const newItems = [index];
                this._expandedViews.clear();
                this._indexSet.removeAllIndexes();
                if (!this._expandedViews.get(index)) {
                    this._expandedViews.set(index, true);
                    this._indexSet.addIndex(index);
                    this.ios.reloadData();
                }
            }
        }

    }

    expandAll(): void {
        const length = this.items ? this.items.length : 0;
        const allowMultiple = String(this.allowMultiple) === 'true';
        if (!allowMultiple) {
            this._expandedViews.clear();
            this._indexSet.removeAllIndexes();
            this._expandedViews.set(length - 1, true);
            this._indexSet.addIndex(length - 1);
            this.ios.reloadData();
            return;
        }
        for (let i = 0; i < length; i++) {
            this._expandedViews.set(i, true);
            this._indexSet.addIndex(0);
        }
        this.ios.reloadData();
    }

    collapseAll(): void {
        this._expandedViews.clear();
        this._indexSet.removeAllIndexes();
        this.ios.reloadData();
    }

    collapseItem(index: number) {
        if (this._expandedViews.has(index)) {
            this._expandedViews.delete(index);
            this._indexSet.removeIndex(index);
            this.ios.reloadData();
        }
    }

    expandItem(index: number) {
        const reloadSection = (index: number) => {
            let section = NSMutableIndexSet.alloc().initWithIndex(index);
            this.ios.reloadSectionsWithRowAnimation(section, UITableViewRowAnimation.Automatic);
        };

        const removeSection = (index: number) => {
            let section = NSMutableIndexSet.alloc().initWithIndex(index);
            this.ios.reloadSectionsWithRowAnimation(section, UITableViewRowAnimation.Bottom);
        };
        const allowMultiple = String(this.allowMultiple) === 'true';

        if (allowMultiple) {
            if (!this._expandedViews.get(index)) {
                this.itemExpanded(index);
                this._expandedViews.set(index, true);
                this._indexSet.addIndex(index);
            } else {
                this._expandedViews.set(index, false);
                this._indexSet.removeIndex(index);
                this.itemCollapsed(index);
            }
            reloadSection(index);
            this._selectedIndexesUpdatedFromNative(Array.from(this._expandedViews.keys()));
        } else {

            if (this._expandedViews.has(index)) {
                this._expandedViews.delete(index);
                this._indexSet.removeIndex(index);
                this.itemCollapsed(index);
                reloadSection(index);
            } else if (this._expandedViews.size > 0) {
                const old = this._expandedViews.keys().next().value;
                this._expandedViews.delete(old);
                this._indexSet.removeIndex(old);
                reloadSection(old);
                this.itemCollapsed(old);
                this._expandedViews.set(index, true);
                this._indexSet.addIndex(index);
                reloadSection(index);
                this.itemExpanded(index);
            } else {
                this._expandedViews.set(index, true);
                this._indexSet.addIndex(index);
                this.itemExpanded(index);
                reloadSection(index);
            }
            this._selectedIndexesUpdatedFromNative(Array.from(this._expandedViews.keys()));
        }
    }

    itemIsExpanded(index: number): boolean {
        if (this._expandedViews.has(index)) {
            return this._expandedViews.get(index);
        }
        return false;
    }

    itemExpanded(index: number) {
        this.notify({
            eventName: 'itemExpanded',
            object: fromObject({
                value: index
            })
        });
    }

    itemCollapsed(index: number) {
        this.notify({
            eventName: 'itemCollapsed',
            object: fromObject({
                value: index
            })
        });
    }

    public _onRowHeightPropertyChanged(oldValue: Length, newValue: Length) {
        const value = layout.toDeviceIndependentPixels(this._effectiveRowHeight);
        const nativeView = this.ios;

        if (value < 0) {
            nativeView.rowHeight = UITableViewAutomaticDimension;
            nativeView.estimatedRowHeight = DEFAULT_HEIGHT;
            this._delegate = UITableViewDelegateImpl.initWithOwner(new WeakRef(this));
        }
        else {
            nativeView.rowHeight = value;
            nativeView.estimatedRowHeight = value;
            this._delegate = UITableViewRowHeightDelegateImpl.initWithOwner(new WeakRef(this));
        }

        if (this.isLoaded) {
            nativeView.delegate = this._delegate;
        }

        super._onRowHeightPropertyChanged(oldValue, newValue);
    }

    [itemHeaderTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }

    [itemHeaderTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._itemHeaderTemplatesInternal = new Array<KeyedTemplate>(this._defaultItemHeaderTemplate);
        if (value) {
            for (let i = 0, length = value.length; i < length; i++) {
                this.ios.registerClassForHeaderFooterViewReuseIdentifier(AccordionHeader.class(), `item-header-${value[i].key}`);
            }
            this._itemHeaderTemplatesInternal = this._itemHeaderTemplatesInternal.concat(value);
        }

        this.refresh();
    }


    [itemContentTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }

    [itemContentTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._itemContentTemplatesInternal = new Array<KeyedTemplate>(this._defaultItemContentTemplate);
        if (value) {
            for (let i = 0, length = value.length; i < length; i++) {
                this.ios.registerClassForCellReuseIdentifier(AccordionCell.class(), `item-content-${value[i].key}`);
            }
            this._itemContentTemplatesInternal = this._itemContentTemplatesInternal.concat(value);
        }

        this.refresh();
    }


    [footerTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }

    [footerTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._footerTemplatesInternal = new Array<KeyedTemplate>(this._defaultFooterTemplate);
        if (value) {
            for (let i = 0, length = value.length; i < length; i++) {
                this.ios.registerClassForCellReuseIdentifier(AccordionFooterCell.class(), `footer-${value[i].key}`);
            }
            this._footerTemplatesInternal = this._footerTemplatesInternal.concat(value);
        }

        this.refresh();
    }


    [headerTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }

    [headerTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._headerTemplatesInternal = new Array<KeyedTemplate>(this._defaultHeaderTemplate);
        if (value) {
            for (let i = 0, length = value.length; i < length; i++) {
                this.ios.registerClassForCellReuseIdentifier(AccordionHeaderCell.class(), `header-${value[i].key}`);
            }
            this._headerTemplatesInternal = this._headerTemplatesInternal.concat(value);
        }

        this.refresh();
    }


    [iosEstimatedRowHeightProperty.getDefault](): Length {
        return DEFAULT_HEIGHT;
    }

    [iosEstimatedRowHeightProperty.setNative](value: Length) {
        const nativeView = this.ios;
        const estimatedHeight = Length.toDevicePixels(value, 0);
        nativeView.estimatedRowHeight = estimatedHeight < 0 ? DEFAULT_HEIGHT : estimatedHeight;
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

        const data = owner._getParentData(current);
        let _args = {
            eventName: AccordionBase.itemHeaderTapEvent,
            data: data,
            object: owner,
            parentIndex: current,
            view: null,
            ios: args.view,
            android: undefined
        };
        owner.notify(_args);

        const reloadSection = (index: number) => {
            let section = NSMutableIndexSet.alloc().initWithIndex(index);
            owner.ios.reloadSectionsWithRowAnimation(section, UITableViewRowAnimation.Automatic);
        };

        const removeSection = (index: number) => {
            let section = NSMutableIndexSet.alloc().initWithIndex(index);
            owner.ios.reloadSectionsWithRowAnimation(section, UITableViewRowAnimation.Bottom);
        };
        const allowMultiple = String(owner.allowMultiple) === 'true';


        /**
         *  Checks the allowMultiple property
         */
        if (allowMultiple) {
            /**
             * Checks if the current tapped header is expanded
             * If expanded close item then remove  item from the indexSet
             */
            if (!owner._expandedViews.get(current)) {
                owner.itemExpanded(current);
                owner._expandedViews.set(current, true);
                owner._indexSet.addIndex(current);
            } else {
                owner._expandedViews.set(current, false);
                owner._indexSet.removeIndex(current);
                owner.itemCollapsed(current);
            }
            /**
             * Call reload to expand or collapse section
             */
            // owner.ios.reloadData();
            reloadSection(current);
            owner._selectedIndexesUpdatedFromNative(Array.from(owner._expandedViews.keys()));
        } else {

            if (owner._expandedViews.has(current)) {
                owner._expandedViews.delete(current);
                owner._indexSet.removeIndex(current);
                owner.itemCollapsed(current);
                reloadSection(current);
            } else if (owner._expandedViews.size > 0) {
                const old = owner._expandedViews.keys().next().value;
                owner._expandedViews.delete(old);
                owner._indexSet.removeIndex(old);
                reloadSection(old);
                owner.itemCollapsed(old);
                owner._expandedViews.set(current, true);
                owner._indexSet.addIndex(current);
                reloadSection(current);
                owner.itemExpanded(current);
            } else {
                owner._expandedViews.set(current, true);
                owner._indexSet.addIndex(current);
                owner.itemExpanded(current);
                reloadSection(current);
            }
            owner._selectedIndexesUpdatedFromNative(Array.from(owner._expandedViews.keys()));

            /**
             * Call reload to collapse section
             */
            // owner.ios.reloadData();


        }

    }

    public static ObjCExposedMethods = {
        'tap': {returns: interop.types.void, params: [interop.types.id]}
    };
}

export class AccordionHeader extends UITableViewHeaderFooterView {
    public owner: WeakRef<any>;

    get view() {
        return this.owner ? this.owner.get() : null;
    }
}

export class AccordionCell extends UITableViewCell {
    public static initWithEmptyBackground(): AccordionCell {
        const cell = <AccordionCell>AccordionCell.new();
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    }

    initWithStyleReuseIdentifier(style: UITableViewCellStyle, reuseIdentifier: string): this {
        const cell = <this>super.initWithStyleReuseIdentifier(style, reuseIdentifier);
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    }

    public willMoveToSuperview(newSuperview: UIView): void {
        let parent = <Accordion>(this.view ? this.view.parent : null);

        // When inside ListView and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        if (parent && !newSuperview) {
            parent._removeContainer(this);
        }
    }

    public get view(): View {
        return this.owner ? this.owner.get() : null;
    }

    public owner: WeakRef<View>;
}

export class AccordionHeaderCell extends UITableViewCell {
    public static initWithEmptyBackground(): AccordionCell {
        const cell = <AccordionCell>AccordionCell.new();
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    }

    initWithStyleReuseIdentifier(style: UITableViewCellStyle, reuseIdentifier: string): this {
        const cell = <this>super.initWithStyleReuseIdentifier(style, reuseIdentifier);
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    }

    public willMoveToSuperview(newSuperview: UIView): void {
        let parent = <Accordion>(this.view ? this.view.parent : null);

        // When inside ListView and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        if (parent && !newSuperview) {
            parent._removeContainer(this);
        }
    }

    public get view(): View {
        return this.owner ? this.owner.get() : null;
    }

    public owner: WeakRef<View>;
}

export class AccordionFooterCell extends UITableViewCell {
    public static initWithEmptyBackground(): AccordionCell {
        const cell = <AccordionCell>AccordionCell.new();
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    }

    initWithStyleReuseIdentifier(style: UITableViewCellStyle, reuseIdentifier: string): this {
        const cell = <this>super.initWithStyleReuseIdentifier(style, reuseIdentifier);
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    }

    public willMoveToSuperview(newSuperview: UIView): void {
        let parent = <Accordion>(this.view ? this.view.parent : null);

        // When inside ListView and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        if (parent && !newSuperview) {
            parent._removeContainer(this);
        }
    }

    public get view(): View {
        return this.owner ? this.owner.get() : null;
    }

    public owner: WeakRef<View>;
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
        if (owner._expandedViews.has(section) && owner._expandedViews.get(section)) {
            const parentData = owner && owner.items ? owner._getParentData(section) : [];
            return parentData[owner.childItems] ? (parentData[owner.childItems].length + (owner._getHasHeader() ? 1 : 0) + (owner._getHasFooter() ? 1 : 0)) : 0;
        } else {
            return 0;
        }

    }

    public numberOfSectionsInTableView(tableView) {
        let owner = this._owner.get();
        return (owner && owner.items) ? owner.items.length : 0;
    }

    public tableViewCellForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath) {
        let owner = this._owner.get();
        let cell: AccordionCell | AccordionHeaderCell | AccordionFooterCell;
        const total = this.tableViewNumberOfRowsInSection(tableView, indexPath.section);
        if (indexPath.row === 0 && owner._getHasHeader()) {
            if (owner) {
                let template = owner._getHeaderTemplate(indexPath.section);
                cell = <AccordionHeaderCell>(tableView.dequeueReusableCellWithIdentifier(`header-${template.key}`) || AccordionHeaderCell.initWithEmptyBackground());
                owner._prepareHeaderCell(cell, indexPath);

                let cellView: View = cell.view;
                if (cellView && (cellView as any).isLayoutRequired) {
                    // Arrange cell views. We do it here instead of _layoutCell because _layoutCell is called
                    // from 'tableViewHeightForRowAtIndexPath' method too (in iOS 7.1) and we don't want to arrange the fake cell.
                    let width = layout.getMeasureSpecSize(owner.widthMeasureSpec);
                    let rowHeight = owner._effectiveRowHeight;
                    let cellHeight = rowHeight > 0 ? rowHeight : owner.getHeaderHeight(indexPath.row);
                    View.layoutChild(owner, cellView, 0, 0, width, cellHeight ? cellHeight : 0);
                }
            }
            else {
                cell = <AccordionHeaderCell>AccordionHeaderCell.initWithEmptyBackground();
            }

            return cell;
        }

        if (indexPath.row === total - 1 && owner._getHasFooter()) {
            if (owner) {
                let template = owner._getFooterTemplate(indexPath.section);
                cell = <AccordionFooterCell>(tableView.dequeueReusableCellWithIdentifier(`footer-${template.key}`) || AccordionFooterCell.initWithEmptyBackground());
                owner._prepareFooterCell(cell, indexPath);

                let cellView: View = cell.view;
                if (cellView && (cellView as any).isLayoutRequired) {
                    // Arrange cell views. We do it here instead of _layoutCell because _layoutCell is called
                    // from 'tableViewHeightForRowAtIndexPath' method too (in iOS 7.1) and we don't want to arrange the fake cell.
                    let width = layout.getMeasureSpecSize(owner.widthMeasureSpec);
                    let rowHeight = owner._effectiveRowHeight;
                    let cellHeight = rowHeight > 0 ? rowHeight : owner.getFooterHeight(indexPath.row);
                    View.layoutChild(owner, cellView, 0, 0, width, cellHeight ? cellHeight : 0);
                }
            }
            else {
                cell = <AccordionFooterCell>AccordionFooterCell.initWithEmptyBackground();
            }

            return cell;
        }

        if (owner) {
            let template = owner._getItemContentTemplate(indexPath.section, indexPath.row);
            cell = <AccordionCell>(tableView.dequeueReusableCellWithIdentifier(`item-content-${template.key}`) || AccordionCell.initWithEmptyBackground());
            owner._prepareCell(cell, indexPath);

            let cellView: View = cell.view;
            if (cellView && (cellView as any).isLayoutRequired) {
                // Arrange cell views. We do it here instead of _layoutCell because _layoutCell is called
                // from 'tableViewHeightForRowAtIndexPath' method too (in iOS 7.1) and we don't want to arrange the fake cell.
                let width = layout.getMeasureSpecSize(owner.widthMeasureSpec);
                let rowHeight = owner._effectiveRowHeight;
                let cellHeight = rowHeight > 0 ? rowHeight : owner.getItemContentHeight(indexPath.row);
                View.layoutChild(owner, cellView, 0, 0, width, cellHeight ? cellHeight : 0);
            }
        }
        else {
            cell = <AccordionCell>AccordionCell.initWithEmptyBackground();
        }
        return cell;
    }

}

class UITableViewRowHeightDelegateImpl extends NSObject implements UITableViewDelegate {
    public static ObjCProtocols = [UITableViewDelegate];

    private _owner: WeakRef<Accordion>;

    public static initWithOwner(owner: WeakRef<Accordion>): UITableViewRowHeightDelegateImpl {
        let delegate = <UITableViewRowHeightDelegateImpl>UITableViewRowHeightDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    }

    public tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath) {
        let owner = this._owner.get();
        if (owner && (indexPath.row === owner.items.length - 1)) {
            owner.notify({eventName: Accordion.loadMoreItemsEvent, object: owner});
        }
    }

    public tableViewWillSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath {
        let cell = <AccordionCell>tableView.cellForRowAtIndexPath(indexPath);
        let owner = this._owner.get();
        if (owner) {
            notifyForItemAtIndex(owner, cell, cell.view, ITEMTAP, indexPath);
        }
        return indexPath;
    }

    public tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath {
        tableView.deselectRowAtIndexPathAnimated(indexPath, true);

        return indexPath;
    }

    public tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number {
        let owner = this._owner.get();
        if (!owner) {
            return tableView.estimatedRowHeight;
        }

        return layout.toDeviceIndependentPixels(owner._effectiveRowHeight);
    }

    public tableViewHeightForHeaderInSection(tableView: UITableView, section: number) {
        let owner = this._owner.get();
        if (!owner) {
            return tableView.estimatedRowHeight;
        }

        return layout.toDeviceIndependentPixels(owner._effectiveRowHeight);
    }

    public tableViewHeightForFooterInSection(tableView: UITableView, section: number) {
        let owner = this._owner.get();
        if (!owner) {
            return tableView.estimatedRowHeight;
        }

        return layout.toDeviceIndependentPixels(owner._effectiveRowHeight);
    }

}

export class UITableViewDelegateImpl extends NSObject implements UITableViewDelegate {
    public static ObjCProtocols = [UITableViewDelegate];
    private _owner: WeakRef<Accordion>;

    private _measureItemHeaderMap: Map<string, AccordionHeader>;
    private _measureItemContentMap: Map<string, AccordionCell>;
    private _measureHeaderMap: Map<string, AccordionHeaderCell>;
    private _measureFooterMap: Map<string, AccordionFooterCell>;

    public static initWithOwner(owner: WeakRef<Accordion>): UITableViewDelegateImpl {
        let delegate = <UITableViewDelegateImpl>UITableViewDelegateImpl.new();
        delegate._owner = owner;
        delegate._measureItemHeaderMap = new Map<string, AccordionHeader>();
        delegate._measureItemContentMap = new Map<string, AccordionCell>();
        delegate._measureHeaderMap = new Map<string, AccordionHeaderCell>();
        delegate._measureFooterMap = new Map<string, AccordionFooterCell>();
        return delegate;
    }

    public tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath) {

        const owner = this._owner.get();
        if (!owner) {
            return tableView.estimatedRowHeight;
        }

        let height;
        const total = tableView.numberOfRowsInSection(indexPath.section);

        if (indexPath.row === 0 && owner._getHasHeader()) {
            height = owner.getHeaderHeight(indexPath.section);
            if (height === undefined) {
                // in iOS8+ after call to scrollToRowAtIndexPath:atScrollPosition:animated: this method is called before tableViewCellForRowAtIndexPath so we need fake cell to measure its content.
                const template = owner._getHeaderTemplate(indexPath.section);
                let cell = this._measureHeaderMap.get(template.key);
                if (!cell) {
                    cell = (<any>tableView.dequeueReusableCellWithIdentifier(`header-${template.key}`)) || AccordionHeaderCell.initWithEmptyBackground();
                    this._measureHeaderMap.set(template.key, cell);
                }

                height = owner._prepareHeaderCell(cell, indexPath);
            }

            return layout.toDeviceIndependentPixels(height);
        }

        if (indexPath.row === total - 1 && owner._getHasFooter()) {
            let height = owner.getFooterHeight(indexPath.section);
            if (height === undefined) {
                // in iOS8+ after call to scrollToRowAtIndexPath:atScrollPosition:animated: this method is called before tableViewCellForRowAtIndexPath so we need fake cell to measure its content.
                const template = owner._getFooterTemplate(indexPath.section);
                let cell = this._measureFooterMap.get(template.key);
                if (!cell) {
                    cell = (<any>tableView.dequeueReusableCellWithIdentifier(`footer-${template.key}`)) || AccordionFooterCell.initWithEmptyBackground();
                    this._measureFooterMap.set(template.key, cell);
                }

                height = owner._prepareFooterCell(cell, indexPath);
            }

            return layout.toDeviceIndependentPixels(height);
        }

        height = owner.getItemContentHeight(parseInt(`${indexPath.section + 1 }${indexPath.row}`));
        if (height === undefined) {
            // in iOS8+ after call to scrollToRowAtIndexPath:atScrollPosition:animated: this method is called before tableViewCellForRowAtIndexPath so we need fake cell to measure its content.
            const template = owner._getItemContentTemplate(indexPath.section, indexPath.row);
            let cell = this._measureItemContentMap.get(template.key);
            if (!cell) {
                cell = (<any>tableView.dequeueReusableCellWithIdentifier(`item-content-${template.key}`)) || AccordionCell.initWithEmptyBackground();
                this._measureItemContentMap.set(template.key, cell);
            }

            height = owner._prepareCell(cell, indexPath);
        }

        return layout.toDeviceIndependentPixels(height);
    }

    public tableViewHeightForHeaderInSection(tableView: UITableView, section: number) {
        const owner = this._owner.get();
        if (!owner) {
            return tableView.estimatedRowHeight;
        }

        let height = owner.getItemHeaderHeight(section);
        if (height === undefined) {
            // in iOS8+ after call to scrollToRowAtIndexPath:atScrollPosition:animated: this method is called before tableViewCellForRowAtIndexPath so we need fake cell to measure its content.
            const template = owner._getItemHeaderTemplate(section);
            let header = this._measureItemHeaderMap.get(template.key);
            if (!header) {
                header = (<any>tableView.dequeueReusableHeaderFooterViewWithIdentifier(`item-header-${template.key}`)) || AccordionHeader.new();
                this._measureItemHeaderMap.set(template.key, header);
            }

            height = owner._prepareItemHeaderView(header, section);
        }

        return layout.toDeviceIndependentPixels(height);
    }

    public tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath) {
        let owner = this._owner.get();
        const data = owner._getChildData(indexPath.section, indexPath.row);
        let args = {
            eventName: AccordionBase.itemContentTapEvent,
            data: data,
            object: owner,
            childIndex: indexPath.row,
            index: indexPath.section,
            view: null,
            ios: null,
            android: undefined
        };
        owner.notify(args);
    }

    public tableViewViewForHeaderInSection(tableView: UITableView, section: number) {
        const tapGesture = UITapGestureRecognizer.alloc().initWithTargetAction(AccordionHeaderTap.initWithOwner(this._owner), 'tap');
        let owner = this._owner.get();
        let header;
        if (owner) {
            let template = owner._getItemHeaderTemplate(section);
            header = <AccordionHeader>(tableView.dequeueReusableHeaderFooterViewWithIdentifier(`item-header-${template.key}`) || AccordionHeader.new());
            owner._prepareItemHeaderView(header, section);

            let cellView: View = header.view;
            if (cellView && (cellView as any).isLayoutRequired) {
                // Arrange cell views. We do it here instead of _layoutCell because _layoutCell is called
                // from 'tableViewHeightForRowAtIndexPath' method too (in iOS 7.1) and we don't want to arrange the fake cell.
                let width = layout.getMeasureSpecSize(owner.widthMeasureSpec);
                let rowHeight = owner._effectiveRowHeight;
                let cellHeight = rowHeight > 0 ? rowHeight : owner.getItemHeaderHeight(section);
                View.layoutChild(owner, cellView, 0, 0, width, cellHeight ? cellHeight : 0);
            }
        }
        else {
            header = AccordionHeader.new();
        }
        header.addGestureRecognizer(tapGesture);
        header.tag = section;
        return header;
    }
}

