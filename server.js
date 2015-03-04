var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var parseString = require('xml2js').parseString;
var superagent = require('superagent');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

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

console.log(auth);

//Set up where to get Files
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));


//set up superagent
var queryArray = [];
//hard coded query
var query = "'cats'";
superagent.get("https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27cats%27&$format=json")
  .query({Query: query})
  .query({$format: "json"})
  .set('Authorization', 'Basic OmhLQTBmaTMzaVlGVnhZNGJxYUFFNkVPdHNqV3Q5VWx1dTU1NlpwZFU5U2M=')
  .end(function(res){
    if (res.ok){
      queryArray = JSON.stringify(res.body.d.results);
    }
    else{
      console.log('error');
    }
  });

//Set up route for opening page
router.route('/')
    .get(function(req, res){
        response.status(200).render("index.html");
    });

app.use(router);
var port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening to port:", port);