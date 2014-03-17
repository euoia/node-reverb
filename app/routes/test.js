var testCase = require('../controllers/testCase');

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
};
