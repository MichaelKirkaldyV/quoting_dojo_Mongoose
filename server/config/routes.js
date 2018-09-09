var mongoose = require('mongoose');

var quoteController = require('./../controllers/quotes.js')



//All our routes can be exported as a function which accepts a parameter called app
module.exports = function(app){

//Routing
app.get('/', quoteController.index),
app.post('/quote', quoteController.create),
app.get('/quotes', quoteController.retrieve)
 
}        
