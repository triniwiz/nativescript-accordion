import { Component } from '@angular/core';
import { ItemService } from './item.service';

@Component({
    selector: 'ns-items',
    moduleId: module.id,
    templateUrl: './items.component.html',
})
export class ItemsComponent {
    items: any[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) {
        this.items = [
            {
                title: '1',
                footer: '10',
                headerText: 'First',
                footerText: '4',
                items: [{text: 'Yes', image: '~/images/a9ff17db85f8136619feb0d5a200c0e4.png',}, {
                    text: 'Drop',
                    image: 'http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg'
                }]
            },
            {
                title: '2',
                footer: '20',
                headerText: 'Second',
                footerText: '5',
                items: [{
                    text: 'Maybe',
                    image: 'https://i.annihil.us/u/prod/marvel//universe3zx/images/d/d9/Ironfist02.jpg'
                }, {text: 'Drop', image: '~/images/f29.png'}]
            },
            {
                title: '3',
                footer: '30',
                headerText: 'Third',
                footerText: '6',
                items: [{text: 'No', image: '~/images/a9ff17db85f8136619feb0d5a200c0e4.png'}, {
                    text: 'Drop',
                    image: '~/images/f29.png'
                }]
            }
        ];
    }
}