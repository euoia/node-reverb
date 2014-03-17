function Test(options) {
  this.form = options.form;

  this.form.onsubmit = function() {
    // TODO: Make ajax request.
    return false;
  };

  console.log('done.');
}
