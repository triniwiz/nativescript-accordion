[![npm](https://img.shields.io/npm/v/nativescript-accordion.svg)](https://www.npmjs.com/package/nativescript-accordion)
[![npm](https://img.shields.io/npm/dt/nativescript-accordion.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-accordion)

# NativeScript Accordion

[![Buy Me A Beer](https://img.shields.io/badge/Buy%20Me%20A%20Beer-PayPal-brightgreen.svg)](https://www.paypal.me/triniwiz)

## Install
`tns plugin add nativescript-accordion`

## Usage

IMPORTANT: Make sure you include xmlns:accordion="nativescript-accordion" on the Page element

### Data

```
this.items = [
      {
        title: "1", footer: "10", headerText: "First", footerText: "4",
        items: [
          { image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png", text: "Stop" },
          { text: "Drop", image: "http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg" }
        ]
      }
    ]
```
By setting headerText/footerText in the item child the text would be used for the header/footer label if no header/footer template is available.

The items prop will be used for the expand view children.

```xml
<accordion:Accordion items="{{items}}" itemTapped="tapped" headerTextBold="true" headerTextColor="white" headerColor="pink"  headerTextColor="blue" allowMultiple="true" id="ac" selectedIndex="1">
            <accordion:Accordion.headerTemplate>
                <GridLayout backgroundColor="green" columns="auto,*">
                    <Label text="{{title}}"/>
                    <Label col="1" text="+"/>
                </GridLayout>
            </accordion:Accordion.headerTemplate>

            <accordion:Accordion.itemTemplate>
                <StackLayout headerText="First">
                    <Image src="{{image}}"/>
                    <Label text="{{text}}"/>
                </StackLayout>
            </accordion:Accordion.itemTemplate>
            

            <accordion:Accordion.footerTemplate>
                <GridLayout backgroundColor="yellow" columns="auto,*">
                    <Label text="{{footer}}"/>
                    <Label col="1" text="-"/>
                </GridLayout>
            </accordion:Accordion.footerTemplate>

        </accordion:Accordion>
```

AngularNative

```js
import { AccordionModule } from "nativescript-accordion/angular";

@NgModule({
    imports: [
        AccordionModule
    ]
    })
```

```html
<Accordion [items]="items" itemTapped="tapped" headerTextBold="true" headerTextColor="white" headerColor="pink" headerTextColor="blue"
    allowMultiple="true"  selectedIndex="2">

    <ng-template accordionHeaderTemplate let-item="item" let-i="index">
        <GridLayout backgroundColor="blue" columns="auto,*">
            <Label [text]="item.title"></Label>
        </GridLayout>
    </ng-template>

    <ng-template accordionItemTemplate let-item="item" let-parent="parentIndex" let-even="even" let-child="childIndex">
        <StackLayout>
            <Image [src]="item.image"></Image>
            <Label [text]="item.text"></Label>
        </StackLayout>
    </ng-template>

    <!-- IOS Only -->
    <ng-template accordionFooterTemplate let-item="item" let-i="index">
        <GridLayout backgroundColor="yellow" columns="auto,*">
            <Label [text]="item.footer"></Label>
            <Label col="1" text="-"></Label>
        </GridLayout>
    </ng-template>
    <!-- IOS Only -->
</Accordion>
```

## Config
```
headerTextAlignment="left ||center || right"  
footerTextAlignment="left ||center || right"
headerTextColor="blue" 
allowMultiple="true"
selectedIndex="2"
separatorColor="transparent"
headerTextSize="20"
footerTextSize="20"
headerTextBold="true"
footerTextBold="true"
```


## ScreenShots
Android | IOS
--------|---------
![SS](ss/android.gif?raw=true) | ![SS](ss/ios.gif?raw=true)
