var _ = require('underscore'),
  prefs = require('../models/prefs.js');

// Rather than store the selected verbs, we'll store the deselected one.
exports.deselectVerb = function (req, res) {
  if (prefs.deselectVerb(req.session, req.body.verb) === false) {
    return res.status(403).end();
  }

  console.log('Deselected %s', req.body.verb);
  res.end();
};

exports.selectVerb = function (req, res) {
  prefs.selectVerb(req.session, req.body.verb);
  console.log('Selected %s', req.body.verb);
  res.end();
};

exports.deselectMood = function (req, res) {
  if (prefs.deselectMood(req.session, req.body.mood) === false) {
    return res.status(403).end();
  }

  console.log('Deselected %s', req.body.mood);
  res.end();
};

exports.selectMood = function (req, res) {
  prefs.selectMood(req.session, req.body.mood);
  console.log('Selected %s', req.body.mood);
  res.end();
};

exports.setAudioEnabled = function (req, res) {
  if (prefs.setAudioEnabled(req.session, req.body.enabled) === false) {
    return res.status(403).end();
  }

  console.log('Set audio enabled to %s', req.body.enabled);
  res.end();
};

exports.setOptionalAccents = function (req, res) {
  if (prefs.setOptionalAccents(req.session, req.body.enabled) === false) {
    return res.status(403).end();
  }

  console.log('set optional accents to %s', req.body.enabled);
  res.end();
};

exports.setTranslationLanguage = function (req, res) {
  if (prefs.setTranslationLanguage(req.session, req.body.translationLanguage) === false) {
    return res.status(403).end();
  }

  console.log('set translation language %s', req.body.translationLanguage);
  res.end();
};
