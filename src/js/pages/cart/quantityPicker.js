const quantityPicker = document.querySelectorAll('.quantity-picker');

quantityPicker.forEach(el => {
  const minus = el.querySelector('.quantity-picker__minus');
  const plus = el.querySelector('.quantity-picker__plus');
  const input = el.querySelector('.quantity-picker__input');
  input.addEventListener('keydown', (e) => {
    const invalidChars = ['e', 'E', '+', '-', '.', ','];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  })

  minus.addEventListener('click', () => {
    if (input.value > 1) {
      +input.value--;
    }
  });

  plus.addEventListener('click', () => {
    input.value++;
  });
});
