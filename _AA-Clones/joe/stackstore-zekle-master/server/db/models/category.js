'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
    	type: String,
    	unique: true,
    	required: true 
    },

    subcategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
});



mongoose.model('Category', schema);
