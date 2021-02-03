'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    status: {
    	type: String, 
    	enum: ['created', 'processing', 'cancelled', 'completed'],
    	required: true
    }, 
    totalPrice: {
    	type: Number,
    	required: true
    },
	cart: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'Cart'
	}
});

mongoose.model('Order', schema);