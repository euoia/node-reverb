var _ = require('underscore'),
  verbs = require('./verbs.js'),
  moods = require('./moods.js'),
  VError = require('verror');

var defaultVerbIfNoneSelected = 'aller';

// Rather than store the selected verbs, we'll store the deselected one.
exports.deselectVerbs = function (session, chosenVerbs, cb) {
  if (session.deselectedVerbs === undefined) {
    session.deselectedVerbs = [];
  }

  session.deselectedVerbs = session.deselectedVerbs.concat(chosenVerbs);
  session.save(function (err) {
    if (err) {
      return cb(new VError(err, 'Something went wrong saving the session.'));
    }
    cb(null);
  });

};

exports.selectVerbs = function (session, chosenVerbs, cb) {
  if (session.deselectedVerbs === undefined) {
    session.deselectedVerbs = [];
  }

  session.deselectedVerbs = _.difference(
    session.deselectedVerbs,
    chosenVerbs);

  console.log('session.deselectedVerbs', session.deselectedVerbs);

  session.save(function (err) {
    if (err) {
      return cb(new VError(err, 'Something went wrong saving the session.'));
    }
    cb(null);
  });
};

var deselectedVerbs = exports.deselectedVerbs = function (session) {
  if (session.deselectedVerbs === undefined) {
    session.deselectedVerbs = [];
  }

  return session.deselectedVerbs;
};

exports.selectedVerbs = function (session) {
  var selectedVerbs = _.difference(verbs.all_verbs, deselectedVerbs(session));
  if (selectedVerbs.length === 0) {
    return [defaultVerbIfNoneSelected];
  }

  return selectedVerbs;
};

// Rather than store the selected verbs, we'll store the deselected one.
exports.deselectMood = function (session, verb) {
  if (session.deselectedMoods === undefined) {
    session.deselectedMoods = [];
  }

  // Do not allow all moods to be deselected.
  if (session.deselectedMoods.length === moods.all_moods.length - 1) {
    return false;
  }

  session.deselectedMoods.push(verb);
  session.save();
  return true;
};

exports.selectMood = function (session, verb) {
  if (_.contains(session.deselectedMoods, verb)) {
    session.deselectedMoods = _.without(
      session.deselectedMoods, verb);
  }

  session.save();
};

var deselectedMoods = exports.deselectedMoods = function (session) {
  if (session.deselectedMoods === undefined) {
    session.deselectedMoods = [];
  }

  return session.deselectedMoods;
};

exports.selectedMoods = function (session) {
  return _.difference(moods.all_moods, deselectedMoods(session));
};

// Wehether the text-to-speech audio is enabled.
exports.ttsAudioEnabled = function (session) {
  if (session.ttsAudioEnabled === undefined) {
    // Default: off.
    session.ttsAudioEnabled = false;
  }

  return session.ttsAudioEnabled;
};

exports.setAudioEnabled = function (session, value) {
  if (value !== true && value !== false) {
    console.log('[setAudioEnabled] Value must be true or false.', value);
    return false;
  }

  session.ttsAudioEnabled = value;
  return true;
};

exports.setOptionalAccents = function (session, value) {
  if (value !== true && value !== false) {
    console.log('[setOptionalAccents] Value must be true or false.', value);
    return false;
  }

  session.optionalAccentsEnabled = value;
  return true;
};

// Wehether the text-to-speech audio is enabled.
exports.optionalAccentsEnabled = function (session) {
  if (session.optionalAccentsEnabled === undefined) {
    // Default: off.
    session.optionalAccentsEnabled = false;
  }

  return session.optionalAccentsEnabled;
};

var validTranslationLanguages = this.validTranslationLanguages = [
  'aucune',
  'anglais'
];

exports.setTranslationLanguage = function (session, value) {
  if (_.contains(validTranslationLanguages, value) === false) {
    console.log('[setTranslationLanguage] Value must be one of ', validTranslationLanguages, value);
    return false;
  }

  session.translationLanguage = value;
  return true;
};

// The language to show the verb translation in.
// Either returns: '', or 'en'.
exports.translationLanguage = function (session) {
  if (session.translationLanguage === undefined) {
    // Default: 'aucune' (no translation).
    session.translationLanguage = 'aucune';
  }

  return session.translationLanguage;
};
