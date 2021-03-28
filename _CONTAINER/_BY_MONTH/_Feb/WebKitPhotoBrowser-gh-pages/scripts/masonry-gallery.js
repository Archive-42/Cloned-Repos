/*
    Copyright (C) 2015 Apple Inc. All Rights Reserved.
    See LICENSE.txt for this sample’s licensing information
    
    Abstract:
    This file defines an ES6 JavaScript class for a MasonryGallery, which lays out images in the page
                in a grid format. The grid creates elements for photos and UI depending on the arguments it is
                given, such as the number of photos that should be visible on the X-axis (baseGridX), the
                number of elements visible on the Y-axis (baseGridY), as well as how many times the Y-axis generator
                should be repeated (gridRepeatCount).
*/
// Define a MasonryGallery class
class MasonryGallery {
    
    // Define constructor function for instantiation
    constructor(options) {
        this.options = options;

        // A calculation we'll do often is the percentage of a grid cell in CSS
        // We'll do it once and save it here
        this._baseGridXPercentage = 100 / this.options.baseGridX;
        this._baseGridYPercentage = 100 / this.options.baseGridY;

        // We'll also save how tall the maximum number of grid rows should be drawn on the Y axis
        this._maxGridY = this.options.baseGridY * this.options.gridRepeatCount;

        // We'll cut the height of the viewport at wherever the lowest item on the Y axis is
        this._lowestGridY = null;

        // Keep track of what current grid we are iterating through
        this._currentGridX = 0;
        this._currentGridY = 0;

        // When we've rendered all of the images, we'll mark this as true
        this._gridComplete = false;

        // Generate the gallery and save the gallery element
        this.el = this.generateGalleryElement();

        // Set the width & height of the gallery container
        this.el.style.width = (this._currentGridX / this.options.baseGridX) * 100 + 'vw';
        this.el.style.height = (this._lowestGridY / this.options.baseGridY) * 100 + 'vh';

        // Bind events on the Gallery element
        this._bindEvents();
    }

    // Define a function for generating the gallery items
    generateGalleryElement() {
        // Create a container element for the gallery items
        var container = document.createElement('div');
        container.classList.add('masonry-gallery');

        // Iterate through the number of image elements that need to be created and generate them
        var i,
            imagesData = this.options.imagesData,
            imagePathsCount = imagesData.length - 1,
            imageIdx = 0,
            imageData,
            imagePositionData;

        while(!this._gridComplete) {
            imageData = imagesData[imageIdx];
            // Get information about where the image should be positioned
            imagePositionData = this._getImagePositionData(imageData.type);
            // Get a new image element and append it to the container
            container.appendChild(this._generateImageElementContainer(imageData, imagePositionData, imageIdx));
            // Update the grid offests for the next run
            this._updateGridOffsets(imagePositionData);

            // Set the next available image index
            if (imagePathsCount > imageIdx) {
                imageIdx++;
            } else {
                imageIdx = 0;
            }
        }

        return container;
    }

    // Method for generating an image container element from imageData
    _generateImageElementContainer(imageData, imagePositionData, imageIdx) {

        // Create a container for the element
        var imageContainer = document.createElement('div');
        imageContainer.classList.add('gallery-image-container');
        imageContainer.classList.add(imageData.type);

        // Create an inner-container that will handle scaling the image and UI beyond the current wrapper
        var innerContainer = document.createElement('div');
        innerContainer.classList.add('gallery-image-inner-container');

        // Create a container for 'liked' states
        var likedUiContainer = document.createElement('div');
        likedUiContainer.classList.add('gallery-image-liked-ui');

        // Create an image element for the container
        var image = document.createElement('img');
        image.src = imageData.src;
        image.classList.add('gallery-image');

        // Create a UI element for the container we'll use for hover states
        var uiContainer = document.createElement('div');
        uiContainer.classList.add('gallery-image-ui');
        
        // Save the image's index as a data attribute here
        uiContainer.setAttribute('data-image-index', imageIdx);

        // Apply styles to the imageContainer for its absolute positioning
        imageContainer.style.top = imagePositionData.top + 'vh';
        imageContainer.style.left = imagePositionData.left + 'vw';
        imageContainer.style.width = imagePositionData.width + 'vw';
        imageContainer.style.height = imagePositionData.height + 'vh';

        // Append the liked UI container to the ui container
        uiContainer.appendChild(likedUiContainer);

        // Append the UI element to the image container
        innerContainer.appendChild(uiContainer);

        // Append the image to the image container
        innerContainer.appendChild(image);

        // Append the innerContainer to the imageContainer
        imageContainer.appendChild(innerContainer);

        // Return the container
        return imageContainer;
    }

    _getImagePositionData(imageType) {
        // Get information about the masonry grid
        var baseGridX = this.options.baseGridX,
            baseGridY = this.options.baseGridY,
            baseGridXPercentage = this._baseGridXPercentage,
            baseGridYPercentage = this._baseGridYPercentage,
            startGridX = this._currentGridX,
            startGridY = this._currentGridY,
            left = startGridX * baseGridXPercentage,
            top = startGridY * baseGridYPercentage,
            width = baseGridXPercentage,
            endGridX = startGridX + 1,
            height,
            endGridY;

        /*
         * For this demo, we're assuming that tall images are twice as tall as wide ones,
         * and that wide images are twice as wide as tall ones!
         * 
         */

        // Switch the offset values depending on the imageType
        switch(imageType) {
            case 'wide':
                height = baseGridYPercentage;
                endGridY = startGridY + 1;
                break;
            case 'tall':
                height = baseGridYPercentage * 2;
                endGridY = startGridY + 2;
                break;
        }

        return {
            top : top,
            left : left,
            width : width,
            height : height,
            startGridX : startGridX,
            startGridY : startGridY,
            endGridX : endGridX,
            endGridY : endGridY
        };
    }

    // Update the grid offsets so image generators put the images in the correct places
    _updateGridOffsets(imagePositionData) {

        var newCurrentGridX = imagePositionData.startGridX,
            newCurrentGridY = imagePositionData.endGridY;


        if (newCurrentGridY >= this._maxGridY) {

            // Save this value, it will be used to add a "bottom" to the page overflow
            if (this._lowestGridY === null || newCurrentGridY < this._lowestGridY) {
                this._lowestGridY = newCurrentGridY;
            }

            newCurrentGridY = 0;
            newCurrentGridX++;

            // If we've filled the amount of columns we want to fill, stop drawing
            if (newCurrentGridX >= this.options.baseGridX) {
                this._gridComplete = true;
            }

        }

        this._currentGridX = newCurrentGridX;
        this._currentGridY = newCurrentGridY;
    }

    // Bind DOM events on the gallery
    _bindEvents() {
        // When the gallery has a click event bubble up, bind to it
        this.el.addEventListener('click', this._triggerImageSelectedEvent.bind(this));
    }
    
    // Trigger custom events for selecting a specific image
    _triggerImageSelectedEvent(e) {
        // If the target is one, throw a custom event that returns the image src index of the element
        var customEvent = new CustomEvent('image-selected', {
            detail : {
                index : this.getElementImageIndex( e.target )
            }
        });

        // Dispatch the event on this.el
        this.el.dispatchEvent(customEvent);
    }

    getElementImageIndex(targetElement) {
        return parseInt(targetElement.getAttribute('data-image-index'), 10);
    }
    
    getImageContainerFromUIElement(uiElement) {
        return uiElement.parentNode.parentNode;
    }

}