var verbs = require('../models/verbs.js'),
  moods = require('../models/moods.js'),
  _ = require('underscore');

var genders = exports.genders = [
  'masculine',
  'feminine'
];

// TODO: Subjunctive.
var beginnings = {
  'first_singular': {
    subject: 'Je',
    avoir: "J'ai",
    etre: 'Je suis'
  },
  'second_singular': {
    subject: 'Tu',
    avoir: 'Tu as',
    etre: 'Tu es'
  },
  'third_singular': {
    subject: 'Il',
    avoir: 'Il à',
    etre: 'Il est',
    feminine: {
      subject: 'Elle',
      avoir: 'Elle à',
      etre: 'Elle est'
    }
  },
  'first_plural': {
    subject: 'Nous',
    avoir: 'Nous avons',
    etre: 'Nous sommes'
  },
  'second_plural': {
    subject: 'Vous',
    avoir: 'Vous avez',
    etre: 'Vous êtes'
  },
  'third_plural': {
    subject: 'Ils',
    avoir: 'Ils ont',
    etre: 'Ils sont',
    feminine: {
      subject: 'Elles',
      avoir: 'Elles ont',
      etre: 'Elles sont'
    }
  }
};

var all_perspectives = exports.all_perspectives = Object.keys(beginnings);

// perspective is one of: first_singular, second_singular, third_singular,
// first_plural, second_plural, third_plural.
// gender is one of: masculine, feminine.
// verb is a verb in its infinitive form.
exports.beginning = function (verb, perspective, mood, gender) {
  if (_.contains(all_perspectives, perspective) === false) {
    console.log('Error: Not a valid perspective: %s', perspective);
    return;
  }

  if (_.contains(genders, gender) === false) {
    console.log('Error: Not a valid gender: %s', gender);
    return;
  }

  if (_.contains(moods.all_moods, mood) === false) {
    console.log('Error: Not a valid mood: %s', mood);
    return;
  }

  // One of: subject, avoir, etre.
  var aspect;

  // TODO: Subjuntive.
  if (mood === 'participle_past_participle') {
    if (_.contains(verbs.etre_verbs, verb)) {
      aspect = 'etre';
    } else {
      aspect = 'avoir';
    }
  } else {
    aspect = 'subject';
  }


  if (gender === 'feminine' && beginnings[perspective].feminine !== undefined) {
    return beginnings[perspective].feminine[aspect];
  }

  return beginnings[perspective][aspect];
};

exports.perspectives = Object.keys(beginnings);
