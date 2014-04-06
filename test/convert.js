convert = require('../app/models/convert.js'),
  assert = require('assert');

assert.equal('preference',
  convert.convertAccentedCharacters('préférence')
);
