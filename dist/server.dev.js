"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This is the main file of this api
require('dotenv').config();

var http = require('http');

var url = require('url');

var stringDecoder = require('string_decoder').StringDecoder; //creating the server


var server = http.createServer(function (req, res) {
  //parsing the url
  var parsedUrl = url.parse(req.url, true); // getting the path

  var path = parsedUrl.pathname; // disabling strict routing

  var trimmedPath = path.replace(/^\/+|\/+$/g, ''); // the method on the  request

  var method = req.method.toLowerCase(); // the query object

  var queryStringObject = parsedUrl.query; // the req headers

  var headers = req.headers; //get payload if any

  var decoder = new stringDecoder('utf-8');
  var buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', function () {
    var chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };
    chosenHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode === 'number' ? statusCode : 200;
      payload = _typeof(payload) === 'object' ? payload : {};
      var payloadString = JSON.stringify(payload);
      res.setHeader('content-type', 'application/json');
      console.log(payloadString);
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});
var port = process.env.PORT || 5000;
server.listen(port, function (req, res) {
  console.log("server listening on port ".concat(port));
}); //event handlers

var handlers = {};

handlers.sample = function (data, callback) {
  callback(406, {
    name: 'sample handler'
  });
};

handlers.notFound = function (data, callback) {
  callback(404);
}; //router object


var router = {
  sample: handlers.sample
};