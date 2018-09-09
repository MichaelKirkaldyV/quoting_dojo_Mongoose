var mongoose = require('mongoose');

//Sets database
var QuoteSchema = new mongoose.Schema({
 //validations
 name:  { type: String, required: true, minlength: 6},
 quote: { type: String, required: true, maxlength: 100 }
}, {timestamps: true});

//Get database
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'

