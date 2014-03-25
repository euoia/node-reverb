var moods = {
  'indicative_future': {
    text: 'au futur'
  },
  'indicative_present': {
    text: 'au indicatif présent'
  },
  'indicative_imperfect': {
    text: "à  l'imparfait"
  },
  'conditional_present': {
    text: 'au conditionnel'
  },
  'subjunctive_present': {
    text: 'au subjunctif présent'
  },
  'participle_past_participle': {
    text: 'au passé composé'
  }
};

exports.all_moods = Object.keys(moods);

exports.text = function(mood) {
  return moods[mood].text;
};
