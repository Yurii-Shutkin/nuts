import JustValidate from 'just-validate';

const validation = new JustValidate('.delivery-methods__form');

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
  ]);
