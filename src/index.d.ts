import { View } from 'tns-core-modules/ui/core/view';
import { AccordionBase } from './accordion.common';

export declare class Accordion extends AccordionBase {
    private _listAdapter;
    private _previousGroup;
    private _androidViewId;
    _realizedItems: Map<any, View>;
    _realizedHeaderTemplates: Map<string, Map<any, View>>;
    _realizedItemHeaderTemplates: Map<string, Map<any, View>>;
    _realizedItemContentTemplates: Map<string, Map<any, View>>;
    _realizedFooterTemplates: Map<string, Map<any, View>>;
    _itemsMap: Map<any, any>;
    _headerMap: Map<any, any>;
    _footerMap: Map<any, any>;
    _expandedViews: Map<any, any>;

    expandAll(): void;

    readonly android: any;

    createNativeView(): any;

    initNativeView(): void;

    disposeNativeView(): void;

    eachChildView(callback: (child: View) => boolean): void;

    refresh(): void;

    updateNativeIndexes(oldIndex: number, newIndex: number): void;

    updateNativeItems(oldItems: any, newItems: any): void;

    _selectedIndexUpdatedFromNative(newIndex: number[]): void;

    groupExpanded(index: number): void;

    groupCollapsed(index: number): void;

    expandItem(id: number): void;

    isItemExpanded(id: number): boolean;

    private clearRealizedCells();
}
