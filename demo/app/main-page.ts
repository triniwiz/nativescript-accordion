import * as observable from "data/observable";
import * as pages from "ui/page";
import { HelloWorldModel } from "./main-view-model";
import * as app from "application";
import { View } from "ui/core/view";
import * as keyFrame from "ui/animation/keyframe-animation";
let page;
import * as enums from "ui/enums";
import { Page } from "ui/page";
import { clearInterval } from "timer";
import { StackLayout } from "ui/layouts/stack-layout";
import { Image } from "ui/image";
import * as imgSrc from "image-source";
import { Color } from "color";
import { Button } from "ui/button";
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
}
