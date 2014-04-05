var verbs = require('./verbs.js'),
  moods = require('./moods.js'),
  perspectives = require('./perspectives.js'),
  _ = require('underscore');

var genders = exports.genders = [
  'masculine',
  'feminine'
];

// perspective is one of: first_singular, second_singular, third_singular,
// first_plural, second_plural, third_plural.
// gender is one of: masculine, feminine.
// verb is a verb in its infinitive form.
exports.beginning = function (verb, perspective, mood, gender) {
  if (_.contains(perspectives.all_perspectives, perspective) === false) {
    console.log('Error: Not a valid perspective: %s', perspective);
    return;
  }

  if (_.contains(genders, gender) === false) {
    console.log('Error: Not a valid gender: %s', gender);
    return;
  }

  if (_.contains(moods.all_moods, mood) === false) {
    console.log('Error: Not a valid mood: %s', mood);
    return;
  }

  return perspectives.snippet(verb, perspective, mood, gender);
};
