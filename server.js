// This is the main file of this api
require('dotenv').config();
const http = require('http');

const url = require('url');

//creating the server
const server = http.createServer(function (req, res) {
   //parsing the url
   const parsedUrl = url.parse(req.url, true);

   // geting the path
   const path = parsedUrl.pathname;

   // disabling strict routing
   const trimmedPath = path.replace(/^\/+|\/+$/g, '');

   // the method on the  request
   const method = req.method.toLowerCase();

   // the query object
   const queryStringObject = parsedUrl.query;

   // the req headers
   const headers = req.headers;

   res.end('my name is Micheal Opeyemi Awoniran\n');
   console.log(method, trimmedPath, queryStringObject, headers);
});
const port = process.env.PORT || 5000;

server.listen(port, (req, res) => {
   console.log(`server listening on port ${port}`);
});
