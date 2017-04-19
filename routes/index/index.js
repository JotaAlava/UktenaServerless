/**
 * Created by jalava on 3/22/2017.
 */
var fs = require('fs');

module.exports.main = function (event, context, callback) {
  var fileToServe = './index.html';
  fs.readFile(fileToServe, 'utf8', function (err, fileThatWasRead) {
    if (err) {
      // Do some logging here...
    }
    //decodeURIComponent
    callback(null, fileThatWasRead.replace(/[\n\t\r]/g,""));
  });
};

//var sut = require('./index');
//sut.main({}, console.log, console.log);