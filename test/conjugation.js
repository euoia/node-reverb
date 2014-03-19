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
  'indicative_simple_past');

assert.deepEqual(
  conjugations,
  {
    'first_singular': 'finis',
    'second_singular': 'finis',
    'third_singular': 'finit',
    'first_plural': 'finîmes',
    'second_plural': 'finîtes',
    'third_plural': 'finirent'
  });

assert.deepEqual(conjugation.conjugationTable('boucher'),
  { 'infinitive_present':
    { 'first_singular': 'boucher',
      'second_singular': '',
      'third_singular': '',
      'first_plural': '',
      'second_plural': '',
      'third_plural': '' },
    'indicative_present':
    { 'first_singular': 'bouche',
      'second_singular': 'bouches',
      'third_singular': 'bouche',
      'first_plural': 'bouchons',
      'second_plural': 'bouchez',
      'third_plural': 'bouchent' },
    'indicative_imperfect':
    { 'first_singular': 'bouchais',
      'second_singular': 'bouchais',
      'third_singular': 'bouchait',
      'first_plural': 'bouchions',
      'second_plural': 'bouchiez',
      'third_plural': 'bouchaient' },
    'indicative_future':
    { 'first_singular': 'boucherai',
      'second_singular': 'boucheras',
      'third_singular': 'bouchera',
      'first_plural': 'boucherons',
      'second_plural': 'boucherez',
      'third_plural': 'boucheront' },
    'indicative_simple_past':
    { 'first_singular': 'bouchai',
      'second_singular': 'bouchas',
      'third_singular': 'boucha',
      'first_plural': 'bouchâmes',
      'second_plural': 'bouchâtes',
      'third_plural': 'bouchèrent' },
    'conditional_present':
    { 'first_singular': 'boucherais',
      'second_singular': 'boucherais',
      'third_singular': 'boucherait',
      'first_plural': 'boucherions',
      'second_plural': 'boucheriez',
      'third_plural': 'boucheraient' },
    'subjunctive_present':
    { 'first_singular': 'bouche',
      'second_singular': 'bouches',
      'third_singular': 'bouche',
      'first_plural': 'bouchions',
      'second_plural': 'bouchiez',
      'third_plural': 'bouchent' },
    'imperative_present':
    { 'first_singular': 'bouche',
      'second_singular': 'bouchons',
      'third_singular': 'bouchez',
      'first_plural': '',
      'second_plural': '',
      'third_plural': '' },
    'participle_present':
    { 'first_singular': 'bouchant',
      'second_singular': '',
      'third_singular': '',
      'first_plural': '',
      'second_plural': '',
      'third_plural': '' },
    'participle_past_participle':
    { 'first_singular': 'bouché',
      'second_singular': 'bouchés',
      'third_singular': 'bouchée',
      'first_plural': 'bouchées',
      'second_plural': '',
      'third_plural': '' } });
