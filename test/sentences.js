var sentences = require('../app/models/sentences.js'),
  assert = require('assert');

assert.equal(sentences.beginning('aller', 'first_singular', 'indicative_present', 'masculine'), 'Je ');
assert.equal(sentences.beginning('aller', 'first_singular', 'participle_past_participle', 'masculine'), 'Je suis ');
assert.equal(sentences.beginning('aller', 'first_plural', 'participle_past_participle', 'masculine'), 'Nous sommes ');
assert.equal(sentences.beginning('faire', 'second_plural', 'participle_past_participle', 'masculine'), 'Vous avez ');
assert.equal(sentences.beginning('faire', 'third_singular', 'participle_past_participle', 'feminine'), 'Elle a ');
assert.equal(sentences.beginning('aller', 'third_singular', 'participle_past_participle', 'feminine'), 'Elle est ');
assert.equal(sentences.beginning('valoir', 'third_singular', 'conditional_present', 'feminine'), 'Elle ');
assert.equal(sentences.beginning('acheter', 'first_singular', 'conditional_present', 'masculine'), "J'");
