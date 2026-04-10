import JustValidate from 'just-validate';

const validation = new JustValidate('.sign-up__form');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Имя должно содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Имя должно содержать максимум 30 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Введите вашеимя',
    },
  ])
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
  ]).addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Введите ваш телефон',
    },
    {
      rule: 'maxLength',
      value: 12,
      errorMessage: 'Телефон должен содержать максимум 12 символов',
    },
  ]).addField('#country', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Страна должна содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Страна должна содержать максимум 30 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Укажите вашу страну',
    },
  ]).addField('#region', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Область должна содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Область должна содержать максимум 30 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Укажите вашу область',
    },
  ]).addField('#city', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Город должен содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Город должен содержать максимум 30 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Укажите ваш город',
    },
  ]).addField('#adress', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Адрес должен содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Адрес должен содержать максимум 30 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Укажите ваш адрес',
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
  ]).addField('#agreement', [
  {
    rule: 'required',
    errorMessage: 'Вы должны согласиться с условиями',
  },
]).addField('#file', [
  
  {
    rule: 'maxFilesCount',
    value: 1,
  },
  {
    rule: 'files',
    value: {
      files: {
        extensions: ['jpeg', 'png'],
        maxSize: 25000,
        minSize: 1000,
        types: ['image/jpeg', 'image/png'],
      },
    },
  },
]);
