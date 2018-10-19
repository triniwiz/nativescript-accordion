import { View } from 'tns-core-modules/ui/core/view';
import { AccordionBase } from './accordion.common';
export declare class Accordion extends AccordionBase {
    constructor();
    expandAll(): void;
    collapseAll(): void;
    createNativeView(): any;
    initNativeView(): void;
    disposeNativeView(): void;
    eachChildView(callback: (child: View) => boolean): void;
    refresh(): void;
    updateNativeIndexes(oldIndexes: any, newIndexes: any): void;
    updateNativeItems(oldItems: any, newItems: any): void;
    _selectedIndexUpdatedFromNative(newIndex: number[]): void;
    itemExpanded(index: number): void;
    itemCollapsed(index: number): void;
    expandItem(id: number): void;
    collapseItem(id: number): void;
    itemIsExpanded(id: number): boolean;
}
