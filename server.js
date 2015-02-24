var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var parseString = require('xml2js').parseString;

//Views
app.set("view engine", 'ejs');

var router = express.Router();

// https://api.datamarket.azure.com/Bing/Search/Web?Query='cats'&$format=json
var acctKey = 'CLir7B5jwG5r2PPBhwyGxia7tsVyggkcyHkgcdvRPSs';
var rootUri = 'https://api.datamarket.azure.com/Bing/Search/Web';
var auth    = new Buffer([ acctKey, acctKey ].join(':')).toString('base64');
var request = require('request').defaults({
  headers : {
    'Authorization' : 'Basic ' + auth
  }
});


//perform a query:
app.get('/search', function(req, res) {
  // var service_op  = req.body.service_op;
  // var query       = req.body.query;
  var query = "cats";
  request.get({
    url : rootUri + '/',
    qs  : {
      $format : 'json',
      Query   : "'" + query + "'",
    }
  }, function(err, response, body) {
    if (err)
      return res.send(500, err.message);
    if (response.statusCode !== 200)
      return res.send(500, response.body);
    var results = JSON.parse(response.body);
    res.send(results.d.results);
  });
});

app.get('/bing', function(req, res){
  var options = {
    host : 'api.datamarket.azure.com',
    path : "/Bing/Search/Web?Query='cats'&$format=json",
    port : 80,
    method : 'GET'
  }

  var request = http.request(options, function(response){
    var body = "";
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      res.send((body));
    });
  });
  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
});

//Set up where to get Files
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));

//Set up route for opening page
router.route('/')
    .get(function(req, res){
        response.status(200).render("index")
    });

app.use(router);
var port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening to port:", port);