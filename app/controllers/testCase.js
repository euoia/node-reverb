var _ = require('underscore'),
  conjugation = require('./conjugation');

// Difficulty: 1.
var verbs = [
  'aller',
  'avoir',
  'devoir',
  'dire',
  'dormir',
  'être',
  'faire',
  'lire',
  'mettre',
  'parler',
  'penser',
  'pouvoir',
  'prendre',
  'savoir',
  'vouloir'
];

// Difficulty: 2.
verbs.push.apply(verbs, [
  'acheter',
  'appeler',
  'boire',
  'boucher',
  'choisir',
  'croire',
  'couvrir',
  'écrire',
  'finir',
  'jeter',
  'manger',
  'payer',
  'placer',
  'rendre',
  'rire',
  'sentir',
  'suivre',
  'tenir',
  'valoir',
  'venir',
  'vivre',
  'voir'
]);

// Difficulty: 3 (être verbs).
// Re*- versions taken out.
verbs.push.apply(verbs, [
  'aller',
  'arriver',
  'descendre',
  'entrer',
  'rentrer',
  'monter',
  'mourir',
  'naître',
  'partir',
  'passer',
  'rester',
  'retourner',
  'sortir',
  'tomber',
  'venir',
  'devenir'
]);

var moods = {
  'indicative-future': {
    translation: 'au futur'
  },
  'indicative-present': {
    translation: 'au indicatif présent'
  },
  'indicative-imperfect': {
    translation: "à  l'imparfait"
  },
  'conditional-present': {
    translation: 'au conditionnel'
  },
  'subjunctive-present': {
    translation: 'au subjunctif présent'
  },
  'participle-past-participle': {
  translation: 'au passé composé'
  }
};

var perspectives = {
  'first-singular': {
    translations: ['Je']
  },
  'second-singular': {
    translations: ['Tu']
  },
  'third-singular': {
    translations: ['Il', 'Elle']
  },
  'first-plural': {
    translations: ['Nous']
  },
  'second-plural': {
    translations: ['Vous']
  },
  'third-plural': {
    translations: ['Ils', 'Elles']
  }
};

exports.newTest = function() {
  var verb = _.sample(verbs),
    mood = _.sample(Object.keys(moods)),
    perspective = _.sample(Object.keys(perspectives));

  var verbMoods = conjugation.conjugate(verb, mood);

  return {
    verb: verb,
    mood: mood,
    moodText: moods[mood].translation,
    perspective: perspective,
    perspectiveText: _.sample(perspectives[perspective].translations)
  };
};
