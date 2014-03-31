var _ = require('underscore');

// Difficulty: 1.

// An array of array of verbs.
// The first element of the array is are the level 1 verbs, the second element
// are the level 2 verbs etc.
var verbLevels = [];

verbLevels.push([
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
]);

// Difficulty: 2.
verbLevels.push([
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

// Difficulty: 3 (être all_verbLevels).
// Re*- versions taken out.
verbLevels.push([
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
  'devenir'
]);

// The être verbLevels are conjugated differently.
// In past-participle they conjugate with être instead of avoir.
var etre_verbs = [
    "aller",
    "arriver",
    "descendre",
    "redescendre",
    "entrer",
    "rentrer",
    "monter",
    "remonter",
    "mourir",
    "naïtre",
    "renaïtre",
    "partir",
    "repartir",
    "passer",
    "rester",
    "retourner",
    "sortir",
    "ressortir",
    "tomber",
    "retomber",
    "venir",
    "devenir"
];

exports.verbLevels = verbLevels;
exports.all_verbs = _.flatten(verbLevels);
exports.etre_verbs = etre_verbs;
