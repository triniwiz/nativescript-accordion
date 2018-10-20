import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'ac-main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    public items: any[];
    public selectedIndexes = [0, 1];
    constructor(private router: Router) {

    }

    goToMulti() {
        this.router.navigate(['multi']);
    }

    ngOnInit(): void {
        this.items = [
            {
                title: '1',
                footer: '10',
                headerText: 'First',
                footerText: '4',
                image: 'http://placehold.it/120x120&text=First',
                items: [{image: '~/images/a9ff17db85f8136619feb0d5a200c0e4.png', text: 'Stop'}, {
                    text: 'Drop',
                    image: '~/images/shazam.jpg'
                }]
            },
            {
                title: '2',
                footer: '20',
                headerText: 'Second',
                footerText: '5',
                image: 'http://placehold.it/120x120&text=Second',
                items: [{
                    text: 'Drop',
                    image: '~/images/batman.jpg'
                }, {text: 'Drop', image: '~/images/f29.png'}]
            },
            {
                title: '3',
                footer: '30',
                headerText: 'Third',
                footerText: '6',
                image: 'http://placehold.it/120x120&text=Third',
                items: [{text: 'Drop', image: '~/images/strider.png'}, {
                    text: 'Drop',
                    image: '~/images/f29.png'
                }]
            }
        ];
    }

}