var assert = require('assert'),
  conjugation = require('../app/controllers/conjugation.js'),
  _ = require('underscore');

assert.deepEqual(conjugation.verbTemplate('aller'), ':aller');

var finirTemplate = conjugation.verbTemplate('finir');
var moodRules = conjugation.moodRules(finirTemplate);

assert.deepEqual(moodRules,
  {"$":{"name":"fin:ir"},"infinitive":[{"infinitive-present":[{"p":[{"i":["ir"]}]}]}],"indicative":[{"present":[{"p":[{"i":["is"]},{"i":["is"]},{"i":["it"]},{"i":["issons"]},{"i":["issez"]},{"i":["issent"]}]}],"imperfect":[{"p":[{"i":["issais"]},{"i":["issais"]},{"i":["issait"]},{"i":["issions"]},{"i":["issiez"]},{"i":["issaient"]}]}],"future":[{"p":[{"i":["irai"]},{"i":["iras"]},{"i":["ira"]},{"i":["irons"]},{"i":["irez"]},{"i":["iront"]}]}],"simple-past":[{"p":[{"i":["is"]},{"i":["is"]},{"i":["it"]},{"i":["îmes"]},{"i":["îtes"]},{"i":["irent"]}]}]}],"conditional":[{"present":[{"p":[{"i":["irais"]},{"i":["irais"]},{"i":["irait"]},{"i":["irions"]},{"i":["iriez"]},{"i":["iraient"]}]}]}],"subjunctive":[{"present":[{"p":[{"i":["isse"]},{"i":["isses"]},{"i":["isse"]},{"i":["issions"]},{"i":["issiez"]},{"i":["issent"]}]}],"imperfect":[{"p":[{"i":["isse"]},{"i":["isses"]},{"i":["ît"]},{"i":["issions"]},{"i":["issiez"]},{"i":["issent"]}]}]}],"imperative":[{"imperative-present":[{"p":[{"i":["is"]},{"i":["issons"]},{"i":["issez"]}]}]}],"participle":[{"present-participle":[{"p":[{"i":["issant"]}]}],"past-participle":[{"p":[{"i":["i"]},{"i":["is"]},{"i":["ie"]},{"i":["ies"]}]}]}]}
);

var conjugations = conjugation.conjugationsInMood(
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
{ indicative_present:
   { first_singular: 'bouche',
     second_singular: 'bouches',
     third_singular: 'bouche',
     first_plural: 'bouchons',
     second_plural: 'bouchez',
     third_plural: 'bouchent' },
  indicative_future:
   { first_singular: 'boucherai',
     second_singular: 'boucheras',
     third_singular: 'bouchera',
     first_plural: 'boucherons',
     second_plural: 'boucherez',
     third_plural: 'boucheront' },
  indicative_imperfect:
   { first_singular: 'bouchais',
     second_singular: 'bouchais',
     third_singular: 'bouchait',
     first_plural: 'bouchions',
     second_plural: 'bouchiez',
     third_plural: 'bouchaient' },
  conditional_present:
   { first_singular: 'boucherais',
     second_singular: 'boucherais',
     third_singular: 'boucherait',
     first_plural: 'boucherions',
     second_plural: 'boucheriez',
     third_plural: 'boucheraient' },
  subjunctive_present:
   { first_singular: 'bouche',
     second_singular: 'bouches',
     third_singular: 'bouche',
     first_plural: 'bouchions',
     second_plural: 'bouchiez',
     third_plural: 'bouchent' },
  participle_past_participle:
   { first_singular: 'bouché',
     second_singular: 'bouché',
     third_singular: 'bouché',
     first_plural: 'bouché',
     second_plural: 'bouché',
     third_plural: 'bouché' } }
);

assert.deepEqual(conjugation.conjugationTable('aller'),
{ indicative_present:
   { first_singular: 'vais',
     second_singular: 'vas',
     third_singular: 'va',
     first_plural: 'allons',
     second_plural: 'allez',
     third_plural: 'vont' },
  indicative_future:
   { first_singular: 'irai',
     second_singular: 'iras',
     third_singular: 'ira',
     first_plural: 'irons',
     second_plural: 'irez',
     third_plural: 'iront' },
  indicative_imperfect:
   { first_singular: 'allais',
     second_singular: 'allais',
     third_singular: 'allait',
     first_plural: 'allions',
     second_plural: 'alliez',
     third_plural: 'allaient' },
  conditional_present:
   { first_singular: 'irais',
     second_singular: 'irais',
     third_singular: 'irait',
     first_plural: 'irions',
     second_plural: 'iriez',
     third_plural: 'iraient' },
  subjunctive_present:
   { first_singular: 'aille',
     second_singular: 'ailles',
     third_singular: 'aille',
     first_plural: 'allions',
     second_plural: 'alliez',
     third_plural: 'aillent' },
  participle_past_participle:
   { first_singular: 'allé',
     second_singular: 'allé',
     third_singular: 'allé',
     first_plural: 'allés',
     second_plural: 'allés',
     third_plural: 'allés' } }
);
