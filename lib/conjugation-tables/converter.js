var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
var file = process.argv[2];
var outfile = file.replace('.xml', '.js');

console.log('Converting %s to %s', file, outfile);
fs.readFile(file, function(err, data) {
  if (err) {
    console.log('Error reading file.');
    console.dir(err);
    throw (err);
  }

  parser.parseString(data, function (err, result) {
    if (err) {
      console.log('Error parsing XML.');
      console.dir(err);
      throw (err);
    }

    fs.writeFile(outfile, JSON.stringify(result), function(err, data) {
      if (err) {
        console.log('Error writing file.');
        console.dir(err);
        throw (err);
      }

      console.log('Done.');
    });
  });
});
