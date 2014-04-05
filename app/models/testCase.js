var _ = require('underscore'),
  conjugation = require('./conjugation.js'),
  sentences = require('./sentences.js'),
  verbs = require('./verbs.js'),
  moods = require('./moods.js'),
  perspectives = require('./perspectives.js'),
  util = require('util');


exports.newTest = function(possibleVerbs, possibleMoods) {
  var verb = _.sample(possibleVerbs),
    mood = _.sample(possibleMoods),
    perspective = _.sample(perspectives.all_perspectives),
    gender = _.sample(sentences.genders);

  // The question text provides the first part of a statement. For example:
  // Je ... (most moods)
  // J'ai ... (passé composé avoir verb)
  // Je suis ... (passé composé être verb)
  // Il faut que je ... (subjuntive)

  // Start of a sentence, the user must finish it.
  var sentenceBeginning = sentences.beginning(verb, perspective, mood, gender);

  var questionText = util.format(
    'Conjuguez le verbe «%s» %s…',
    verb,
    moods.text(mood));

  return {
    verb: verb,
    mood: mood,
    perspective: perspective,
    gender: gender,
    questionText: questionText,
    questionLeader: sentenceBeginning
  };
};

// Returns an array of acceptable answers.
// Each answer object has a verb and text property.
exports.answers = function (verb, perspective, mood, gender) {
  // Generate the full sentence beginning.
  var sentenceBeginning = sentences.beginning(verb, perspective, mood, gender);

  // Get the conjugations in all perspectives for this verb/mood combo.
  var conjugatedVerbs = conjugation.conjugate(verb, perspective, mood, gender);

  return _.map(conjugatedVerbs, function (verb) {
    var sentence = util.format('%s%s', sentenceBeginning, verb);

    return {
      verb: verb,
      text: sentence
    };
  });
};
