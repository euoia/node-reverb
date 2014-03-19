function Test(options) {
  this.form = options.form;

  this.form.onsubmit = function(d) {
    var verb = $('input[name=verb]', this.form).val();
    var mood = $('input[name=mood]', this.form).val();
    var perspective = $('input[name=perspective]', this.form).val();
    var answer = $('input[name=answer]', this.form).val();

    // TODO: Make ajax request.
    $.ajax({
      type: 'POST',
      url: '/test/check',
      data: {
        verb: verb,
        mood: mood,
        perspective: perspective,
        answer: answer
      },
      success: this.handleCheckResponse.bind(this),
      dataType: 'json'
    });

    return false;
  }.bind(this);

  this.conjugationTableTemplate = _.template(
    '<table class="conjugationTable">' +
      '<tr>' +
        '<th>&nbsp;</th>' +
        '<th>à l\'imparfait</th>' +
        '<th>au présent</th>' +
        '<th>au futur</th>' +
        '<th>au conditionnel</th>' +
        '<th>au passé composé</th>' +
      '</tr>' +
      '<tr>' +
        '<td>je</td>' +
        '<td><%= indicative_imperfect.first_singular %></td>' +
        '<td><%= indicative_present.first_singular %></td>' +
        '<td><%= indicative_future.first_singular %></td>' +
        '<td><%= conditional_present.first_singular %></td>' +
        '<td><%= participle_past_participle.first_singular %></td>' +
      '</tr>' +
      '<tr>' +
        '<td>tu</td>' +
        '<td><%= indicative_imperfect.second_singular %></td>' +
        '<td><%= indicative_present.second_singular %></td>' +
        '<td><%= indicative_future.second_singular %></td>' +
        '<td><%= conditional_present.second_singular %></td>' +
        '<td><%= participle_past_participle.second_singular %></td>' +
      '</tr>' +
      '<tr>' +
        '<td>il</td>' +
        '<td><%= indicative_imperfect.third_singular %></td>' +
        '<td><%= indicative_present.third_singular %></td>' +
        '<td><%= indicative_future.third_singular %></td>' +
        '<td><%= conditional_present.third_singular %></td>' +
        '<td><%= participle_past_participle.third_singular %></td>' +
      '</tr>' +
      '<tr>' +
        '<td>nous</td>' +
        '<td><%= indicative_imperfect.first_plural %></td>' +
        '<td><%= indicative_present.first_plural %></td>' +
        '<td><%= indicative_future.first_plural %></td>' +
        '<td><%= conditional_present.first_plural %></td>' +
        '<td><%= participle_past_participle.first_plural %></td>' +
      '</tr>' +
      '<tr>' +
        '<td>vous</td>' +
        '<td><%= indicative_imperfect.second_plural %></td>' +
        '<td><%= indicative_present.second_plural %></td>' +
        '<td><%= indicative_future.second_plural %></td>' +
        '<td><%= conditional_present.second_plural %></td>' +
        '<td><%= participle_past_participle.second_plural %></td>' +
      '</tr>' +
      '<tr>' +
        '<td>ils</td>' +
        '<td><%= indicative_imperfect.third_plural %></td>' +
        '<td><%= indicative_present.third_plural %></td>' +
        '<td><%= indicative_future.third_plural %></td>' +
        '<td><%= conditional_present.third_plural %></td>' +
        '<td><%= participle_past_participle.third_plural %></td>' +
      '</tr>' +
    '</table>');

    //this.conjugationTableTemplate = _.template('<table><tr><td>hello</td><tr></table>');
}

Test.prototype.generateConjugationTable = function(conjugationTable) {
  return this.conjugationTableTemplate(conjugationTable);
};

Test.prototype.handleCheckResponse = function(resData) {
  $('.response', testForm).html(resData.result);

  if (resData.correct === true) {
    $('.response', testForm).html(resData.congrats);
  } else {
    $('.response', testForm).html(resData.insult);
    console.dir(resData.conjugationTable);
    $('.conjugationTableContainer', testForm).html(
      this.generateConjugationTable(resData.conjugationTable));
  }
};
