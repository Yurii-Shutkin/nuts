import JustValidate from 'just-validate';

const validateEmail = new JustValidate('.password-recovery__form-email');
const validatePassword = new JustValidate('.password-recovery__form-password');


validateEmail
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Введите ваш email',
    },
    {
      rule: 'email',
      errorMessage: 'Введите корректный email',
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ]);

validatePassword.addField('#password', [
    {
      rule: 'required',
      errorMessage: 'Пароль обязателен',
    },
    {
      rule: 'minLength',
      value: 6,
      errorMessage: 'Пароль должен содержать минимум 6 символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Пароль должен содержать максимум 30 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Укажите ваш пароль',
    },
  ]).addField('#confirm-password', [
    {
      rule: 'required',
      errorMessage: 'Повторите ваш пароль',
    },
    {
      validator: (value, fields) => {
        const passwordValue = fields['#password'].elem.value;
        return value === passwordValue;
      },
      errorMessage: 'Пароли не совпадают',
    },
  ]);
  