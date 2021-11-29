const editButton = document.querySelector(".profile__button_edit");
const popUp = document.querySelector(".popup");
const exitButton = popUp.querySelector(".popup__exit");
const noScroll = document.querySelector("body");

let formElement = popUp.querySelector(".popup__inner");
let inputs = popUp.querySelectorAll(".popup__text");
let nameInput = inputs[0];
let jobInput = inputs[1];

function openPopup() {
    popUp.classList.add("popup_opened");
    noScroll.classList.add("page_hidden");
}
function closePopup() {
    popUp.classList.remove("popup_opened");
    noScroll.classList.remove("page_hidden");
}
function formSubmitHandler (evt) {
    evt.preventDefault();

    let name = document.querySelector(".profile__name");
    let characteristic = document.querySelector(".profile__characteristic");

    name.textContent = nameInput.value;
    characteristic.textContent = jobInput.value;

    closePopup();
}
nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";

editButton.addEventListener("click", openPopup);
exitButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);


