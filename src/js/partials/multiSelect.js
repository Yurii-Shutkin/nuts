document.querySelectorAll(".form__multiselect").forEach((multiselect) => {
  const control = multiselect.querySelector(".form__multiselect-control");
  const arrow = multiselect.querySelector(".form__multiselect-arrow");
  const dropdown = multiselect.querySelector(".form__multiselect-dropdown");

  control.addEventListener("click", () => {
    control.classList.toggle("form__multiselect-control--active");
    dropdown.classList.toggle("form__multiselect-dropdown--active");
    arrow.classList.toggle("form__multiselect-arrow--active");
  });
});
