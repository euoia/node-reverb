var util = require('util'),
  crypto = require('crypto'),
  path = require('path'),
  request = require('request'),
  fs = require('fs');

var cacheIndex = './public/tts_cache/index.txt';
var cacheDir = './public/tts_cache';
var apiRoot = 'http://translate.google.com/translate_tts?tl=fr&q=';

function makeAPIUrl (str) {
  return util.format('%s%s', apiRoot, str);
}

function makeStrPath(str) {
  var sha1sum = crypto.createHash('sha1');
  var strHash = sha1sum.update(str);
  var filename = util.format('%s%s', strHash.digest('hex'), '.mp3');
  return path.join(cacheDir, filename);
}

function updateIndex(path, str) {
  var lineToWrite = util.format('%s %s\n', path, str);
  fs.appendFile(cacheIndex, lineToWrite, function(err) {
    if (err) {
      console.log('Error updating index file: %s', err);
      return;
    }

    console.log('Added to index: [path=%s] [str=%s]', path, str);
  });
}

// Gets a string to speak into the filesystem and returns the path to it.
exports.get = function(strToSpeak) {
  var strPath = makeStrPath(strToSpeak);
  if (fs.existsSync(strPath)) {
    return strPath;
  }

  var APIUrl = makeAPIUrl(strToSpeak);
  var options = {
    url: APIUrl,
    headers: {
      'User-Agent': ''
    }
  };

  request.get(options, function (error, response, body) {
    if (error) {
      console.log('Error getting string to speak: %s', error);
      console.log('Additional error information: strToSpeak=%s');
      return;
    }

    if (response.statusCode !== 200) {
      console.log('Received unexpected status code while getting string to speak. ' +
        'Status code=%d', response.statusCode);
      console.log('Additional error information: strToSpeak=%s');
      return;
    }

    fs.writeFile(strPath, body, {encoding: 'binary'}, function (err) {
      if (err) {
        console.log('Error occurred writing file [file=%s]: %s', strPath, err);
        return;
      }

      // Store a mapping from the file path to the string in the filesystem.
      updateIndex(strPath, strToSpeak);
    });

  });

  var req = request.get(APIUrl);
  req.pipe(fs.createWriteStream(strPath));

  return strPath;
};
