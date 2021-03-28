# WebKit Photo Browser: Using Modern Web Techniques in WebKit

Shows how to use many of the WebKit techniques introduced in Safari 9, including backdrop filters, scroll snap effects, and force touch support.

## Application Structure

### index.html
Opening the `index.html` file inside of Safari 9 opens the application in the browser.


### /assets
The `/assets` directory is used as a location for images used in the site, including photos and UI elements.


### /scripts
The `/scripts` directory contains JavaScript files that are used for the site's interactive code.

#### images-data.js
`images-data.js` defines information about the photos used within the site, including the order in which they are rendered and their metadata.

#### index.js
`index.js` acts as the initialization script for the application, where galleries are instantiated on `DOMContentLoaded` events on the `document` object.

#### masonry-gallery.js
`masonry-gallery.js` defines a class for creating a basic masonry-style grid of images using image data from `images-data.js`. This is further extended by classes inside of `new-scripts.js` to include functionality for snap points and Force Touch events.

#### new-scripts.js
`new-scripts.js` is the script file that includes JavaScript code that is added during the presentation to enhance the MasonryGallery with snap points and Force Touch. This file includes examples of how to enable CSS snap points with style attributes in JavaScript, as well as how to listen for Force Touch events on elements.

#### overlay-gallery.js
`overlay-gallery.js` defines a class for creating the overlay gallery in JavaScript. This gallery is viewed when a user clicks a item in the masonry gallery and goes into the overlay view.


### /styles
The `/styles` directory is where CSS for the application is saved and referenced from.

#### styles.css
`styles.css` acts as the base styles for the application before any enhancements for snap points or Force Touch are added.

#### new-styles.css
`new-styles.css` is where CSS is edited during the presentation to enhance functionality with backdrop filters, snap points, and Force Touch. This file is useful to reference for examples on how to apply these effects in conjunction with the interaction enhancements that are applied with `/scripts/new-scripts.js`.


### LICENSE.txt
Important licensing information related to this sample code.


## Requirements

### Build

Safari 9

### Runtime

Safari 9 

Copyright (C) 2015 Apple Inc. All rights reserved.
