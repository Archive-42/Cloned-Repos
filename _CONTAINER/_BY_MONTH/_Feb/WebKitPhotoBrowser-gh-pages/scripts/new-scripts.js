/*
    Copyright (C) 2015 Apple Inc. All Rights Reserved.
    See LICENSE.txt for this sample’s licensing information
    
    Abstract:
    This file describes JS enhancements required to add CSS snap points and
                Force Touch capability to the masonry gallery. Both extensions are ES6 JS classes
                that extend functionality.
*/
class SnapPointsMasonryGallery extends MasonryGallery {
    constructor(options) {
        // Calling super instantiates a MasonryGallery in the context of 'this' that we can extend 
        super(options);

        // Set snap point styles on the document body
        this.setSnapPointsStyles(document.body);
    }

    // Enable -webkit-scroll-snap properties on a target element
    setSnapPointsStyles( element ) {
        element.style.webkitScrollSnapType = 'mandatory';
        element.style.webkitScrollSnapPointsY = 'repeat(' + this._baseGridYPercentage + 'vh)';
    }
}

class ForceEnhancedMasonryGallery extends SnapPointsMasonryGallery {
    constructor(options) {
        super(options);
        
        // Get minimum and maximum force value
        this.minForce = MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN;
        this.maxForce = MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;
        
        // Set the progress value that we want to trigger like
        this._likeForceThreshold = 0.65;
        
        // Save a bound animation frame function for animating
        this._boundOnAnimationFrame = this._onAnimationFrame.bind(this);
        
        // Boolean for whether force events are between WEBKIT_FORCE_AT_MOUSE_DOWN and WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN
        this._isWithinForceRange = false;

        // Boolean for whether the threshold for triggering like has been hit
        this._didHitLikeThreshold = false;

        // Bind force events on itself when ready
        this.bindForceEvents();
    }

    bindForceEvents() {
        // Bind force events that will be used for enhancing the UI
        this.el.addEventListener('webkitmouseforcewillbegin', this._handleMouseForceWillBegin.bind(this));
        this.el.addEventListener('webkitmouseforcedown', this._handleMouseForceDown.bind(this));
        this.el.addEventListener('webkitmouseforcechanged', this._handleMouseForceChanged.bind(this));
        this.el.addEventListener('webkitmouseforceup', this._handleMouseForceUp.bind(this));
    }
    
    _handleMouseForceWillBegin(e) {
        // Prevent default on webkitmouseforcewillbegin in order to prevent default features from the OS
        e.preventDefault();
    }

    _handleMouseForceDown(e) {
        // When a force down is found, set this._setWithinForceRange to be true and set up some CSS classes to make things animate cleanly
        this._setWithinForceRange( true );
    }
     
    _handleMouseForceChanged(e) {
        // If we already hit the threshold, stop this from continuing (per our UI requirements)
        if (!this._isWithinForceRange || this._didHitLikeThreshold) {
            return;
        }

        // Get the target and force value
        var target = e.target,
            force = e.webkitForce;
        
        // Get the progress of force between the min and max
        var progress = (force - this.minForce) / (this.maxForce - this.minForce);
        
        // Get the progress of force between 0 and this._likeForceThreshold
        var triggerThresholdProgress = progress / this._likeForceThreshold;

        // Translate the elements we want to animate according to the progress
        this._handleElementTransition(target, triggerThresholdProgress);
        
        // If the force threshold is hit, we like the image
        if (triggerThresholdProgress >= 1) {
            this._didHitLikeThreshold = true;
            this._likeImage(target);
        }
    }

    _handleMouseForceUp(e) {
        // Reset styles when force up occurs
        var target = e.target,
            imageContainer = this.getImageContainerFromUIElement(target);
        
        // Reset the force status for the next set of events
        this._setWithinForceRange(false);
        this._didHitLikeThreshold = false;
        
        // Remove styles
        imageContainer.classList.remove('threshold-hit');
        
        // Waiting an animation frame will allow elements to CSS transition back into place after class changes are painted
        window.requestAnimationFrame(function() {
            this.removeAttribute('style');
            this.nextSibling.removeAttribute('style');
        }.bind(target));

    }

    _likeImage(target) {      
        var likedClassName = 'liked',
            thresholdClass = 'threshold-hit';

        // Get the image container and whether or not it is already liked
        var imageIndex = this.getElementImageIndex(target),
            targetWasLiked = target.classList.contains(likedClassName),
            imageContainer = this.getImageContainerFromUIElement(target);

        // Set a class for the threshold being hit, which will animate in our 'like' ui
        imageContainer.classList.add(thresholdClass);
        if (!targetWasLiked) {

            // If we are saving the item, this will trigger that it was liked and add a classname for that
            target.classList.add(likedClassName);
            this._triggerImageLikedEvent(target, true);
            return;
        }

        // Otherwise, we'll remove the liked class name and trigger an event that it was removed
        target.classList.remove(likedClassName);
        this._triggerImageLikedEvent(target, false);

    }

    // Trigger custom events for selecting a specific image
    _triggerImageLikedEvent(target, liked) {
        // If the target is one, throw a custom event that returns the image src index of the element
        var customEvent = new CustomEvent('image-liked', {
            detail : {
                index : this.getElementImageIndex(target),
                liked : liked
            }
        });

        // Dispatch the event on this.el
        this.el.dispatchEvent(customEvent);
    }

    _handleElementTransition(target, progress) {

        // The sibling of this element is the image next to it, that we'll add a tiny bit of scaling to
        var siblingImage = target.nextSibling;
        
        // Get some values for what the scale and blur values are as we apply force
        var scaleMultiplier = 0.08,
            scaleValue = 1 - (progress * scaleMultiplier); 
        
        // Save the animation properties in an instance variable, in order to have the newest values when requestAnimationFrame is ready to draw
        this._animationProps = {
            target : siblingImage,
            transform : 'scale(' + scaleValue + ') translateZ(0)'
        };

        // If an animation frame isn't active, create one for drawing these values
        if (!this._animationFrame) {
            this._animationFrame = requestAnimationFrame( this._boundOnAnimationFrame );
        }
            
    }

    _onAnimationFrame() {
        // In case animation props DNE, return false
        if (!this._animationProps) {
            return;
        }

        // Apply animationProps values to the element
        this._animationProps.target.style.transform = this._animationProps.transform;
        
        // Set this._animationFrame to null so a new one will be set on the next force change event
        this._animationFrame = null;
    }

    _setWithinForceRange(bool) {
        // Set a classname of 'force-active' to the documentElement in order to handle styles when force is active
        var target = document.documentElement,
            className = 'force-active';

        if (bool) {
            // Set a variable for preventing regular click since force is active
            this._isWithinForceRange = true;
            // Add the classname
            target.classList.add(className);
            return;
        }

        // Otherwise, remove the variable preventing click callbacks and remove the classname
        this._isWithinForceRange = false;
        target.classList.remove(className);
    }
}