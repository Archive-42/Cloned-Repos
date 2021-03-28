'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	queryString: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',
		required: true
	},
	category:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Category',
		required: true
	} 

});

mongoose.model('SearchEvent', schema);