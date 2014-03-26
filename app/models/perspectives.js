var verbs = require('../models/verbs.js'),
  moods = require('../models/moods.js'),
  _ = require('underscore'),
  util = require('util');

// TODO: Subjunctive.

// These are bits of text associated with various perspectives.
// first_singular   - The first-person singular form. En: I, Fr: je.
// second_singular  - The second-person singular form, En: you, Fr: tu.
// third_singular   - The third-person singular form. En: he, she; Fr: il, elle.
// second_plural    - The second-person plural form. En: you, Fr: vous.
// third_plural     - The third-person plural form. En: they, Fr: ils, elles.
//
// subject          - Starts the sentence when the mood is anything other than
//                    participle_past_participle or subjunctive_present.
// avoir            - Starts the sentence when the mood is
//                    participle_past_participle and the verb conjugates with avoir.
// etre             - Starts the sentence when the mood is
//                    participle_past_participle and the verb conjugates with être.
// verb_suffix      - Added to the verb when it the mood is
//                    participle_past_participle and the verb conjugates with être.
var perspectives = {
  'first_singular': {
    subject: 'Je',
    avoir: "J'ai",
    etre: 'Je suis',
    verb_suffix: ''
  },
  'second_singular': {
    subject: 'Tu',
    avoir: 'Tu as',
    etre: 'Tu es',
    verb_suffix: ''
  },
  'third_singular': {
    subject: 'Il',
    avoir: 'Il à',
    etre: 'Il est',
    verb_suffix: 'e',
    feminine: {
      subject: 'Elle',
      avoir: 'Elle à',
      etre: 'Elle est',
      verb_suffix: 'e'
    }
  },
  'first_plural': {
    subject: 'Nous',
    avoir: 'Nous avons',
    etre: 'Nous sommes',
    verb_suffix: 's'
  },
  'second_plural': {
    subject: 'Vous',
    avoir: 'Vous avez',
    etre: 'Vous êtes',
    verb_suffix: 's'
  },
  'third_plural': {
    subject: 'Ils',
    avoir: 'Ils ont',
    etre: 'Ils sont',
    verb_suffix: 's',
    feminine: {
      subject: 'Elles',
      avoir: 'Elles ont',
      etre: 'Elles sont',
      verb_suffix: 'es'
    }
  }
};

var all_perspectives = exports.all_perspectives = Object.keys(perspectives);

// Get the suffix which is added to a être verbs when the mood is
// participle_past_participle.
exports.verbSuffix = function (verb, perspective, gender) {
  var aspect = 'verb_suffix';

  if (gender === 'feminine' && perspectives[perspective].feminine !== undefined) {
    return perspectives[perspective].feminine[aspect];
  }

  return perspectives[perspective][aspect];
};

exports.token = function (verb, perspective, gender, mood) {
  // One of: subject, avoir, etre.
  var aspect;

  // TODO: Subjunctive.
  // Handle the participle_past_participle mood.
  if (mood === 'participle_past_participle') {
    if (_.contains(verbs.etre_verbs, verb)) {
      aspect = 'etre';
    } else {
      aspect = 'avoir';
    }
  } else {
    aspect = 'subject';
  }

  // If there's a feminine version then use it.
  if (gender === 'feminine' && perspectives[perspective].feminine !== undefined) {
    return perspectives[perspective].feminine[aspect];
  }

  return perspectives[perspective][aspect];
};

// Returns a verb that is modified according to the context of perspective,
// gender and mood.
//
// I.e. Applies a suffix to the verb when the mood is
// participle_past_participle and the verb is conjugated with être rather than
// avoir.
exports.modifyVerbForContext = function (verb, perspective, gender, mood) {
  var verbSuffix = '';

  if (mood === 'participle_past_participle' &&
    _.contains(verbs.etre_verbs, verb)
  ) {

    // If there's a feminine version then use it.
    if (perspectives[perspective].feminine !== undefined) {
      verbSuffix = perspectives[perspective].feminine.verb_suffix;
    } else {
      verbSuffix = perspectives[perspective].verb_suffix;
    }
  }

  return util.format('%s%s', verb, verbSuffix);
};

