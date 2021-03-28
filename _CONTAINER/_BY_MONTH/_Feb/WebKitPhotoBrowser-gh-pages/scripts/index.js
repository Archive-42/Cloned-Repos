/*
    Copyright (C) 2015 Apple Inc. All Rights Reserved.
    See LICENSE.txt for this sample’s licensing information
    
    Abstract:
    This file handles page initialization through the Main class, which is called via static methods
                in ES6 when the 'DOMContentLoaded' event is called on the document.
*/
// Define a Main class, that has static methods for instantiating page content
class Main {
    static initialize() {

        // Create a new instance of the MasonryGallery
        this.masonryGallery = new ForceEnhancedMasonryGallery({
            imagesData : imagesData,
            baseGridX : 4,
            baseGridY : 3,
            gridRepeatCount : 4
        });

        // Create a new instance of the OverlayGallery
        this.overlayGallery = new OverlayGallery({
            imagesData : imagesData
        });

        // Get a reference for the site content
        this.siteContent = document.querySelector('.site-content');

        // Append the masonry gallery element to the DOM
        this.siteContent.appendChild(this.masonryGallery.el);
    
        // Append the overlay gallery element to the DOM
        document.body.appendChild(this.overlayGallery.el);

        // Bind some page-wide events
        this._bindEvents();

         // Append the 'initialized' class to the documentElement to remove the 'unsupported' text
        document.documentElement.classList.add('initialized');
    }

    // Bind events between the masonryGallery and overlayGallery
    static _bindEvents() {
        // When the masonryGallery element triggers the custom 'image-selected' event, handle it
        this.masonryGallery.el.addEventListener('image-selected', this.overlayGallery.openGalleryOnEvent.bind(this.overlayGallery));
        // When the overlayGallery element is clicked, we want to remove its overlay
        this.overlayGallery.el.addEventListener('click', this.overlayGallery.closeGallery.bind(this.overlayGallery));
        // When the masonryGallery throws a 'saved-image' event, propogate that to the overlayGallery
        this.masonryGallery.el.addEventListener('image-liked', this.overlayGallery.setImageLikedFromEvent.bind(this.overlayGallery));
    }
}

// When DOMContentLoaded is fired, run Main's initialize method
document.addEventListener('DOMContentLoaded', Main.initialize.bind(Main));