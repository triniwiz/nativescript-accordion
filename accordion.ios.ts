import {StackLayout} from "ui/layouts/stack-layout";
import {Color} from "color";
export class Accordion extends StackLayout {
    private _ios: any;
    public bgColor: any;
    public duration: any;
    constructor() {
        super();
    }
    get android() {
        return this._ios;
    }
    get _nativeView() {
        return this._ios;
    }
    _createUI() {
        const that = new WeakRef(this);

        if (this.duration) {

        }


        if (this.bgColor) {

        }
    }
    onLoaded() {
        super.onLoaded();
    }
    toggle() {

    }
    expand() {

    }
    collapse() {

    }
    isExpanded(): boolean {
        return;
    }
}
