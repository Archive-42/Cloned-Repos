var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
});