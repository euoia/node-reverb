function Test(options) {
  this.form = options.form;
  this.controls = options.controls;

  for (var i = 0, l = options.deselectedVerbs.length; i < l; i += 1) {
  }

  this.form.onsubmit = function(d) {
    var verb = $('input[name=verb]', this.form).val();
    var mood = $('input[name=mood]', this.form).val();
    var perspective = $('input[name=perspective]', this.form).val();
    var gender = $('input[name=gender]', this.form).val();
    var response = $('input[name=response]', this.form).val();

    $.ajax({
      type: 'POST',
      url: '/test/check',
      data: {
        verb: verb,
        mood: mood,
        perspective: perspective,
        gender: gender,
        response: response
      },
      success: this.handleCheckanswer.bind(this),
      dataType: 'json'
    });

    return false;
  }.bind(this);

  $('.next', this.form).click(function(eventData) {
    window.location = '/';
  });

  this.conjugationTableTemplate = _.template(
    '<table class="conjugationTable">' +
      '<tr>' +
        '<th>&nbsp;</th>' +
        '<th>l\'imparfait</th>' +
        '<th>présent</th>' +
        '<th>futur</th>' +
        '<th>conditionnel</th>' +
        '<th>subjonctif présent</th>' +
        '<th>passé composé</th>' +
      '</tr>' +
      '<tr>' +
        '<td class="perspective">je</td>' +
        '<td><%= indicative_imperfect.first_singular %></td>' +
        '<td><%= indicative_present.first_singular %></td>' +
        '<td><%= indicative_future.first_singular %></td>' +
        '<td><%= conditional_present.first_singular %></td>' +
        '<td><%= subjunctive_present.first_singular %></td>' +
        '<td><%= participle_past_participle.first_singular %></td>' +
      '</tr>' +
      '<tr>' +
        '<td class="perspective">tu</td>' +
        '<td><%= indicative_imperfect.second_singular %></td>' +
        '<td><%= indicative_present.second_singular %></td>' +
        '<td><%= indicative_future.second_singular %></td>' +
        '<td><%= conditional_present.second_singular %></td>' +
        '<td><%= subjunctive_present.second_singular %></td>' +
        '<td><%= participle_past_participle.second_singular %></td>' +
      '</tr>' +
      '<tr>' +
        '<td class="perspective">il</td>' +
        '<td><%= indicative_imperfect.third_singular %></td>' +
        '<td><%= indicative_present.third_singular %></td>' +
        '<td><%= indicative_future.third_singular %></td>' +
        '<td><%= conditional_present.third_singular %></td>' +
        '<td><%= subjunctive_present.third_singular %></td>' +
        '<td><%= participle_past_participle.third_singular %></td>' +
      '</tr>' +
      '<tr>' +
        '<td class="perspective">nous</td>' +
        '<td><%= indicative_imperfect.first_plural %></td>' +
        '<td><%= indicative_present.first_plural %></td>' +
        '<td><%= indicative_future.first_plural %></td>' +
        '<td><%= conditional_present.first_plural %></td>' +
        '<td><%= subjunctive_present.first_plural %></td>' +
        '<td><%= participle_past_participle.first_plural %></td>' +
      '</tr>' +
      '<tr>' +
        '<td class="perspective">vous</td>' +
        '<td><%= indicative_imperfect.second_plural %></td>' +
        '<td><%= indicative_present.second_plural %></td>' +
        '<td><%= indicative_future.second_plural %></td>' +
        '<td><%= conditional_present.second_plural %></td>' +
        '<td><%= subjunctive_present.second_plural %></td>' +
        '<td><%= participle_past_participle.second_plural %></td>' +
      '</tr>' +
      '<tr>' +
        '<td class="perspective">ils</td>' +
        '<td><%= indicative_imperfect.third_plural %></td>' +
        '<td><%= indicative_present.third_plural %></td>' +
        '<td><%= indicative_future.third_plural %></td>' +
        '<td><%= conditional_present.third_plural %></td>' +
        '<td><%= subjunctive_present.third_plural %></td>' +
        '<td><%= participle_past_participle.third_plural %></td>' +
      '</tr>' +
    '</table>');

  var preferencesShown = false;
  var fading = false;
  $('.prefsLink', this.controls).click(function (eventData) {
    if (fading === true) {
      return;
    }

    if (preferencesShown) {
      $('.preferences').fadeOut({
        complete: function () {
          $('.test').fadeIn();
          preferencesShown = false;
          fading = false;
        }
      });
    } else {
      $('.test').fadeOut({
        complete: function() {
          $('.preferences').fadeIn();
          $('.testResponse').focus();
          preferencesShown = true;
          fading = false;
        }
      });
    }
  });

  $('.verb').click(function (eventData) {
    var action;
    if($(this).hasClass('deselected')) {
      action = '/prefs/select';
    } else {
      action = '/prefs/deselect';
    }

    $(this).toggleClass('deselected');

    $.ajax({
      type: 'POST',
      url: action,
      data: {
        verb: $(this).html()
      },
      fail: function() {
        // If something goes wrong toggle it back.
        $(this).toggleClass('deselected');
      }
    });
  });
}

Test.prototype.generateConjugationTable = function(conjugationTable) {
  return this.conjugationTableTemplate(conjugationTable);
};

Test.prototype.playAudio = function(audioPath) {
  var audio = document.createElement('audio');
  audio.src = audioPath;
  audio.autoplay = true;

  this.form.appendChild(audio);
};

Test.prototype.handleCheckanswer = function(resData) {
  $('.answer', this.form).html(resData.result);

  if (resData.correct === true) {
    $('.answer', this.form).html(resData.congrats);
    $('.answer', this.form).addClass('correct');
  } else {
    $('.answer', this.form).html(resData.insult);
    $('.answer', this.form).addClass('incorrect');

    $('.conjugationTableContainer', this.form).html(
      this.generateConjugationTable(resData.conjugationTable));
  }

  this.playAudio(resData.audio);
  $('.next', this.form).show();
  $('.nextButton', this.form).focus();
};
