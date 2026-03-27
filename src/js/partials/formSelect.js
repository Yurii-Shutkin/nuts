
  const selectControl = document.querySelector(".form__select-control");
  const selectArrow = document.querySelector(".form__select-arrow");
  const selectValue = document.querySelector(".form__select-value");
  const selectDropdown = document.querySelector(".form__select-dropdown");

  let selectedItem = null;

  selectControl.addEventListener("click", () => {
    selectControl.classList.toggle("form__select-control--active");
    selectDropdown.classList.toggle("form__select-dropdown--active");
    selectArrow.classList.toggle("form__select-arrow--active");
  });

  selectDropdown.addEventListener("click", (e) => {
    const option = e.target.closest(".form__select-option");
    if (!option) return;

    const activeItem = selectDropdown.querySelector(".form__select-option--active");
    if (activeItem) {
      activeItem.classList.remove("form__select-option--active");
    }

    option.classList.add("form__select-option--active");
    selectControl.classList.remove("form__select-control--active")
    selectDropdown.classList.remove("form__select-dropdown--active");
    selectArrow.classList.remove("form__select-arrow--active");

    selectValue.textContent = option.textContent;

    selectedItem = option.textContent;
    console.log("Selected:", selectedItem);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".form__select")) {
      selectControl.classList.toggle("form__select-control--active");
      selectDropdown.classList.remove("form__select-dropdown--active");
      selectArrow.classList.remove("form__select-arrow--active");
    }
  });

