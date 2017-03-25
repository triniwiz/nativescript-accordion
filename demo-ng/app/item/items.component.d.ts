import { OnInit } from "@angular/core";
import { ItemService } from "./item.service";
export declare class ItemsComponent implements OnInit {
    private itemService;
    items: any[];
    constructor(itemService: ItemService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    itemLoaded(item: any, index: any): void;
}
