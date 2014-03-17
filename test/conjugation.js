var assert = require('assert'),
  conjugation = require('../app/controllers/conjugation.js'),
  _ = require('underscore');

assert.deepEqual(conjugation.verbTemplate('aller'), ':aller');

var finirTemplate = conjugation.verbTemplate('finir');
var moodRules = conjugation.moodRules(finirTemplate);

assert.deepEqual(moodRules,
  {"$":{"name":"fin:ir"},"infinitive":[{"infinitive-present":[{"p":[{"i":["ir"]}]}]}],"indicative":[{"present":[{"p":[{"i":["is"]},{"i":["is"]},{"i":["it"]},{"i":["issons"]},{"i":["issez"]},{"i":["issent"]}]}],"imperfect":[{"p":[{"i":["issais"]},{"i":["issais"]},{"i":["issait"]},{"i":["issions"]},{"i":["issiez"]},{"i":["issaient"]}]}],"future":[{"p":[{"i":["irai"]},{"i":["iras"]},{"i":["ira"]},{"i":["irons"]},{"i":["irez"]},{"i":["iront"]}]}],"simple-past":[{"p":[{"i":["is"]},{"i":["is"]},{"i":["it"]},{"i":["îmes"]},{"i":["îtes"]},{"i":["irent"]}]}]}],"conditional":[{"present":[{"p":[{"i":["irais"]},{"i":["irais"]},{"i":["irait"]},{"i":["irions"]},{"i":["iriez"]},{"i":["iraient"]}]}]}],"subjunctive":[{"present":[{"p":[{"i":["isse"]},{"i":["isses"]},{"i":["isse"]},{"i":["issions"]},{"i":["issiez"]},{"i":["issent"]}]}],"imperfect":[{"p":[{"i":["isse"]},{"i":["isses"]},{"i":["ît"]},{"i":["issions"]},{"i":["issiez"]},{"i":["issent"]}]}]}],"imperative":[{"imperative-present":[{"p":[{"i":["is"]},{"i":["issons"]},{"i":["issez"]}]}]}],"participle":[{"present-participle":[{"p":[{"i":["issant"]}]}],"past-participle":[{"p":[{"i":["i"]},{"i":["is"]},{"i":["ie"]},{"i":["ies"]}]}]}]}
);

var conjugations = conjugation.conjugate(
  'finir',
  'indicative-simple-past');

assert.deepEqual(
  conjugations,
  {
    'first-singular': 'finis',
    'second-singular': 'finis',
    'third-singular': 'finit',
    'first-plural': 'finîmes',
    'second-plural': 'finîtes',
    'third-plural': 'finirent'
  });
