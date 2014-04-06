var _ = require('underscore');

var convertChars = {
  'à': 'a',
  'é': 'e',
  'ê': 'e',
  'è': 'e',
  'ë': 'e',
  'î': 'i',
  'ï': 'i',
  'ô': 'o',
  'ù': 'u',
  'û': 'u',
  'ü': 'u',
  'ÿ': 'y'
};

exports.convertAccentedCharacters = function(input) {
  _.each(convertChars, function (val, key) {
    var r = new RegExp (key, 'g');
    input = input.replace(r, val);
  });

  return input;
};
