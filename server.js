var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var parseString = require('xml2js').parseString;
var superagent = require('superagent');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://south:south@ds027718.mongolab.com:27718/crmdb');

var Query = require('./app/models/query.js');



//Views
app.set("view engine", 'ejs');

var router = express.Router();

// https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27cats%27&$format=json
// acctkey = hKA0fi33iYFVxY4bqaAE6EOtsjWt9Uluu556ZpdU9Sc
// var acctKey = 'CLir7B5jwG5r2PPBhwyGxia7tsVyggkcyHkgcdvRPSs';
var acctKey = 'hKA0fi33iYFVxY4bqaAE6EOtsjWt9Uluu556ZpdU9Sc';
var rootUri = 'https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%';
var auth    = new Buffer([ acctKey, acctKey ].join(':')).toString('base64');
var request = require('request').defaults({
  headers : {
    'Authorization' : 'Basic ' + "OmhLQTBmaTMzaVlGVnhZNGJxYUFFNkVPdHNqV3Q5VWx1dTU1NlpwZFU5U2M="
  }
});

// console.log(auth);
// console.log(Query);
//Set up where to get Files
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/views'));


//set up superagent
var queryArray = [];
//hard coded query
var query = "'cats'";
//"https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27cats%27&$format=json"
superagent.get("https://api.datamarket.azure.com/Bing/Search/v1/Web?")
  .query({Query: query})
  .query({$format: "json"})
  // .set('Authorization', 'Basic OmhLQTBmaTMzaVlGVnhZNGJxYUFFNkVPdHNqV3Q5VWx1dTU1NlpwZFU5U2M=')
  .end(function(res){
    if (res.ok){
      queryArray = res.body.d.results;
      var search = new Query();
      search.query = query;
      search.results = queryArray;
      search.save();
      console.log(search);
    }
    else{
      console.log('error');
    }
  });


var bingUrl = "https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=" + query + "&$format=json";




// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
  });



//Set up route for opening page
router.route('/')
    .get(function(req, res){
      response.status(200).render("index.html");
      Query.find(function(error, data){
        if(error){console.log('error');}
        res.status(200).json(data);
      });
    })
    .post(function(req, res){
      console.log(req.body.query);
    });

//Route for API endpoint
var apiRouter = express.Router();

apiRouter.route('/')
  .get(function(req, res){
    Query.find(function(error, data){
      if(error){console.log('error');}
      res.json(data);
    });
  })
  .post(function(req, res){
    console.log(req.body.query);
    var newQuery = new Query();
  });



app.use('/api', apiRouter);
app.use(router);
var port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening to port:", port);