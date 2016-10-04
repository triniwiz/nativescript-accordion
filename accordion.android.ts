import {StackLayout} from "ui/layouts/stack-layout";
import {Color} from "color";
export class Accordion extends StackLayout {
    private _android: any;
    private _androidViewId: number;
    private _expandableLayout: any;
    public bgColor: any;
    public duration: any;
    constructor() {
        super();
    }
    get android() {
        return this._android;
    }
    get _nativeView() {
        return this._android;
    }
    _createUI() {
        const that = new WeakRef(this);

        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }

        this._expandableLayout = new net.cachapa.expandablelayout.ExpandableLayout(this._context);
        if (this.duration) {
            this._expandableLayout.setDuration(this.duration);
        }

        this._android = new android.widget.LinearLayout(this._context);
        this._android.setOrientation(android.widget.LinearLayout.VERTICAL)
        this._android.setId(this._androidViewId);

        this._android.setLayoutParams(new android.widget.LinearLayout.LayoutParams(
            android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
            android.widget.LinearLayout.LayoutParams.MATCH_PARENT));

        if (this.bgColor) {
            this._android.setBackgroundColor(new Color(this.bgColor).android);
        }
    }
    onLoaded() {
        const header = this._android.getChildAt(0);
        const body = this._android.getChildAt(1);
        this._android.removeView(header);
        this._android.removeView(body);
        this._android.addView(header);
        this._android.addView(this._expandableLayout);
        this._expandableLayout.addView(body);
        this._expandableLayout.setVisibility(android.view.View.GONE);
        super.onLoaded();
    }
    toggle() {
        this._expandableLayout.toggle();
    }
    expand() {
        this._expandableLayout.expand();
    }
    collapse() {
        this._expandableLayout.collapse();
    }
    isExpanded():boolean {
        return this._expandableLayout.isExpanded();
    }
}
