import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

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
            { title: "1", footer: "10", headerText: "First", footerText: "4", items: [{ text: "Yes" ,image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png", }, { text: "Drop", image: "http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg" }] },
            { title: "2", footer: "20", headerText: "Second", footerText: "5", items: [{ text: "Maybe", image: "https://i.annihil.us/u/prod/marvel//universe3zx/images/d/d9/Ironfist02.jpg" }, { text: "Drop", image: "~/images/f29.png" }] },
            { title: "3", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] }
        ]
    }

    ngOnInit(): void {
        // setTimeout(()=>{
        //     this.items.push(
        //         { title: "31", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "30", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "32", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "33", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "34", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "35", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "36", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "37", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "38", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "39", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "40", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "41", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "42", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] },
        //         { title: "43", footer: "30", headerText: "Third", footerText: "6", items: [{ text: "No", image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png" }, { text: "Drop", image: "~/images/f29.png" }] }
        //         )
        // },1000)
    }
    ngAfterViewInit() {
    }
}
