"use strict";

// This is the main file of this api
require('dotenv').config();

var http = require('http');

var url = require('url'); //creating the server


var server = http.createServer(function (req, res) {
  //parsing the url
  var parsedUrl = url.parse(req.url, true); // geting the path

  var path = parsedUrl.pathname; // disabling strict routing

  var trimmedPath = path.replace(/^\/+|\/+$/g, ''); // the method on the  request

  var method = req.method.toLowerCase(); // the query object

  var queryStringObject = parsedUrl.query; // the req headers

  var headers = req.headers;
  res.end('my name is Micheal Opeyemi Awoniran\n');
  console.log(method, trimmedPath, queryStringObject, headers);
});
var port = process.env.PORT || 5000;
server.listen(port, function (req, res) {
  console.log("server listening on port ".concat(port));
});