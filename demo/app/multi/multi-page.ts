import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { MultiViewModel } from '~/multi/multi-view-model';

let page;
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = new MultiViewModel();
    page.getViewById('accordion').on('selectedIndexesChange', onChange);
}

export function onChange(args) {
    console.log(args.object.selectedIndexes);
}

export function expandAll() {
    const accordion = page.getViewById('accordion');
    accordion.expandAll();
}

export function collapseAll() {
    const accordion = page.getViewById('accordion');
    accordion.collapseAll();
}