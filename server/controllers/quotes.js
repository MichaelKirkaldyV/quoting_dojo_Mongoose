
// All necessary requires, such as the Quote model.

var mongoose = require('mongoose');
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'Quote'//GET

module.exports = {
    index: function(req, res) {
    	 res.render('index');
    },
    create: function(req, res) {
     console.log("POST DATA", req.body);
	 //creates new user instance

	 var quote = new Quote({name: req.body.name, quote: req.body.quote});
	 quote.save(function(err){
        if(err){
            // if there is an error upon saving, use console.log to see what is in the err object 
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            res.redirect('/');
        }
        else {
        	console.log('successfully added a user!');
            res.redirect('/quotes');
        }
    });
    },
    retrieve: function(req, res) {
      //finds all documents in User collection.
 	  var quotes = Quote.find({}, function(err, quotes) { 
      console.log(quotes); 
      res.render('quotes', {quotes: quotes});  
  })
    }
};
