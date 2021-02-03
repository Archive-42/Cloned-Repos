'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review'
    }],
    avgStars: {type:Number}
});


//We will still need to test this when we have adequate data 
schema.methods.getAverageRating = function(){
	this.populate('reviews').aggregate({$avg:rating}).exec().then(function(results){
		return results; 
	});
};
//schema.method.Avgscores
mongoose.model('ReviewHistory', schema);