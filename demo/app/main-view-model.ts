import {Observable} from "data/observable";
import {Accordion} from "nativescript-accordion";

export class HelloWorldModel extends Observable {
  public message: string;
  private accordion: Accordion;

  constructor() {
    super();
  }
}