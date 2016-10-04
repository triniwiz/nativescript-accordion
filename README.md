#NativeScript Accordion

##Install
`tns plugin add nativescript-Accordion`
##Usage

IMPORTANT: Make sure you include xmlns:accordion="nativescript-accordion" on the Page element

Accordion element needs two views first the header you can use any view you like and another for the body
the following uses `Label` follow by `StackLayout`;
{N} vanilla

```xml
<accordion:Accordion bgColor="green">
<Label text="Third" tap="toggle"/>
<StackLayout>
<Image src="http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg"/>
<Label text="accordion"/>
<Button text="tap it !!!!!"/>
</StackLayout>
</accordion:Accordion>
```

AgularNative

```js
import {registerElement} from "nativescript-angular/element-registry";
registerElement("Accordion", () => require("nativescript-accordion").Accordion);
```

```xml
<Accordion bgColor="green">
<Label text="Third" tap="toggle"/>
<StackLayout>
<Image src="http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg"/>
<Label text="accordion"/>
<Button text="tap it !!!!!"/>
</StackLayout>
</Accordion>
```

##Config
```
bgColor="green"
duration="2000"
```

##Instance methods
```js
.toggle();  //Toggle the view
.expand(); //Expand / Open the view
.collapse(); // Close / Collapse the view
isExpanded(); // Check if view is Expanded / Opened
```

##ScreenShots
Android |
--------|
![SS](ss/android.gif?raw=true) |