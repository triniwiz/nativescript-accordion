import * as observable from "data/observable";
import * as pages from "ui/page";
import {HelloWorldModel} from "./main-view-model";
import * as app from "application";
let page
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function toggle(args) {

const view = args.view.parent;
    if (view.isExpanded()) {
        view.collapse()
    } else {
        view.expand()
    }
}