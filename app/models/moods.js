var moods = {
  'indicative_present': {
    text: "à l'indicatif présent"
  },
  'indicative_future': {
    text: 'au futur'
  },
  'indicative_imperfect': {
    text: "à l'imparfait"
  },
  'conditional_present': {
    text: 'au conditionnel'
  },
  'subjunctive_present': {
    text: 'au subjonctif présent'
  },
  'participle_past_participle': {
    text: 'au passé composé'
  }
};

exports.all_moods = Object.keys(moods);

exports.text = function(mood) {
  return moods[mood].text;
};
