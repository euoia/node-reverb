var verbs = require('./verbs.js'),
  moods = require('./moods.js'),
  _ = require('underscore'),
  util = require('util'),
  conjugation = require('./conjugation.js');

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
    subject: 'Je ',
    avoir: "J'ai ",
    etre: 'Je suis ',
    subjunctive: 'Il faut que je ',
    verb_suffix: ''
  },
  'second_singular': {
    subject: 'Tu ',
    avoir: 'Tu as ',
    etre: 'Tu es ',
    subjunctive: 'Il faut que tu ',
    verb_suffix: ''
  },
  'third_singular': {
    subject: 'Il ',
    avoir: 'Il a ',
    etre: 'Il est ',
    subjunctive: "Il faut qu'il ",
    verb_suffix: '',
    feminine: {
      subject: 'Elle ',
      avoir: 'Elle a ',
      etre: 'Elle est ',
      subjunctive: "Il faut qu'elle ",
      verb_suffix: 'e'
    }
  },
  'first_plural': {
    subject: 'Nous ',
    avoir: 'Nous avons ',
    etre: 'Nous sommes ',
    subjunctive: 'Il faut que nous ',
    verb_suffix: 's'
  },
  'second_plural': {
    subject: 'Vous ',
    avoir: 'Vous avez ',
    etre: 'Vous êtes ',
    subjunctive: 'Il faut que vous ',
    verb_suffix: 's'
  },
  'third_plural': {
    subject: 'Ils ',
    avoir: 'Ils ont ',
    etre: 'Ils sont ',
    subjunctive: "Il faut qu'ils ",
    verb_suffix: 's',
    feminine: {
      subject: 'Elles ',
      avoir: 'Elles ont ',
      etre: 'Elles sont ',
      subjunctive: "Il faut qu'elles ",
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

// Returns one of the entries from the perspectives object.
exports.snippet = function (verb, perspective, mood, gender) {
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

  if (mood === 'subjunctive_present') {
    aspect = 'subjunctive';
  }

  // If there's a feminine version then use it.
  if (gender === 'feminine' &&
      perspectives[perspective].feminine !== undefined
  ) {
    return perspectives[perspective].feminine[aspect];
  }

  // Well this is a bit nasty. It handles the case where the correct answer
  // starts with a vowel and the snippet ends with "Je".
  if (perspective === 'first_singular') {
    conjugatedVerbs = conjugation.conjugate(verb, perspective, mood, gender);

    // Just use the first one.
    var firstAnswer = conjugatedVerbs[0];
    var firstLetterOfFirstAnswer = firstAnswer[0];
    if (firstLetterOfFirstAnswer === 'a' ||
        firstLetterOfFirstAnswer === 'é' ||
        firstLetterOfFirstAnswer === 'e' ||
        firstLetterOfFirstAnswer === 'i' ||
        firstLetterOfFirstAnswer === 'o' ||
        firstLetterOfFirstAnswer === 'u'
    ) {
      if (aspect === 'subject') {
        return "J'";
      } else if (aspect === 'subjunctive') {
        return "Il faut que j'";
      }
    }
  }

  return perspectives[perspective][aspect];
};

// Returns a verb that is modified according to the context of perspective,
// gender and mood.
//
// I.e. Applies a suffix to the verb when the mood is
// participle_past_participle and the verb is conjugated with être rather than
// avoir.
exports.modifyVerbForContext = function (conjugatedVerb, verb, perspective, mood, gender) {
  var verbSuffix = '';

  if (mood === 'participle_past_participle' &&
    _.contains(verbs.etre_verbs, verb)
  ) {
    // If there's a feminine version then use it.
    if (gender === 'feminine' &&
        perspectives[perspective].feminine !== undefined
    ) {
      verbSuffix = perspectives[perspective].feminine.verb_suffix;
    } else {
      verbSuffix = perspectives[perspective].verb_suffix;
    }
  }

  return util.format('%s%s', conjugatedVerb, verbSuffix);
};

