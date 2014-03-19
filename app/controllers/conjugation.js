// Responsible for conjugating verbs.
var fs = require('fs'),
  _ = require('underscore'),
  util = require('util');

_.mixin(require('underscore.nested'));

var verbFile = fs.readFileSync(__dirname + '/../../lib/conjugation-tables/verbs-fr.js');
var verbData = JSON.parse(verbFile);

var moodFile = fs.readFileSync(__dirname + '/../../lib/conjugation-tables/conjugation-fr.js');
var moodData = JSON.parse(moodFile);

// TODO: This would be much simpler if the json file was pre-processed.
var moodPaths = {
  'infinitive_present': function(moodRules) {
    return moodRules.infinitive[0]['infinitive-present'];
  },
  'indicative_present': function(moodRules) {
    return moodRules.indicative[0].present;
  },
  'indicative_imperfect': function(moodRules) {
    return moodRules.indicative[0].imperfect;
  },
  'indicative_future': function(moodRules) {
    return moodRules.indicative[0].future;
  },
  'indicative_simple_past': function(moodRules) {
    return moodRules.indicative[0]['simple-past'];
  },
  'conditional_present': function(moodRules) {
    return moodRules.conditional[0].present;
  },
  'subjunctive_present': function(moodRules) {
    return moodRules.subjunctive[0].present;
  },
  'imperative_present': function(moodRules) {
    return moodRules.imperative[0]['imperative-present'];
  },
  'participle_present': function(moodRules) {
    return moodRules.participle[0]['present-participle'];
  },
  'participle_past_participle': function(moodRules) {
    return moodRules.participle[0]['past-participle'];
  }
};

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
var conjugate = exports.conjugate = function(verb, mood) {
  var template = verbTemplate(verb);
  var rules = moodRules(template);

  // Get the specific path to the conjugation rule for this mood.
  // The reason this is complicated is because the JSON data structure isn't
  // sensible. It was converted from XML that also wasn't very sensible (it has
  // unnecessary nesting).
  var moodPathFn = moodPaths[mood];
  if (moodPathFn === undefined) {
    throw new Error(util.format('Not a valid mood %s', mood));
  }
  var moodConjugation = moodPathFn(rules);
  if (moodConjugation === undefined) {
    console.log('Rules', rules);
    throw new Error(util.format('Unable to extract mood from rules where mood=%s', mood));
  }

  var perspectives = moodConjugation[0].p;

  // The template contains a head piece and a tail piece.
  // The head piece varies from verb to verb.
  // The tail piece is the same for all verbs that use this template.
  templatePieces = template.split(':');
  var templateHead = templatePieces[0];
  var templateTail = templatePieces[1];

  var verbSplitPoint = verb.match(templateTail + '$').index;
  var verbHead = verb.substr(0, verbSplitPoint);
  var verbTail = verb.substr(verbSplitPoint);

  function conjugate (conjugation) {
    if (conjugation) {
      return verbHead + conjugation.i;
    }

    return '';
  }

  // The perspectives are always in this order:
  // je tu il nous vous ils.
  var conjugations =  {
    'first_singular':   conjugate(perspectives[0]),
    'second_singular':  conjugate(perspectives[1]),
    'third_singular':   conjugate(perspectives[2]),
    'first_plural':     conjugate(perspectives[3]),
    'second_plural':    conjugate(perspectives[4]),
    'third_plural':     conjugate(perspectives[5])
  };

  return conjugations;
};

// Get the conjugation table for verb.
// The verb must be supplied in its infinite form.
exports.conjugationTable = function(verb) {
  var results = {};

  _.each(Object.keys(moodPaths), function(mood) {
    results[mood] = conjugate(verb, mood);
  });

  return results;
};
