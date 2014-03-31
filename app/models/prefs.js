var _ = require('underscore'),
  verbs = require('./verbs.js');

// Rather than store the selected verbs, we'll store the deselected one.
exports.deselectVerb = function (session, verb) {
  if (session.deselectedVerbs === undefined) {
    session.deselectedVerbs = [];
  }

  session.deselectedVerbs.push(verb);
  session.save();
};

exports.selectVerb = function (session, verb) {
  if (_.contains(session.deselectedVerbs, verb)) {
    session.deselectedVerbs = _.without(
      session.deselectedVerbs, verb);
  }

  session.save();
};

var deselectedVerbs = exports.deselectedVerbs = function (session) {
  if (session.deselectedVerbs === undefined) {
    session.deselectedVerbs = [];
  }

  return session.deselectedVerbs;
};

exports.selectedVerbs = function (session) {
  return _.difference(verbs.all_verbs, deselectedVerbs(session));
};
