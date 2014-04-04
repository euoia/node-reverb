function Test(options) {
  var i;

  this.form = options.form;
  this.controls = options.controls;
  this.preferences = options.preferences;
  this.ttsAudioEnabled = options.ttsAudioEnabled;

  // Toggle selected status of deselected verbs in prefs.
  for (i = 0, l = options.deselectedVerbs.length; i < l; i += 1) {
    var verb = options.deselectedVerbs[i];
    $('.' + verb, this.preferences).toggleClass('deselected');
  }

  // Toggle selected status of deselected moods in prefs.
  for (i = 0, l = options.deselectedMoods.length; i < l; i += 1) {
    var mood = options.deselectedMoods[i];
    $('.' + mood, this.preferences).toggleClass('deselected');
  }

  // Toggle enabled status of the text-to-speech audio.
  this.setAudioEnabled(this.ttsAudioEnabled);

  // Store the deselected moods, we need this info for displaying the conjugation table.
  this.deselectedMoods = options.deselectedMoods;

  var that = this;
  $(this.form).submit(function (eventData) {

    var verb = $('input[name=verb]', that.form).val();
    var mood = $('input[name=mood]', that.form).val();
    var perspective = $('input[name=perspective]', that.form).val();
    var gender = $('input[name=gender]', that.form).val();
    var response = $('input[name=response]', that.form).val();

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
      success: that.handleCheckanswer.bind(that),
      dataType: 'json'
    });

    console.log('eventData', eventData);
    eventData.preventDefault();
    return false;
  });

  $('.next').click(function(eventData) {
    window.location = '/';
  });

  // Hide/show preferences.
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
          $('#response').blur();
        }
      });
    } else {
      $('.test').fadeOut({
        complete: function() {
          $('.preferences').fadeIn();
          setTimeout(function() {
            $('#response').focus();
          }, 2000);

          preferencesShown = true;
          fading = false;
        }
      });
    }
  });


  $('.ttsAudioLink', this.controls).click(function (eventData) {
    this.ttsAudioEnabled = !this.ttsAudioEnabled;
    this.setAudioEnabled(this.ttsAudioEnabled);

    $.ajax({
      type: 'POST',
      url: '/prefs/setAudioEnabled',
      data: JSON.stringify({
        enabled: this.ttsAudioEnabled
      }),
      contentType: 'application/json',
      error: function() {
        this.ttsAudioEnabled = !this.ttsAudioEnabled;
        this.setAudioEnabled(this.ttsAudioEnabled);
      }.bind(this)
    });
  }.bind(this));

  $('.verb', this.preferences).click(function (eventData) {
    var action;
    if($(this).hasClass('deselected')) {
      action = '/prefs/selectVerb';
    } else {
      action = '/prefs/deselectVerb';
    }

    $(this).toggleClass('deselected');

    $.ajax({
      type: 'POST',
      url: action,
      data: {
        verb: this.dataset.verb
      },
      error: function() {
        // If something goes wrong toggle it back.
        $(this).toggleClass('deselected');
      }.bind(this)
    });
  });

  $('.mood', this.preferences).click(function (eventData) {
    var action;
    if($(this).hasClass('deselected')) {
      action = '/prefs/selectMood';
      that.deselectedMoods = _.without(that.deselectedMoods, this.dataset.mood);
    } else {
      action = '/prefs/deselectMood';
      that.deselectedMoods.push(this.dataset.mood);
    }

    $(this).toggleClass('deselected');

    $.ajax({
      type: 'POST',
      url: action,
      data: {
        mood: this.dataset.mood
      },
      error: function() {
        // If something goes wrong toggle it back.
        $(this).toggleClass('deselected');
      }.bind(this)
    });

    // Show or hide the mood from the conjguation table.
    $('.table-' + this.dataset.mood).toggle();
  });

  this.moods =  [
    'indicative_present',
    'indicative_future',
    'indicative_imperfect',
    'conditional_present',
    'subjunctive_present',
    'participle_past_participle'
  ];

  this.tableTemplate = {};

  this.tableTemplate.indicative_imperfect = [
    '<th class="table-indicative_imperfect">l\'imparfait</th>',
    '<td class="table-indicative_imperfect"><%= indicative_imperfect.first_singular %></td>',
    '<td class="table-indicative_imperfect"><%= indicative_imperfect.second_singular %></td>',
    '<td class="table-indicative_imperfect"><%= indicative_imperfect.third_singular %></td>',
    '<td class="table-indicative_imperfect"><%= indicative_imperfect.first_plural %></td>',
    '<td class="table-indicative_imperfect"><%= indicative_imperfect.second_plural %></td>',
    '<td class="table-indicative_imperfect"><%= indicative_imperfect.third_plural %></td>'
  ];

  this.tableTemplate.indicative_present = [
    '<th class="table-indicative_present">présent</th>',
    '<td class="table-indicative_present"><%= indicative_present.first_singular %></td>',
    '<td class="table-indicative_present"><%= indicative_present.second_singular %></td>',
    '<td class="table-indicative_present"><%= indicative_present.third_singular %></td>',
    '<td class="table-indicative_present"><%= indicative_present.first_plural %></td>',
    '<td class="table-indicative_present"><%= indicative_present.second_plural %></td>',
    '<td class="table-indicative_present"><%= indicative_present.third_plural %></td>'
  ];

  this.tableTemplate.indicative_future = [
    '<th>futur</th>',
    '<td class="table-indicative_future"><%= indicative_future.first_singular %></td>',
    '<td class="table-indicative_future"><%= indicative_future.second_singular %></td>',
    '<td class="table-indicative_future"><%= indicative_future.third_singular %></td>',
    '<td class="table-indicative_future"><%= indicative_future.first_plural %></td>',
    '<td class="table-indicative_future"><%= indicative_future.second_plural %></td>',
    '<td class="table-indicative_future"><%= indicative_future.third_plural %></td>'
  ];

  this.tableTemplate.conditional_present = [
    '<th class="table-conditional_present">conditionnel</th>',
    '<td class="table-conditional_present"><%= conditional_present.first_singular %></td>',
    '<td class="table-conditional_present"><%= conditional_present.second_singular %></td>',
    '<td class="table-conditional_present"><%= conditional_present.third_singular %></td>',
    '<td class="table-conditional_present"><%= conditional_present.first_plural %></td>',
    '<td class="table-conditional_present"><%= conditional_present.second_plural %></td>',
    '<td class="table-conditional_present"><%= conditional_present.third_plural %></td>'
  ];

  this.tableTemplate.subjunctive_present = [
    '<th class="table-subjunctive_present">subjonctif présent</th>',
    '<td class="table-subjunctive_present"><%= subjunctive_present.first_singular %></td>',
    '<td class="table-subjunctive_present"><%= subjunctive_present.second_singular %></td>',
    '<td class="table-subjunctive_present"><%= subjunctive_present.third_singular %></td>',
    '<td class="table-subjunctive_present"><%= subjunctive_present.first_plural %></td>',
    '<td class="table-subjunctive_present"><%= subjunctive_present.second_plural %></td>',
    '<td class="table-subjunctive_present"><%= subjunctive_present.third_plural %></td>'
  ];


  this.tableTemplate.participle_past_participle = [
    '<th class="table-participle_past_participle">passé composé</th>',
    '<td class="table-participle_past_participle"><%= participle_past_participle.first_singular %></td>',
    '<td class="table-participle_past_participle"><%= participle_past_participle.second_singular %></td>',
    '<td class="table-participle_past_participle"><%= participle_past_participle.third_singular %></td>',
    '<td class="table-participle_past_participle"><%= participle_past_participle.first_plural %></td>',
    '<td class="table-participle_past_participle"><%= participle_past_participle.second_plural %></td>',
    '<td class="table-participle_past_participle"><%= participle_past_participle.third_plural %></td>'
  ];
}

Test.prototype.generateConjugationTable = function(conjugationTable) {
  var table = '<table class="conjugationTable">';

  var perspectives = [
    'je',
    'tu',
    'il',
    'nous',
    'vous',
    'ils'
  ];

  var perspective, mood, moodVerbTemplate;

  for (var p = 0; p < perspectives.length; p += 1) {
    table += '<tr>';



    for (var m = 0; m < this.moods.length + 1; m += 1) {
      mood = this.moods[m - 1];

      if (mood !== undefined && _.contains(this.deselectedMoods, mood)) {
        continue;
      }

      if (m === 0) {
        if (p > 0) {
          perspective = perspectives[p - 1];
          table += '<td class="perspective">' + perspective + '</td>';
        } else {
          // Top-left cell is empty.
          table += '<td>&nbsp;</td>';
        }
      } else {
        table += this.tableTemplate[mood][p];
      }
    }
    table += '</tr>';
  }

  table += '</table>';

  var tableTemplate = _.template(table);

  return tableTemplate(conjugationTable);
};

Test.prototype.playAudio = function(audioPath) {
  if (this.ttsAudioEnabled === false) {
    return;
  }

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
  $('.next').show();
  $('.nextButton').focus();
};

Test.prototype.setAudioEnabled = function(value) {
  if (value === true) {
    $('.ttsAudioLink i', this.controls).removeClass('fa-volume-off');
    $('.ttsAudioLink i', this.controls).addClass('fa-volume-up');
  } else {
    $('.ttsAudioLink i', this.controls).removeClass('fa-volume-up');
    $('.ttsAudioLink i', this.controls).addClass('fa-volume-off');
  }
};
