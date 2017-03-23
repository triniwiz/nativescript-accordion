import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: any[];

    constructor(private itemService: ItemService) {
        this.items = [
            { title: "1", footer: "10", headerText: "First", footerText: "4", items: [{ image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png", text: "Stop" }, { text: "Drop", image: "http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg" }] },
            { title: "2", footer: "20", headerText: "Second", footerText: "5", items: [{ text: "Drop", image: "https://i.annihil.us/u/prod/marvel//universe3zx/images/d/d9/Ironfist02.jpg" }, { text: "Drop", image: "~/images/f29.png" }] },
            { title: "3", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "Drop", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] }
        ]
    }

    ngOnInit(): void {

    }
}
