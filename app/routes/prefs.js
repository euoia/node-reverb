var _ = require('underscore'),
  prefs = require('../models/prefs.js');

exports.deselectVerbs = function(req, res) {
  prefs.deselectVerbs(req.session, req.body.verbs, function (err) {
    if (err !== null) {
      console.log('Error deselecting verbs:', err.message);
      return res.status(403).end();
    }

    console.log('Deselected %s', req.body.verbs);
    res.end();
  });
};

exports.selectVerbs = function (req, res) {
  prefs.selectVerbs(req.session, req.body.verbs, function (err) {
    if (err !== null) {
      console.log('Error selecting verbs:', err.message);
      return res.status(403).end();
    }

    console.log('Selected %s', req.body.verbs);
    res.end();
  });
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
