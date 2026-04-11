import JustValidate from 'just-validate';

const validation = new JustValidate('.sign-up__form');

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите ваше имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Имя должно содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: 'Имя должно содержать максимум 50 символов',
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
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Введите ваш телефон',
    },
    {
      rule: 'minLength',
      value: 6,
      errorMessage: 'Телефон должен содержать минимум 6 символов',
    },
    {
      rule: 'maxLength',
      value: 20,
      errorMessage: 'Телефон должен содержать максимум 20 символов',
    },
  ])
  .addField('#country', [
    {
      rule: 'required',
      errorMessage: 'Укажите вашу страну',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Страна должна содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: 'Страна должна содержать максимум 50 символов',
    },
  ])
  .addField('#region', [
    {
      rule: 'required',
      errorMessage: 'Укажите вашу область',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Область должна содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: 'Область должна содержать максимум 50 символов',
    },
  ])
  .addField('#city', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш город',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Город должен содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: 'Город должен содержать максимум 50 символов',
    },
  ])
  .addField('#adress', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш адрес',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Адрес должен содержать минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 150,
      errorMessage: 'Адрес должен содержать максимум 150 символов',
    },
  ])
  .addField('#password', [
    {
      rule: 'required',
      errorMessage: 'Введите пароль',
    },
    {
      rule: 'minLength',
      value: 6,
      errorMessage: 'Пароль должен содержать минимум 6 символов',
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: 'Пароль должен содержать максимум 50 символов',
    },
  ])
  .addField('#confirm-password', [
    {
      rule: 'required',
      errorMessage: 'Повторите ваш пароль',
    },
    {
      validator: (value, fields) => {
        if (!fields['#password'] || !fields['#password'].elem) {
          return false;
        }
        const passwordValue = fields['#password'].elem.value;
        return value === passwordValue;
      },
      errorMessage: 'Пароли не совпадают',
    },
  ])
  .addField('#agreement', [
    {
      validator: (value) => {
        return document.getElementById('agreement').checked;
      },
      errorMessage: 'Вы должны согласиться с условиями',
    },
  ])
  .addField('#file', [
    {
      validator: (value) => {
        const fileInput = document.getElementById('file');
        const files = fileInput.files;

        if (files.length === 0) {
          return true;
        }

        if (files.length > 1) {
          return false;
        }
        
        const file = files[0];
        const allowedExtensions = ['jpeg', 'jpg', 'png'];
        const maxSize = 5242880; 
        
        const fileName = file.name.toLowerCase();
        const hasValidExtension = allowedExtensions.some(ext => 
          fileName.endsWith('.' + ext)
        );
        
        if (!hasValidExtension) {
          return false;
        }
        
        if (file.size > maxSize) {
          return false;
        }
        
        return true;
      },
      errorMessage: 'Укажите корректный файл (JPEG, JPG или PNG, максимум 5MB)',
    },
  ])
  .onSuccess((event) => {
    event.preventDefault();
    if (window.submitSignUpForm) {
      window.submitSignUpForm();
    }
  })
  .onFail(() => {
    console.warn('Форма прошла валидацию неудачно');
  });
