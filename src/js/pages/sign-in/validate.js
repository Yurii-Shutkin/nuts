import JustValidate from 'just-validate';

const validation = new JustValidate('.sign-in__form');

validation
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
  ]).addField('#password', [
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
  ]);
