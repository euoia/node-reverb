var testCase = require('../app/models/testCase.js'),
  assert = require('assert');

assert.deepEqual(
  testCase.answers('payer', 'first_singular', 'indicative_present', 'feminine'),
  [ { verb: 'paie', text: 'Je paie' },
  { verb: 'paye', text: 'Je paye' } ]
);
