const multiselect = document.querySelector(".form__multiselect-control");
const multiselectArrow = document.querySelector(".form__multiselect-arrow");
const multiselectValue = document.querySelector(".form__multiselect-value");
const multiselectDropdown = document.querySelector(".form__multiselect-dropdown");
const options = document.querySelectorAll(".form__multiselect-option");

multiselect.addEventListener("click", () => {
  multiselect.classList.toggle("form__multiselect-control--active");
  multiselectDropdown.classList.toggle("form__multiselect-dropdown--active");
  multiselectArrow.classList.toggle("form__multiselect-arrow--active");
});

multiselectDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  const option = e.target.closest(".form__multiselect-option");
  if (!option) return;
  if (e.target.tagName === 'INPUT') return;
  option.classList.toggle("form__multiselect-option--active");
});


