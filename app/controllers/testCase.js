var _ = require('underscore'),
  conjugation = require('./conjugation.js'),
  sentences = require('./sentences.js'),
  verbs = require('../models/verbs.js'),
  moods = require('../models/moods.js'),
  util = require('util');


exports.newTest = function() {
  var verb = _.sample(verbs.all_verbs),
    mood = _.sample(moods.all_moods),
    perspective = _.sample(sentences.perspectives),
    gender = _.sample(sentences.genders);

  // The question text provides the first part of a statement. For example:
  // Je ... (most moods)
  // J'ai ... (passé composé avoir verb)
  // Je suis ... (passé composé être verb)
  // Il faut que je ... (subjuntive)

  // Start of a sentence, the user must finish it.
  var sentenceBeginning = sentences.beginning(verb, perspective, mood, gender);

  var questionText = util.format(
    'Conjuguer le verbe «%s» %s …',
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

exports.answer = function (verb, perspective, mood, gender) {
  // Get the conjugations in all perspectives for this verb/mood combo.
  var conjugations = conjugation.conjugate(verb, mood);

  // Get the conjugation in a specific perspective.
  var conjugatedVerb = conjugations[perspective];

  // Generate the full expected response.
  var sentenceBeginning = sentences.beginning(verb, perspective, mood, gender);

  var conjugationText = util.format('%s %s', sentenceBeginning, conjugatedVerb);

  return {
    verb: conjugatedVerb,
    text: conjugationText
  };
};
