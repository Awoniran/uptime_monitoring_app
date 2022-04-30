"use strict";

// This is the main file of this api
require('dotenv').config();

var http = require('http');

var url = require('url');

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  var method = req.method.toLowerCase();
  res.end('my name is Micheal Opeyemi Awoniran\n');
  console.log(method, trimmedPath);
});
var port = process.env.PORT || 50000;
server.listen(port, function (req, res) {
  console.log("server listening on port ".concat(port));
});