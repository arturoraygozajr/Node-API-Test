'use strict';

var http = require('http');

var md5 = require('md5');
var server = http.createServer(function(req, res){
	console.log('request!', req.method);
	console.log('url:', req.url);
  var urlParts = req.url.match(/[^/]+/g);

  console.log('urlParts:', urlParts);

  switch(urlParts[0]) {
    case 'time':
    var timestamp = Date.now();
    res.end(timestamp + '\n');
    break;
    case 'math':

    if(urlParts[1] === 'add') {
      var numtoadd = urlParts.slice(2);
      var numtoadd2 = numtoadd.map(Number);
      var result = numtoadd2.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      });
      res.end(result + '\n');
    } else if (urlParts[1] === 'square') {
      var a = parseInt(urlParts[2]);
      var sqStr = (a * a).toString();

      res.end(sqStr + '\n');
    }
    break;
    case 'sentence':
    var words = urlParts[1].split('%20');
    var numOfWords = words.length;
    var numOfSpaces = words.length - 1;
    var letters = words.join('').length;
    var result = {
      words: numOfWords,
      spaces: numOfSpaces,
      letters: letters
    }
    var stringified = JSON.stringify(result);
    res.end(stringified + '\n');
    break;
    case 'gravitar':
      var email = urlParts[1]
      var md5Email = md5(email);
      var response = "http://www.gravatar.com/avatar/"+md5Email;
      res.end(response + '\n');
    break;

    default:
    res.end('nothing');

  }
});

server.listen(4000);