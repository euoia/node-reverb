// Responsible for conjugating verbs.
var fs = require('fs'),
  _ = require('underscore'),
  util = require('util'),
  perspectives = require('../models/perspectives.js');
  moods = require('../models/moods.js');

_.mixin(require('underscore.nested'));

var verbFile = fs.readFileSync(__dirname + '/../../lib/conjugation-tables/verbs-fr.js');
var verbData = JSON.parse(verbFile);

var moodFile = fs.readFileSync(__dirname + '/../../lib/conjugation-tables/conjugation-fr.js');
var moodData = JSON.parse(moodFile);

// Given a moodRules object get the conjugation rules for a specific mood from
// it.
// The conjugation rules for each mood are stored in different places in the
// moodRules object.
// TODO: Preprocess the json into a more sensible format to make this simpler.
function getConjugationRulesFromMoodRules(mood, moodRules) {
  // Nb. The reason this is complicated is because the JSON data structure
  // isn't sensible. It was converted from XML that also wasn't very sensible
  // (it has unnecessary nesting).
  switch (mood) {
    case 'infinitive_present':
      return moodRules.infinitive[0]['infinitive-present'][0].p;
    case 'indicative_present':
      return moodRules.indicative[0].present[0].p;
    case 'indicative_imperfect':
      return moodRules.indicative[0].imperfect[0].p;
    case 'indicative_future':
      return moodRules.indicative[0].future[0].p;
    case 'indicative_simple_past':
      return moodRules.indicative[0]['simple-past'][0].p;
    case 'conditional_present':
      return moodRules.conditional[0].present[0].p;
    case 'subjunctive_present':
      return moodRules.subjunctive[0].present[0].p;
    case 'imperative_present':
      return moodRules.imperative[0]['imperative-present'][0].p;
    case 'participle_present':
      return moodRules.participle[0]['present-participle'][0].p;
    case 'participle_past_participle':
      return moodRules.participle[0]['past-participle'][0].p;
    default:
      console.log('Invalid mood: %s', mood);
    return null;
  }
}

// Given the infinitive form of a verb, return the template that is used for
// that verb. For example, the verbs ambiancer, amorcer, annoncer all use the
// template pla:cer.
//
// The template can then used to get the conjugation rules.
var verbTemplate = exports.verbTemplate = function(verb) {
  var verbObjs = verbData['verbs-fr'].v;

  var verbObj = _.find(verbObjs, function(verbObj) {
    return (verbObj.i[0] === verb);
  });

  var verbTemplate = verbObj.t[0];
  return verbTemplate;
};

// Given a verbTemplate, get the conjugation rules for verbs that conjugate in
// that way. Note that the verbTemplate will still be required to produce the
// final conjugated verb because its necessary to know where to split the
// template.
var moodRules = exports.moodRules = function(verbTemplate) {
  var moodObjs = moodData['conjugation-fr'].template;

  return _.find(moodObjs, function(moodObj) {
    var r = (moodObj.$.name.trim() === verbTemplate.trim());
    return r;
  });
};

// Get the conjugated forms of a verb from all perspectives.
// See moodPaths above for the valid moods.
// TODO: This could be quicker if the verbTemplate was cached.
var conjugationsInMood = exports.conjugationsInMood = function(verb, mood) {
  var template = verbTemplate(verb);
  var rules = moodRules(template);

  // Get the specific path to the conjugation rule for this mood.
  var conjugationRules = getConjugationRulesFromMoodRules(mood, rules);
  if (conjugationRules === null) {
    // This is an error.
    return null;
  }

  // The template contains a head piece and a tail piece.
  // The head piece varies from verb to verb.
  // The tail piece is the same for all verbs that use this template.
  templatePieces = template.split(':');
  var templateHead = templatePieces[0];
  var templateTail = templatePieces[1];

  var verbSplitPoint = verb.match(templateTail + '$').index;
  var verbHead = verb.substr(0, verbSplitPoint);
  var verbTail = verb.substr(verbSplitPoint);

  function createConjugatedVerb (perspectiveRule) {
    var verbEnding = perspectiveRule.i;
    return util.format('%s%s', verbHead, verbEnding);
  }

  function createConjugatedPastParticiple (perspectiveRule, perspective) {
    var verbEnding = perspectiveRule.i;
    var conjugatedVerb = util.format('%s%s', verbHead, verbEnding);
    var conjugatedVerbModifiedForContext = perspectives.modifyVerbForContext(
      conjugatedVerb, verb, perspective, mood, 'masculine');

    return conjugatedVerbModifiedForContext;
  }

  var conjugations;
  if (mood === 'participle_past_participle') {
    // Conjugating in the past_participle mood is a special case.
    conjugations =  {
      'first_singular':   createConjugatedPastParticiple(conjugationRules[0], 'first_singular'),
      'second_singular':  createConjugatedPastParticiple(conjugationRules[0], 'second_singular'),
      'third_singular':   createConjugatedPastParticiple(conjugationRules[0], 'third_singular'),
      'first_plural':     createConjugatedPastParticiple(conjugationRules[0], 'first_plural'),
      'second_plural':    createConjugatedPastParticiple(conjugationRules[0], 'second_plural'),
      'third_plural':     createConjugatedPastParticiple(conjugationRules[0], 'third_plural')
    };
  } else {
    // The perspective rules are always in this order:
    // je tu il nous vous ils.
    conjugations =  {
      'first_singular':   createConjugatedVerb(conjugationRules[0]),
      'second_singular':  createConjugatedVerb(conjugationRules[1]),
      'third_singular':   createConjugatedVerb(conjugationRules[2]),
      'first_plural':     createConjugatedVerb(conjugationRules[3]),
      'second_plural':    createConjugatedVerb(conjugationRules[4]),
      'third_plural':     createConjugatedVerb(conjugationRules[5])
    };
  }

  return conjugations;
};

// Get the conjugation table for verb.
// The verb must be supplied in its infinite form.
exports.conjugationTable = function(verb) {
  var results = {};

  _.each(moods.all_moods, function(mood) {
    results[mood] = conjugationsInMood(verb, mood);
  });

  return results;
};

exports.conjugate = function (verb, perspective, mood, gender) {
  var moodConjugations = conjugationsInMood(verb, mood);

  // Get the base conjugated version of the verb.
  var conjugatedVerb = moodConjugations[perspective];

  // In some contexts the conjugated verb is modified.
  var conjugatedVerbModifiedForContext = perspectives.modifyVerbForContext(
    conjugatedVerb, perspective, mood, gender);

  return conjugatedVerbModifiedForContext;

};
