const selectControl = document.querySelector('.select__control');
const selectDropdown = document.querySelector('.select__dropdown');
const selectArrow = document.querySelector(".select__arrow");
const selectValue = document.querySelector(".select__value");

let selectedItem = null;

selectControl.addEventListener('click', () => {
  selectDropdown.classList.toggle("active");
  selectArrow.classList.toggle("active");
});

selectDropdown.addEventListener("click", (e) => {
    const option = e.target.closest(".select__option");
    if (!option) return;

    const activeItem = selectDropdown.querySelector(".active");
    if (activeItem) {
      activeItem.classList.remove("active");
    }

    option.classList.add("active");
    selectDropdown.classList.remove("active");
    selectArrow.classList.remove("active");

    selectValue.textContent = option.textContent;

    selectedItem = option.textContent;
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".select")) {
      selectDropdown.classList.remove("active");
    }
  });
