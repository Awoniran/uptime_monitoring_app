//for manipulating data

const fs = require('fs');
const path = require('path');

// fs.createReadStream({ path: '' });
const lib = {};

//base_dir
lib.baseDir = path.join(__dirname, '/../data/');
lib.create = function (dir, file, data, callback) {
   fs.open(
      lib.baseDir + dir + '/' + file + '.json',
      function (err, fileDescriptor) {
         if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
               if (!err) {
                  fs.close(fileDescriptor, (err) => {
                     if (!err) {
                        callback(false);
                     } else {
                        callback('Error closing file');
                     }
                  });
               } else {
                  callback(`error writing file to ${dir}`);
               }
            });
         } else {
            console.log(err);
            callback('could not create new file');
         }
      }
   );
};

module.exports = lib;
