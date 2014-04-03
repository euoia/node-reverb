var testCase = require('../app/controllers/testCase.js'),
  assert = require('assert');

assert.deepEqual(
  testCase.answer('payer', 'first_singular', 'indicative_present', 'feminine'),
  [ { verb: 'paie', text: 'Je paie' },
  { verb: 'paye', text: 'Je paye' } ]
);
