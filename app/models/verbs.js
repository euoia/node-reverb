var _ = require('underscore');

// Difficulty: 1.

// An array of array of verbs.
// The first element of the array is are the level 1 verbs, the second element
// are the level 2 verbs etc.
var verbLevels = [];

verbLevels.push([
  'aller',
  'appeler',
  'avoir',
  'devoir',
  'dire',
  'dormir',
  'ennuyer',
  'être',
  'faire',
  'lire',
  'manger',
  'mettre',
  'parler',
  'penser',
  'pouvoir',
  'prendre',
  'produire',
  'savoir',
  'secourir',
  'vouloir'
]);

// Difficulty: 2.
verbLevels.push([
  'abstenir',
  'acheter',
  'admettre',
  'battre',
  'boire',
  'boucher',
  'choisir',
  'croire',
  'courir',
  'couvrir',
  'écrire',
  'envoyer',
  'finir',
  'jeter',
  'maintenir',
  'mordre',
  'ouvrir',
  'payer',
  'perdre',
  'placer',
  'plaindre',
  'plaire',
  'préférer',
  'rendre',
  'rire',
  'recevoir',
  'sentir',
  'suivre',
  'tenir',
  'tondre',
  'valoir',
  'venir',
  'vivre',
  'voir'
]);

// Difficulty: 3 (être all_verbLevels).
// Re*- versions taken out.
verbLevels.push([
  'arriver',
  'conclure',
  'conduire',
  'cueillir',
  'descendre',
  'épandre',
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
