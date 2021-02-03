# Approval / Reject Card

## Description

Displays a simple approval card with three buttons: **Accept**, **Reject**, **View**.

## Screenshot

![Approve Reject Card](../../images/pe-approve-reject-card.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-approval-cloud-sprawl.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/approve-card/pe-approval-card-cloud-sprawl/pe-approval-card-cloud-sprawl.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

Widget Option Schema parameters:

**Card Data** to fill the card with sample data using a JSON object.

```javascript
  {
    "title": "BudgetRequest",
    "sub_title": "Engineering",
    "attention_text": "Tier1",
    "attention_icon": "fa-exclamation-circle",
    "big_text": "$25k",
    "state": "pending",
    "big_text_icon": "coins.png"
  }
```

## Platform Dependencies

> None

## Sample Data and Data Structures

> See 'Configuration' above

## API Dependencies

*Dependencies are included and configured as part of the provided Update Set.*

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._
> None