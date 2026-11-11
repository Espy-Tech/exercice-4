document.querySelectorAll('input[name="fullname"]').forEach(function (field) {
  field.addEventListener('input', function () {
    var original = field.value;
    var position = field.selectionStart;
    var allowedCharacters = /[^\p{L}\p{M}\s'’-]/gu;
    var cleaned = original.replace(allowedCharacters, '');

    if (cleaned !== original) {
      var cleanBeforeCursor = original.slice(0, position).replace(allowedCharacters, '');
      field.value = cleaned;
      field.setSelectionRange(cleanBeforeCursor.length, cleanBeforeCursor.length);
    }
  });
});
