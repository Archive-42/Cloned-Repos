# Custom Overlay

## Description

This widget provides the ability to display a minimal modal dialog above all page content, including the header.

## Screenshots
![alt text](../images/pe-custom-overlay.png "Custom Overlay")

## Additional Information/Notes
> None
---
## Installation
Download and install update set **[pe-custom-overlay.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-custom-overlay/pe-custom-overlay.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Language variants can be created through the section `System UI -> UI Messages` and displayed by adding a statement to the HTML body using syntax:

```html
${<i>key value specified in the Message record</i>}
```
---
## Platform Dependencies
> None
---
## Sample Data and Data Structures
> See 'Configuration' above
---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
The widget is using colors from Bootstrap SASS variables, and a minimal styles configuration to make it easy to customize and extend.
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._
