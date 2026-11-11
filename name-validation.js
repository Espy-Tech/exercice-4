document.querySelectorAll('input[name="fullname"]').forEach(function (field) {
  field.addEventListener('input', function () {
    var original = field.value;
    var position = field.selectionStart;
    var allowedCharacters = /[^\p{L}\p{M}\s'’-]/gu;
    var cleaned = original.replace(allowedCharacters, '').slice(0, 100);

    if (cleaned !== original) {
      var cleanBeforeCursor = original.slice(0, position).replace(allowedCharacters, '').slice(0, 100);
      field.value = cleaned;
      field.setSelectionRange(cleanBeforeCursor.length, cleanBeforeCursor.length);
    }
  });
});

document.querySelectorAll('input[name="phone"]').forEach(function (field) {
  function cleanPhone(value) {
    var keepLeadingPlus = value.charAt(0) === '+';
    var cleaned = value.replace(/[^0-9().\s-]/g, '');
    return (keepLeadingPlus ? '+' : '') + cleaned.slice(0, keepLeadingPlus ? 19 : 20);
  }

  function validatePhone() {
    var value = field.value.trim();
    var digits = value.replace(/[^0-9]/g, '');
    var valid = !value || (/^\+?[0-9][0-9().\s-]*$/.test(value) && digits.length >= 7 && digits.length <= 15);
    field.setCustomValidity(valid ? '' : 'Введите телефон без букв и от 7 до 15 цифр.');
    if (valid) {
      field.removeAttribute('aria-invalid');
    } else {
      field.setAttribute('aria-invalid', 'true');
    }
  }

  field.addEventListener('input', function () {
    var original = field.value;
    var position = field.selectionStart;
    var cleaned = cleanPhone(original);
    if (cleaned !== original) {
      field.value = cleaned;
      var cleanBeforeCursor = cleanPhone(original.slice(0, position));
      field.setSelectionRange(cleanBeforeCursor.length, cleanBeforeCursor.length);
    }
    validatePhone();
  });
  field.addEventListener('blur', validatePhone);
  validatePhone();
});
