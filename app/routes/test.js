var testCase = require('../controllers/testCase.js'),
  conjugation = require('../controllers/conjugation.js'),
  insults = require('../controllers/insults.js'),
  util = require('util');

/*
 * GET home page.
 */

exports.newTest = function(req, res){
  test = testCase.newTest();
  console.log('test', test);

  res.render('index', {
    title: 'Express',
    verb: test.verb,
    mood: test.mood,
    moodText: test.moodText,
    perspective: test.perspective,
    perspectiveText: test.perspectiveText,
    answer: test.answer
  });
};

// AJAX request.
exports.check = function(req, res){
  var verb = req.body.verb,
    mood = req.body.mood,
    perspective = req.body.perspective,
    answer = req.body.answer;

  var conjugations = conjugation.conjugate(verb, mood);
  var correctAnswer = conjugations[req.body.perspective];

  if (correctAnswer === answer) {
    var congrats = util.format('Très bien! La bonne réponse est %s.', answer);
    // TODO: Alternative answers.

    res.send({
      correct: true,
      congrats: congrats
    });
  } else {
    var insult = util.format('%s! Vouz devez répondre: %s %s',
      insults.newInsult(),
      testCase.perspectives[perspective].translations[0],
      correctAnswer);

    res.send({
      correct: false,
      insult: insult,
      conjugationTable: conjugation.conjugationTable(verb, mood)
    });
  }
};
