var testCase = require('../controllers/testCase.js'),
  conjugation = require('../controllers/conjugation.js'),
  insults = require('../controllers/insults.js'),
  tts = require('../controllers/tts.js'),
  verbs = require('../models/verbs.js'),
  moods = require('../models/moods.js'),
  prefs = require('../models/prefs.js'),
  util = require('util'),
  async = require('async');

/*
 * GET home page.
 */

exports.newTest = function(req, res){
  var possibleVerbs = prefs.selectedVerbs(req.session),
    possibleMoods = prefs.selectedMoods(req.session),
    test = testCase.newTest(possibleVerbs, possibleMoods);

  async.series([
    function getAudioUrlIfEnabled(callback) {
      // If audio is enabled we go into an async path.
      if (prefs.ttsAudioEnabled(req.session) === true) {
        console.log('Audio is enabled');
        tts.get(test.questionText, function(err, ttsQuestionPath) {
          if (err) {
            console.log('Error in tts.get', err);
            return;
          }

          ttsQuestionUrl = tts.urlFromPath(ttsQuestionPath);
          callback(null, ttsQuestionUrl);
        });
      } else {
        console.log('Audio not enabled');
        callback(null, null);
      }
    }],
    function renderPage(err, ttsQuestionUrl) {
      res.render('index', {
        title: 'Pratiquer la conjugaison des verbes en français',
        verb: test.verb,
        mood: test.mood,
        perspective: test.perspective,
        gender: test.gender,
        questionAudio: ttsQuestionUrl,
        questionText: test.questionText,
        questionLeader: test.questionLeader,
        verbLevels: verbs.verbLevels,
        deselectedVerbs: JSON.stringify(prefs.deselectedVerbs(req.session)),
        moods: moods.moods,
        deselectedMoods: JSON.stringify(prefs.deselectedMoods(req.session)),
        ttsAudioEnabled: prefs.ttsAudioEnabled(req.session)
      });
  });
};

// AJAX request.
exports.check = function(req, res){
  var verb = req.body.verb,
    mood = req.body.mood,
    perspective = req.body.perspective,
    gender = req.body.gender,
    response = req.body.response;

  console.dir(req.body);

  var answer = testCase.answer(verb, perspective, mood, gender);

  console.log('[test check] response=%s answer=%s answer.text=%s', response, answer.verb, answer.text);
  if (response === answer.verb) {
    // TODO: Alternative masculine/feminine answers.
    var congrats = util.format('Très bien! La bonne réponse est «%s».',
      answer.text);

    tts.get(congrats, function(err, ttsCongratsPath) {
      if (err) {
        console.log('Error in tts.get', err);
        return;
      }

      var ttsCongratsUrl = tts.urlFromPath(ttsCongratsPath);

      res.send({
        correct: true,
        congrats: congrats,
        audio: ttsCongratsUrl
      });
    });
  } else {
    var insult = util.format('%s! Vous devez répondre: «%s».',
      insults.newInsult(),
      answer.text);

    tts.get(insult, function(err, ttsInsultPath) {
      if (err) {
        console.log('Error in tts.get', err);
        return;
      }

      var ttsInsultUrl = tts.urlFromPath(ttsInsultPath);

      res.send({
        correct: false,
        insult: insult,
        conjugationTable: conjugation.conjugationTable(verb, mood),
        audio: ttsInsultUrl
      });
    });
  }
};
