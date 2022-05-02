// This is the main file of this api
require('dotenv').config();
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const data = require('./lib/data');
// console.log(data);

data.create('test', 'newFile', { foo: 'bar' }, (err) => [console.log(err)]);
//creating the server
const server = http.createServer(function (req, res) {
   const parsedUrl = url.parse(req.url, true);
   const path = parsedUrl.pathname;
   const trimmedPath = path.replace(/^\/+|\/+$/g, '');
   const method = req.method.toLowerCase();
   const queryStringObject = parsedUrl.query;
   const headers = req.headers;
   const decoder = new stringDecoder('utf-8');
   let buffer = '';
   req.on('data', (data) => {
      buffer += decoder.write(data);
   });
   req.on('end', () => {
      var chosenHandler =
         typeof router[trimmedPath] !== 'undefined'
            ? router[trimmedPath]
            : handlers.notFound;
      const data = {
         trimmedPath,
         queryStringObject,
         method,
         headers,
         payload: buffer,
      };
      chosenHandler(data, function (statusCode, payload) {
         statusCode = typeof statusCode === 'number' ? statusCode : 200;
         payload = typeof payload === 'object' ? payload : {};
         let payloadString = JSON.stringify(payload);
         res.setHeader('content-type', 'application/json');
         console.log(payloadString);
         res.writeHead(statusCode);
         res.end(payloadString);
      });
   });
});

const port = process.env.PORT || 5000;
server.listen(port, (req, res) => {
   console.log(`server listening on port ${port}`);
});

//event handlers
const handlers = {};

handlers.ping = function (data, callback) {
   callback(200);
};

handlers.notFound = function (data, callback) {
   callback(404);
};
//router object
const router = {
   ping: handlers.ping,
};
