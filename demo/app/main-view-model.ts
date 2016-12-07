import {Observable} from "data/observable";
import {Accordion} from "nativescript-accordion";

export class HelloWorldModel extends Observable {
  public message: string;
  private accordion: Accordion;
  isExpanded:boolean = false;
  constructor() {
    super();
  }
}