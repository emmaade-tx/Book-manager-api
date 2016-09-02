const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bookModel = new Schema({
	title: {
		type: String
	},
	read: {type: Boolean, default: false},
	author: {type: String},
	genre: {type: String},
	
}); 

module.exports = mongoose.model('Book', bookModel);