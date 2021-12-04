//Поиск кнопок и попапа в DOM
const editButton = document.querySelector('.profile__button_purpose_edit');
const popUp = document.querySelector('.popup');
const exitButton = popUp.querySelector('.popup__exit');
//Поиск формы в DOM
let formElement = popUp.querySelector('.popup__inner');
//Поиск полей формы в DOM
let nameInput = popUp.querySelector('.popup__text_purpose_name');
let jobInput = popUp.querySelector('.popup__text_purpose_characteristic');
//Поиск в профиле имени и характеристики пользователя в DOM
let person = document.querySelector('.profile__name');
let characteristic = document.querySelector('.profile__characteristic');

//При открытии модального окна данные из профиля записываются в форму
function openPopup() {
    popUp.classList.add('popup_opened');
    nameInput.value = person.textContent;
    jobInput.value = characteristic.textContent;
}

//Закрытие модального окна
function closePopup() {
    popUp.classList.remove('popup_opened');
}

//При нажатии кнопки 'Сохранить' данные из формы записываются в профиль и модальное окно закрывается
function formSubmitHandler (evt) {
    evt.preventDefault();

    person.textContent = nameInput.value;
    characteristic.textContent = jobInput.value;

    closePopup();
}

//Добавление слушателей событий
editButton.addEventListener('click', openPopup);
exitButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


