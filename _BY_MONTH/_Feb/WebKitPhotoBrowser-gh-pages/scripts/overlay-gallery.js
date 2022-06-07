/*
    Copyright (C) 2015 Apple Inc. All Rights Reserved.
    See LICENSE.txt for this sample’s licensing information
    
    Abstract:
    This file defines an ES6 JavaScript class for the OverlayGallery, which handles the larger UI
                that is used for viewing photos after one is selected from the masonry gallery.
*/
class OverlayGallery {
    constructor(options) {
        this.options = options;
        this._visible = false;
        this._active = false;
        
        // Save references to gallery elements for faster lookup later
        this.galleryElements = [];

        // Generate the overlay gallery elements
        this.el = this.generateGalleryElement();
        
        // Set width of the child container to be as wide as the number of elements * viewport width
        this.el.childNodes[0].style.width = this.galleryElements.length * 100 + 'vw';
        
        // Handle gallery transition states
        this.el.addEventListener('transitionend', this._handleTransitionEnd.bind(this));
    }

    setGalleryActive(bool) {
        // Handle setting of CSS classes for viewing the gallery
        var activeClass = 'overlay-active',
            target = document.documentElement;
        
        this._active = bool;
        if (bool) {
            target.classList.add(activeClass);
            return;
        }
        target.classList.remove(activeClass);
    }
    
    setGalleryVisible(bool) {
        // Handle setting of CSS classes for when the gallery is visible (has animated in)
        var activeClass = 'overlay-visible',
            target = document.documentElement;
        
        // Save the visibility state of the gallery
        this._visible = bool;
        
        if (bool) {
            target.classList.add(activeClass);
            return;
        }
        target.classList.remove(activeClass);
    }

    openGalleryOnEvent(eventData) {
        var imageIndex = eventData.detail.index;
        // Add a visible class
        this.setGalleryVisible(true);

        // Scroll to the image by it's index
        var target = this.getElementTargetByImageIndex(imageIndex);
        target.scrollIntoViewIfNeeded();
    }

    closeGallery() {
        // Remove class names for the gallery's active state
        this.setGalleryActive(false);
        this.setGalleryVisible(false);
        this.el.classList.remove('force-active');
    }

    // Create an element for the gallery content
    generateGalleryElement() {
        // Create a galleryElement container element for the fixed gallery content
        var galleryElement = document.createElement('div');
        galleryElement.classList.add('overlay-gallery');

        // In order to have overflows work nicely, we'll have another container for the images
        var container = document.createElement('div');
        container.classList.add('overlay-gallery-images');

        // For each image in this.options.imagesData, create an element for the content
        var imagesData = this.options.imagesData,
            len = imagesData.length,
            imageData,
            galleryImageElement,
            i;
        for (i = 0; i < len; i++) {
            imageData = imagesData[i];
            galleryImageElement = this._generateGalleryImageContainer(imageData, i);
            this._bindGalleryImageEvents(galleryImageElement);
            this.galleryElements[i] =  galleryImageElement;
            container.appendChild(galleryImageElement);
        }

        // Append the container to the gallery element
        galleryElement.appendChild(container);

        return galleryElement;
    }
    
    getElementTargetByImageIndex(imageIndex) {
        return this.galleryElements[imageIndex];
    }

    setImageLikedFromEvent(e) {
        var imageIndex = e.detail.index,
            liked = e.detail.liked,
            imageContainer = this.getElementTargetByImageIndex(imageIndex);

        // Toggle whether the item is liked or not
        this.setPhotoLiked(imageContainer, liked);
    }

    setPhotoLiked(imageContainer, bool) {
        var likedClassName = 'liked';

        if (bool) {
            imageContainer.classList.add(likedClassName);
            return;
        }

        imageContainer.classList.remove(likedClassName);
    }

    // Create an image element based upon imageData
    _generateGalleryImageContainer(imageData, imageIndex) {
        // Create a container for the image element
        var imageContainer = document.createElement('figure');
        imageContainer.classList.add('gallery-image-container');

        // Create an outer-container for the image and like ui
        var outerContainer = document.createElement('div');
        outerContainer.classList.add('gallery-outer-container');

        // Create an inner-container for the image and like ui
        var innerContainer = document.createElement('div');
        innerContainer.classList.add('gallery-inner-container');

        // Set a class for whether the image is wide or tall (for spacing)
        innerContainer.classList.add(imageData.type);

        // Create a "liked" icon for the image
        var likedUiContainer = document.createElement('div');
        likedUiContainer.classList.add('gallery-image-liked-ui');

        // Create a container for metadata elements
        var metadataContainer = document.createElement('figcaption');
        metadataContainer.classList.add('gallery-image-metadata');

        // Create some metadata elements
        var metaDataLocation = document.createElement('h3');
        metaDataLocation.classList.add('gallery-image-metadata-location');
        metaDataLocation.textContent = imageData.location;

        var metaDataTime = document.createElement('p');
        metaDataTime.classList.add('gallery-image-metadata-time');
        metaDataTime.textContent = imageData.time;

        var metaDataDescription = document.createElement('p');
        metaDataDescription.classList.add('gallery-image-metadata-description');
        metaDataDescription.textContent = imageData.description;

        // Append metadata elements
        metadataContainer.appendChild(metaDataLocation);
        metadataContainer.appendChild(metaDataTime);
        metadataContainer.appendChild(metaDataDescription);

        // Create an image element and set the src attribute
        var img = document.createElement('img');
        img.src = imageData.src;
        img.classList.add('gallery-image');

        // Set the image index as a data attribute on the gallery
        img.setAttribute('data-image-index', imageIndex);

        // Append the liked-ui container to the inner container
        innerContainer.appendChild(likedUiContainer);

        // Append the image element to the inner container
        innerContainer.appendChild(img);

        // Append metadata container to the inner container
        innerContainer.appendChild(metadataContainer);

        // Append the inner container to the outer container
        outerContainer.appendChild(innerContainer);

        // Append the outer container to the image container
        imageContainer.appendChild(outerContainer);

        return imageContainer;
    }

    _bindGalleryImageEvents(imageContainer) {
        // Bind events to handle clicks on the 'liked' icon
        var likedUI = imageContainer.querySelector('.gallery-image-liked-ui');
        likedUI.addEventListener('click', this._handleLikedUIClicked.bind(this, imageContainer));
    }
    
    _handleTransitionEnd(e) {
        // Handle setting CSS classes when the overlay animates into a visible state
        if (e.target !== this.el || !this._visible) {
            return;
        }
        
        this.setGalleryActive(true);
    }

    _handleLikedUIClicked(imageContainer, e) {
        // When the liked UI is clicked, prevent it from bubbling up to the container
        e.stopPropagation();

        // Change whether or not items should be liked or not
        var imageElement = imageContainer.querySelector('.gallery-image'),
            imageIndex = parseInt( imageElement.getAttribute('data-image-index'), 10),
            isLiked = imageContainer.classList.contains('liked');

        if (!isLiked) {
            this.setPhotoLiked(imageContainer, true);
            return;
        }

        this.setPhotoLiked(imageContainer, false);
    }
}