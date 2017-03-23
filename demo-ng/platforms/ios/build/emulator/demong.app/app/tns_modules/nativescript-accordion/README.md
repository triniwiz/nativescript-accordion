#NativeScript Accordion

##Install
`tns plugin add nativescript-accordion`
##Usage

IMPORTANT: Make sure you include xmlns:accordion="nativescript-accordion" on the Page element


```xml
<accordion:Accordion headerTextAlignment="center" headerTextColor="blue" allowMultiple="true" id="ac" selectedIndex="2" separatorColor="transparent">
            <accordion:Accordion.items>
                <StackLayout headerText="First">
                    <Image src="~/images/a9ff17db85f8136619feb0d5a200c0e4.png"/>
                    <Image row="1" src="~/images/f29.png"/>
                </StackLayout>

                <StackLayout headerText="Second">
                    <Label text="Yolo"/>
                    <Button text="tap it !!!!!"/>
                </StackLayout>

                <StackLayout  headerText="Third">
                    <Button text="tap it !!!!!"/>
                </StackLayout>

                <StackLayout  headerText="Fourth">
                    <Image src="http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg"/>
                    <Label text="accordion"/>
                    <Button text="tap it !!!!!"/>
                </StackLayout>

            </accordion:Accordion.items>
        </accordion:Accordion>
```

AngularNative

```js
import {AccordionComponent} from "nativescript-accordion/angular";

@NgModule({
    declarations: [
        AccordionComponent
    ]
    })
```

```html
<Accordion headerTextAlignment="center" headerTextColor="blue" allowMultiple="true" id="ac" selectedIndex="2" separatorColor="transparent">
                <StackLayout headerText="First">
                    <Image src="~/images/a9ff17db85f8136619feb0d5a200c0e4.png"></Image>
                    <Image row="1" src="~/images/f29.png"></Image>
                </StackLayout>

                <StackLayout headerText="Second">
                    <Label text="Yolo"></Label>
                    <Button text="tap it !!!!!"></Button>
                </StackLayout>

                <StackLayout  headerText="Third">
                    <Button text="tap it !!!!!"></Button>
                </StackLayout>

                <StackLayout  headerText="Fourth">
                    <Image src="http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg"></Image>
                    <Label text="accordion"></Label>
                    <Button text="tap it !!!!!"></Button>
                </StackLayout>
        </Accordion>
```

##Config
```
headerTextAlignment="center"
headerTextColor="blue" 
allowMultiple="true"
selectedIndex="2"
separatorColor="transparent"
```

##Instance methods
```ts
addItem(view:View);  add item to the view;
```

##ScreenShots
Android | IOS
--------|---------
![SS](ss/android.gif?raw=true) | ![SS](ss/ios.gif?raw=true)
