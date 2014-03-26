// TODO: Subjunctive.
var perspectives = {
  'first_singular': {
    subject: 'Je',
    avoir: "J'ai",
    etre: 'Je suis',
    past_participle_etre_verb_ending: ''
  },
  'second_singular': {
    subject: 'Tu',
    avoir: 'Tu as',
    etre: 'Tu es',
    past_participle_etre_verb_ending: ''
  },
  'third_singular': {
    subject: 'Il',
    avoir: 'Il à',
    etre: 'Il est',
    past_participle_etre_verb_ending: 'e',
    feminine: {
      subject: 'Elle',
      avoir: 'Elle à',
      etre: 'Elle est',
      past_participle_etre_verb_ending: 'e'
    }
  },
  'first_plural': {
    subject: 'Nous',
    avoir: 'Nous avons',
    etre: 'Nous sommes',
    past_participle_etre_verb_ending: 's'
  },
  'second_plural': {
    subject: 'Vous',
    avoir: 'Vous avez',
    etre: 'Vous êtes',
    past_participle_etre_verb_ending: 's'
  },
  'third_plural': {
    subject: 'Ils',
    avoir: 'Ils ont',
    etre: 'Ils sont',
    past_participle_etre_verb_ending: 's',
    feminine: {
      subject: 'Elles',
      avoir: 'Elles ont',
      etre: 'Elles sont',
      past_participle_etre_verb_ending: 'es'
    }
  }
};

var all_perspectives = exports.all_perspectives = Object.keys(perspectives);

exports.past_participle_etre_verb_ending = function (verb, perspective, gender) {
  var aspect = 'past_participle_etre_verb_ending';

  if (gender === 'feminine' && perspectives[perspective].feminine !== undefined) {
    return perspectives[perspective].feminine[aspect];
  }

  return perspectives[perspective][aspect];
};

exports.
