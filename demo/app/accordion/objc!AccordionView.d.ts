
declare class AccordionView extends UIView implements UIScrollViewDelegate {

	static alloc(): AccordionView; // inherited from NSObject

	static appearance(): AccordionView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AccordionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AccordionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AccordionView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AccordionView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AccordionView; // inherited from UIAppearance

	static new(): AccordionView; // inherited from NSObject

	allowsEmptySelection: boolean;

	allowsMultipleSelection: boolean;

	animationCurve: UIViewAnimationCurve;

	animationDuration: number;

	autoScrollToTopOnSelect: boolean;

	delegate: AccordionViewDelegate;

	readonly isHorizontal: boolean;

	scrollView: UIScrollView;

	selectedIndex: number;

	selectionIndexes: NSIndexSet;

	startsClosed: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	addHeaderWithView(aHeader: UIControl, aView: any): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	removeHeaderAtIndex(index: number): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

	scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

	scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

	scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

	scrollViewDidScroll(scrollView: UIScrollView): void;

	scrollViewDidScrollToTop(scrollView: UIScrollView): void;

	scrollViewDidZoom(scrollView: UIScrollView): void;

	scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

	scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

	scrollViewWillBeginDragging(scrollView: UIScrollView): void;

	scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	self(): this;

	setOriginalSizeForIndex(size: CGSize, index: number): void;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}

interface AccordionViewDelegate extends NSObjectProtocol {

	accordionDidChangeSelection?(accordion: AccordionView, selection: NSIndexSet): void;
}
declare var AccordionViewDelegate: {

	prototype: AccordionViewDelegate;
};

declare var AccordionViewVersionNumber: number;

declare var AccordionViewVersionString: interop.Reference<number>;
