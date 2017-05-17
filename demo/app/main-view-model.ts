import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class HelloWorldModel extends Observable {
  public message: string;
  public items: ObservableArray<any>;
  constructor() {
    super();
    this.items = new ObservableArray([
      { title: "1", footer: "10", headerText: "First", footerText: "4", items: [{ image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png", text: "Stop" }, { text: "Drop", image: "http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg" }] },
      { title: "2", footer: "20", headerText: "Second", footerText: "5", items: [{ text: "Drop", image: "https://i.annihil.us/u/prod/marvel//universe3zx/images/d/d9/Ironfist02.jpg" }, { text: "Drop", image: "~/images/f29.png" }] },
      { title: "3", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "Drop", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] }
    ]);
  }
}