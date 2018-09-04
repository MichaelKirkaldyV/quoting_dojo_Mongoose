//Require
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
const flash = require('express-flash');

//Use & Set
app.use(express.static(path.join(__dirname + "./static")));
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Connect
//connecting database defined in terminal.
mongoose.connect('mongodb://localhost/quote');

//Schema
var QuoteSchema = new mongoose.Schema({
 //validations
 name:  { type: String, required: true, minlength: 6},
 quote: { type: String, required: true, maxlength: 100 }
}, {timestamps: true});

//Model
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'

//Routing
app.get('/', function(req, res) {
	 res.render('index');
})

app.get('/quotes', function(req, res) {
  //finds all documents in User collection.
  var quotes = Quote.find({}, function(err, quotes) { 
      console.log(quotes);   
  })
   res.render('quotes', {quotes: quotes});
})

app.post('/quote', function(req, res) {
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
})



//listen
var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});
