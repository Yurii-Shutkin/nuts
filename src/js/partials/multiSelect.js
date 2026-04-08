const multiselects = document.querySelectorAll('.form__multiselect');

function setMultiselectState(multiselect, isOpen) {
  const control = multiselect.querySelector('.form__multiselect-control');
  const arrow = multiselect.querySelector('.form__multiselect-arrow');
  const dropdown = multiselect.querySelector('.form__multiselect-dropdown');
  if (!control || !arrow || !dropdown) {
    return;
  }

  control.classList.toggle('form__multiselect-control--active', isOpen);
  dropdown.classList.toggle('form__multiselect-dropdown--active', isOpen);
  arrow.classList.toggle('form__multiselect-arrow--active', isOpen);
}

multiselects.forEach((multiselect) => {
  const control = multiselect.querySelector('.form__multiselect-control');
  if (!control) {
    return;
  }

  control.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = control.classList.contains('form__multiselect-control--active');

    multiselects.forEach((item) => {
      if (item !== multiselect) {
        setMultiselectState(item, false);
      }
    });

    setMultiselectState(multiselect, !isOpen);
  });
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.form__multiselect')) {
    return;
  }

  multiselects.forEach((multiselect) => {
    setMultiselectState(multiselect, false);
  });
});
