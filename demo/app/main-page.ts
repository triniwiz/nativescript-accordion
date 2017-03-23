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

export function addItem() {

    const sl = new StackLayout();
    sl.headerText = "New";
    sl.headerColor = "brown";
    const img = new Image();
    img.src = "~/images/a9ff17db85f8136619feb0d5a200c0e4.png";
    const btn = new Button();
    btn.text = "Nice!!";
    sl.addChild(btn);
    sl.addChild(img);
    page.getViewById("ac").addItem(sl);




}

export function toggle(args) {
    const view = args.object.parent;
    const parent = view.parent;
    /*   if(!view.get("isExpanded")){
           view.set("oldHeight",view.getChildAt(1).ios.frame.size.height);
           view.set("isExpanded",true);
           view.getChildAt(0).ios.layer.zPosition = 1;
           view.getChildAt(1).animate({
               translate:{x:0,y:- view.get("oldHeight")},
               duration: 500,
           }).then(()=>{
               view.getChildAt(1).height = 0;
               view.getChildAt(0).ios.layer.zPosition = 0;
           });
   
   
               view.parent._eachChildView((child)=>{
                   if(child._domId > view._domId){
                       child.animate({
                           translate:{x:0,y: - view.get("oldHeight")},
                           //opacity:0,
                           duration: 500,
                       })
                   }
               });
   
   
       }else{
           view.set("isExpanded",false);
           view.getChildAt(0).ios.layer.zPosition = 1;
          view.getChildAt(1).height = view.get("oldHeight");
           view.getChildAt(1).animate({
               translate:{x:0,y:0},
               duration: 500,
           }).then(()=>{
               view.set("oldHeight",0);
           });
   
   
   
           view.parent._eachChildView((child)=>{
               if(child._domId > view._domId){
                   child.animate({
                       translate:{x:0,y: 0},
                       //opacity:0,
                       duration: 500,
                   })
               }
           });
   
   
       }*/
}

export function tapped(args){
    console.log(args)
    console.log("ta")
}