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
      success: function (data) {
        $('.response', testForm).html(data.result);
      },
      dataType: 'json'
    });

    return false;
  }.bind(this);

  console.log('done.');
}
