var testCase = require('../controllers/testCase.js'),
  conjugation = require('../controllers/conjugation.js');

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
  var conjugations = conjugation.conjugate(
    req.body.verb,
    req.body.mood);

  if (conjugations[req.body.perspective] === req.body.answer) {
    res.send({
      result: 'correct'
    });
  } else {
    res.send({
      result: 'incorrect'
    });
  }
};
