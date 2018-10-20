import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    moduleId: module.id,
    selector: 'ac-multi',
    templateUrl: 'multi.component.html'
})

export class MultiComponent implements OnInit {
    items: any[];
    public selectedIndexes = [0, 2];
    @ViewChild('accordion') accordion: ElementRef;

    constructor(private router: RouterExtensions) {
    }

    expandAll() {
        this.accordion.nativeElement.expandAll();
    }

    collapseAll() {
        this.accordion.nativeElement.collapseAll();
    }

    public headerTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'header-odd' : 'header-even';
    }

    public itemHeaderTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'title-even' : 'title-odd';
    }

    public itemContentTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'content-even' : 'content-odd';
    }

    public footerTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'footer-even' : 'footer-odd';
    }

    goBack() {
        this.router.back();
    }

    ngOnInit(): void {
        this.items = [
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
        ];
    }

}