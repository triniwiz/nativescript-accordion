# ODSAccordionView

[![Version](https://img.shields.io/cocoapods/v/ODSAccordionView.svg?style=flat)](http://cocoadocs.org/docsets/ODSAccordionView)
[![License](https://img.shields.io/cocoapods/l/ODSAccordionView.svg?style=flat)](http://cocoadocs.org/docsets/ODSAccordionView)
[![Platform](https://img.shields.io/cocoapods/p/ODSAccordionView.svg?style=flat)](http://cocoadocs.org/docsets/ODSAccordionView)

Yet another accordion style container view

* Made for iOS 7+.
* Flat design
* Autolayout compatible
* Uses ARC

## Screenshots

![Screenshot 1](Screenshot1.png) . 
![Screenshot 2](Screenshot2.png)

## Usage

To run the example project, clone the repo, and run `pod install` from the Example directory first.

## Requirements

Requires iOS 7 or above

## Installation

ODSAccordionView is available through [CocoaPods](http://cocoapods.org). To install
it, simply add the following line to your Podfile:

pod "ODSAccordionView"


## Usage

```
ODSAccordionSectionStyle *style = [[ODSAccordionSectionStyle alloc] init];
    style.arrowColor = lightBlue;
    style.headerStyle = ODSAccordionHeaderStyleLabelLeft;
    style.headerTitleLabelFont = [UIFont systemFontOfSize:15];
    style.backgroundColor = blue;
    style.headerBackgroundColor = darkBlue;
    style.dividerColor = [UIColor lightGrayColor];
    style.headerHeight = 40;
    style.stickyHeaders = YES;
    style.animationDuration = 0.2;
    style.arrowHeight = 1;

    NSArray *sections = @[
                          [[ODSAccordionSection alloc] initWithTitle:@"Text"
                                                             andView: [self textView]],
                          [[ODSAccordionSection alloc] initWithTitle:@"Cat content"
                                                             andView: [self imageView] collapse:NO],
                          [[ODSAccordionSection alloc] initWithTitle:@"Web content"
                                                             andView: [self webView]]
                         ];
    _accordionView = [[ODSAccordionView alloc] initWithSections:sections andSectionStyle:style];
    _accordionView.keyboardDismissMode = UIScrollViewKeyboardDismissModeOnDrag;
    self.view = _accordionView;
    self.view.backgroundColor = lightBlue;
    [_accordionView addSection:[[ODSAccordionSectionView alloc]initWithTitle:@"New Section" andView:self.newView sectionStyle:style]];
```


## Authors

* Johannes Seitz, http://www.craftware.de 


## License

ODSAccordionView is available under the MIT license. See the LICENSE file for more info.

