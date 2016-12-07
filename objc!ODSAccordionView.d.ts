
declare const enum ODSAccordionHeaderStyle {

	LabelRight = 0,

	LabelCentered = 1,

	LabelLeft = 2
}

declare class ODSAccordionSection extends NSObject {

	static alloc(): ODSAccordionSection; // inherited from NSObject

	static new(): ODSAccordionSection; // inherited from NSObject

	title: string;

	view: UIView;

	constructor(o: { title: string; andView: UIView; });

	initWithTitleAndView(sectionTitle: string, sectionView: UIView): this;
}

declare class ODSAccordionSectionStyle extends NSObject {

	static alloc(): ODSAccordionSectionStyle; // inherited from NSObject

	static new(): ODSAccordionSectionStyle; // inherited from NSObject

	arrowColor: UIColor;

	arrowVisible: boolean;

	backgroundColor: UIColor;

	dividerColor: UIColor;

	headerBackgroundColor: UIColor;

	headerHeight: number;

	headerStyle: ODSAccordionHeaderStyle;

	headerTitleLabelFont: UIFont;

	headerTitleLabelHighlightedTextColor: UIColor;

	headerTitleLabelTextColor: UIColor;

	stickyHeaders: boolean;
}

declare class ODSAccordionSectionView extends UIView {

	static alloc(): ODSAccordionSectionView; // inherited from NSObject

	static appearance(): ODSAccordionSectionView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): ODSAccordionSectionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): ODSAccordionSectionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): ODSAccordionSectionView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): ODSAccordionSectionView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): ODSAccordionSectionView; // inherited from UIAppearance

	static new(): ODSAccordionSectionView; // inherited from NSObject

	readonly expanded: boolean;

	readonly header: UIButton;

	height: number;

	readonly sectionView: UIView;

	constructor(o: { title: string; andView: UIView; sectionStyle: ODSAccordionSectionStyle; });

	initWithTitleAndViewSectionStyle(sectionTitle: string, sectionView: UIView, sectionStyle: ODSAccordionSectionStyle): this;
}

declare class ODSAccordionView extends UIScrollView {

	static alloc(): ODSAccordionView; // inherited from NSObject

	static appearance(): ODSAccordionView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): ODSAccordionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): ODSAccordionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): ODSAccordionView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): ODSAccordionView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): ODSAccordionView; // inherited from UIAppearance

	static new(): ODSAccordionView; // inherited from NSObject

	constructor(o: { sections: NSArray<any>; andSectionStyle: ODSAccordionSectionStyle; });

	initWithSectionsAndSectionStyle(sections: NSArray<any>, sectionStyle: ODSAccordionSectionStyle): this;
}

declare var ODSAccordionViewVersionNumber: number;

declare var ODSAccordionViewVersionString: interop.Reference<number>;

declare class ODSArrowIcon extends UIView {

	static alloc(): ODSArrowIcon; // inherited from NSObject

	static appearance(): ODSArrowIcon; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): ODSArrowIcon; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): ODSArrowIcon; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): ODSArrowIcon; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): ODSArrowIcon; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): ODSArrowIcon; // inherited from UIAppearance

	static new(): ODSArrowIcon; // inherited from NSObject

	color: UIColor;

	pointDownAnimated(animated: boolean): void;

	pointUpAnimated(animated: boolean): void;
}
