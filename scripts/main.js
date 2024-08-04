document.addEventListener('DOMContentLoaded', function () {
  const NAME_REGEXP = /^[А-Яа-яЁё\s]+$/;

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  function isNameValid(value) {
    return NAME_REGEXP.test(value);
  }

  function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
  }

  function isPasswordValid(value) {
    return value.length >= 6;
  }

  function isPasswordConfirmed(pass, passRepeat) {
    return pass.value === passRepeat.value;
  }

  function validateForm(form) {
    let valid = true;
    const inputs = form.querySelectorAll('.form__input');

    inputs.forEach((input) => {
      const emptyError = input.nextElementSibling;
      if (input.id.includes('email') && !isEmailValid(input.value)) {
        valid = false;
        input.classList.add('empty');
        emptyError.style.display = 'block';
      } else if (input.id.includes('name') && !isNameValid(input.value)) {
        valid = false;
        input.classList.add('empty');
        emptyError.style.display = 'block';
      } else if (input.id.includes('pass') && !isPasswordValid(input.value)) {
        valid = false;
        input.classList.add('empty');
        emptyError.style.display = 'block';
      } else if (
        input.id === 'register-pass-repeat' &&
        !isPasswordConfirmed(form.querySelector('#register-pass'), input)
      ) {
        valid = false;
        input.classList.add('empty');
        emptyError.style.display = 'block';
      } else if (input.value.trim() === '') {
        valid = false;
        input.classList.add('empty');
        if (emptyError && emptyError.classList.contains('form__par--empty')) {
          emptyError.style.display = 'block';
        }
      } else {
        input.classList.remove('empty');

        if (emptyError && emptyError.classList.contains('form__par--empty')) {
          emptyError.style.display = 'none';
        }
      }
    });

    return valid;
  }

  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateForm(form)) {
        form.submit();
      }
    });
  });

  document.querySelectorAll('.form__link, .menu__link').forEach((link) => {
    link.addEventListener('click', function () {
      const target = this.getAttribute('data-target');
      document.querySelectorAll('.form').forEach((form) => {
        form.classList.remove('active');
      });
      document.getElementById(target).classList.add('active');
    });
  });

  const inputs = document.querySelectorAll('.form__input');
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      if (input.value.trim() !== '') {
        input.classList.remove('empty');
        const emptyError = input.nextElementSibling;
        if (emptyError && emptyError.classList.contains('form__par--empty')) {
          emptyError.style.display = 'none';
        }
      }
    });
  });
});
