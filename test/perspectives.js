var perspectives = require('../app/models/perspectives.js'),
  assert = require('assert');

assert.equal(
  perspectives.snippet('prendre', 'second_singular', 'subjunctive_present', 'feminine'),
  'Il faut que tu '
);
