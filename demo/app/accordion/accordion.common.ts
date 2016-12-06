import {View, AddChildFromBuilder, CustomLayoutView} from "ui/core/view";
import {PropertyMetadata} from "ui/core/proxy";
import {Property, PropertyChangeData, PropertyMetadataSettings} from "ui/core/dependency-observable";

export abstract class Accordion extends View implements AddChildFromBuilder {
    private _child;
    private _headerText;
    get headerText() {
        return this._headerText;
    }

    set headerText(value) {
        this._headerText = value;
    }

    get child() {
        return this._child;
    }

    public _addChildFromBuilder(name: string, value: any) {
        if (value instanceof View) {
            this._child = value;
        }
    }

    public _eachChildView(callback: (child: View) => boolean) {
        if (this._child) {
            callback(this._child);
        }
    }
}
