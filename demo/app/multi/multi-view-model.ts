import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export class MultiViewModel extends Observable {
    public items: ObservableArray<any>;
    public selectedIndexes = [0, 2];
    public expanded: ObservableArray<number>;

    constructor() {
        super();
        this.expanded = new ObservableArray<number>();
        this.items = new ObservableArray([
            {
                title: '1',
                footer: '10',
                headerText: 'First',
                footerText: '4',
                image: 'http://placehold.it/120x120&text=First',
                children: [
                    {image: '~/images/a9ff17db85f8136619feb0d5a200c0e4.png', text: 'Someone'},
                    {
                        text: 'Help',
                        image: '~/images/svg.jpg'
                    }
                ]
            },
            {
                title: '2',
                footer: '20',
                headerText: 'Second',
                footerText: '5',
                image: 'http://placehold.it/120x120&text=Second',
                children: [{
                    text: 'Me',
                    image: '~/images/shazam.jpg'
                }, {text: 'Stop', image: '~/images/f29.png'}]
            },
            {
                title: '3',
                footer: '30',
                headerText: 'Third',
                footerText: '6',
                image: 'http://placehold.it/120x120&text=Third',
                children: [{text: 'This', image: '~/images/a9ff17db85f8136619feb0d5a200c0e4.png'}, {
                    text: 'Thing',
                    image: '~/images/shazam.jpg'
                }]
            },
            {
                title: '4',
                footer: '40',
                headerText: 'Fourth',
                footerText: '7',
                image: 'http://placehold.it/120x120&text=Fourth',
                children: [{text: 'Now', image: '~/images/batman.png'}, {
                    text: 'Please',
                    image: '~/images/batman.jpg'
                }]
            }
        ]);
    }
}