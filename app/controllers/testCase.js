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
  'indicative_future': {
    translation: 'au futur'
  },
  'indicative_present': {
    translation: 'au indicatif présent'
  },
  'indicative_imperfect': {
    translation: "à  l'imparfait"
  },
  'conditional_present': {
    translation: 'au conditionnel'
  },
  'subjunctive_present': {
    translation: 'au subjunctif présent'
  },
  'participle_past_participle': {
  translation: 'au passé composé'
  }
};

var perspectives = exports.perspectives = {
  'first_singular': {
    translations: ['Je']
  },
  'second_singular': {
    translations: ['Tu']
  },
  'third_singular': {
    translations: ['Il', 'Elle']
  },
  'first_plural': {
    translations: ['Nous']
  },
  'second_plural': {
    translations: ['Vous']
  },
  'third_plural': {
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
