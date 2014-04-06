var _ = require('underscore'),
  verbs = require('./verbs.js'),
  moods = require('./moods.js');

// Rather than store the selected verbs, we'll store the deselected one.
exports.deselectVerb = function (session, verb) {
  if (session.deselectedVerbs === undefined) {
    session.deselectedVerbs = [];
  }

  // Do not allow all verbs to be deselected.
  if (session.deselectedVerbs.length === verbs.all_verbs.length - 1) {
    return false;
  }

  session.deselectedVerbs.push(verb);
  session.save();
  return true;
};

exports.selectVerb = function (session, verb) {
  if (_.contains(session.deselectedVerbs, verb)) {
    session.deselectedVerbs = _.without(
      session.deselectedVerbs, verb);
  }

  session.save();
};

var deselectedVerbs = exports.deselectedVerbs = function (session) {
  if (session.deselectedVerbs === undefined) {
    session.deselectedVerbs = [];
  }

  return session.deselectedVerbs;
};

exports.selectedVerbs = function (session) {
  return _.difference(verbs.all_verbs, deselectedVerbs(session));
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
