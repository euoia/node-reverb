var testCase = require('../controllers/testCase.js'),
  conjugation = require('../controllers/conjugation.js'),
  insults = require('../controllers/insults.js'),
  tts = require('../controllers/tts.js'),
  util = require('util');

/*
 * GET home page.
 */

exports.newTest = function(req, res){
  test = testCase.newTest();
  console.log('test', test);

  // TODO: tts for question.
  res.render('index', {
    title: 'Pratiquer conjuguer verbes françaises',
    verb: test.verb,
    mood: test.mood,
    perspective: test.perspective,
    gender: test.gender,
    questionText: test.questionText,
    questionLeader: test.questionLeader
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

  if (response === answer.verb) {
    // TODO: Alternative masculine/feminine answers.
    var congrats = util.format('Très bien! La bonne réponse est «%s».',
      answer.text);

    tts.get(congrats, function(err, ttsCongratsPath) {
      if (err) {
        console.log('Error in tts.get', err);
        return;
      }

      var ttsCongratsURL = tts.urlFromPath(ttsCongratsPath);

      res.send({
        correct: true,
        congrats: congrats,
        audio: ttsCongratsURL
      });
    });
  } else {
    console.log('Incorrect response, response=%s answer=%s answer.text=%s', response, answer.verb, answer.text);

    var insult = util.format('%s! Vous devez répondre: «%s».',
      insults.newInsult(),
      answer.text);

    tts.get(insult, function(err, ttsInsultPath) {
      if (err) {
        console.log('Error in tts.get', err);
        return;
      }

      var ttsInsultURL = tts.urlFromPath(ttsInsultPath);

      res.send({
        correct: false,
        insult: insult,
        conjugationTable: conjugation.conjugationTable(verb, mood),
        audio: ttsInsultURL
      });
    });
  }
};
