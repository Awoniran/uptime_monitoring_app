"use strict";

//for manipulating data
var fs = require('fs');

var path = require('path'); // fs.createReadStream({ path: '' });


var lib = {}; //base_dir

lib.baseDir = path.join(__dirname, '/../data/');

lib.create = function (dir, file, data, callback) {
  fs.open(lib.baseDir + dir + '/' + file + '.json', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      var stringData = JSON.stringify(data);
      fs.writeFile(fileDescriptor, stringData, function (err) {
        if (!err) {
          fs.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing file');
            }
          });
        } else {
          callback("error writing file to ".concat(dir));
        }
      });
    } else {
      console.log(err);
      callback('could not create new file');
    }
  });
};

module.exports = lib;