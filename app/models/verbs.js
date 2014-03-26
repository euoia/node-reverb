// Difficulty: 1.
var all_verbs = [
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
all_verbs.push.apply(all_verbs, [
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

// Difficulty: 3 (être all_verbs).
// Re*- versions taken out.
all_verbs.push.apply(all_verbs, [
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

// The être verbs are conjugated differently.
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

exports.all_verbs = all_verbs;
exports.etre_verbs = etre_verbs;
