# Search As Direct Reports

## Description

Behavioral additions to two pages of the Employee Service Center, allowing managers to view search results as they would be delivered to their direct reports, and to load Knowledge article content from those results as it would be for a selected direct report.

A revision to the Faceted Search widget, **Faceted Search with View As** displays a tab for the user and any of his or her direct reports. Each tab maintains any selected facet and source criteria, and shows search results as the selected user would see them.

A revision to the Knowledge article widget, **KB Article Page with View As** gives the option to switch views to that of a direct report (as selected on the search page).

## Screenshot

![Search As Direct Reports](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-search-as-direct-reports/images/pe-search-as-direct-reports.png)

## Additional Information/Notes

A "direct report" is any user with the current user assigned as "manager".

The manager currently requires the "impersonator" role for these functionalities to display.

## Installation

Download and install update set **[pe-search-as-direct-reports.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-search-as-direct-reports/pe-search-as-direct-reports.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

To include in ESC, the widget instances in that portal need to be assigned the 'with View As' widgets.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> None

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None
