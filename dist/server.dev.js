"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This is the main file of this api
require('dotenv').config();

var http = require('http');

var url = require('url');

var stringDecoder = require('string_decoder').StringDecoder;

var data = require('./lib/data'); // console.log(data);


data.create('test', 'newFile', {
  foo: 'bar'
}, function (err) {
  return [console.log(err)];
}); //creating the server

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  var method = req.method.toLowerCase();
  var queryStringObject = parsedUrl.query;
  var headers = req.headers;
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

handlers.ping = function (data, callback) {
  callback(200);
};

handlers.notFound = function (data, callback) {
  callback(404);
}; //router object


var router = {
  ping: handlers.ping
};