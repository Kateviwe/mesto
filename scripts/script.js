//Импорт исходного набора карточек
import {initialCards} from './initialCards.js';
//Импорт класса создания карточек Card
import {Card} from './Card.js';
//Импорт класса валидации FormValidator
import {_FormValidator} from './FormValidator.js';

//Создание объекта настроек для проведения валидации
const object = {
  formSelector: '.popup__inner',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__inner_type_error',
  errorClass: 'popup__text-error_visible'
};

const ESC_CODE = 'Escape';
//Поиск кнопок и попапа в DOM
const profileEditButton = document.querySelector('.profile__button_purpose_edit');
const profilePopup = document.querySelector('.profile-popup');
const profileExitButton = profilePopup.querySelector('.popup__exit_purpose_edit');
//Поиск кнопок и второго попапа, который добавляет изображения в ленту, в DOM
const profileAddButton = document.querySelector('.profile__button_purpose_add');
const addingPopup = document.querySelector('.adding-popup');
const addingExitButton = addingPopup.querySelector('.popup__exit_purpose_add');
//Поиск кнопки и попапа, который открывает просмотр карточек
const viewingPopup = document.querySelector('.viewing-popup');
const viewingExitButton = viewingPopup.querySelector('.popup__exit_purpose_view');
//Поиск форм в DOM
const profileForm = profilePopup.querySelector('.popup__inner_purpose_edit');
const addingForm = addingPopup.querySelector('.popup__inner_purpose_add');
//Поиск полей форм в DOM
const nameInput = profilePopup.querySelector('.popup__text_purpose_name');
const jobInput = profilePopup.querySelector('.popup__text_purpose_characteristic');
const titleInput = addingPopup.querySelector('.popup__text_purpose_title');
const srcInput = addingPopup.querySelector('.popup__text_purpose_src');
//Поиск в профиле имени и характеристики пользователя в DOM
const person = document.querySelector('.profile__name');
const characteristic = document.querySelector('.profile__characteristic');
//Поиск контейнера для карточек в DOM
const containerCard = document.querySelector('.photogrid__container');

const addingCreateButton = addingPopup.querySelector('.popup__button_purpose_add');

//Поиск подложек (overlay) в DOM
const profileOverlay = document.querySelector('.popup__overlay_purpose_edit');
const addingOverlay = document.querySelector('.popup__overlay_purpose_add');
const viewingOverlay = document.querySelector('.popup__overlay_purpose_view');

//Функция закрытия попапа клавишей Esc
const closeByEsc = evt => {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

  //Открытие модального окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//Закрытие модального окна
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

//При нажатии кнопки 'Сохранить' данные из формы записываются в профиль и модальное окно закрывается
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  person.textContent = nameInput.value;
  characteristic.textContent = jobInput.value;

  closePopup(profilePopup);
}

//При нажатии кнопки 'Создать' добавляется новая карточка в начало ленты и модальное окно закрывается
function handleAddingFormSubmit (evt) {
  evt.preventDefault();

  const newCard = new Card(titleInput.value, srcInput.value, '#card');
  const newCardElement = newCard.createCard();
  //Добавляем новую карточку
  containerCard.prepend(newCardElement);
  //Очищаем форму после добавления карточки в ленту
  addingForm.reset();
  addingCreateButton.classList.add('popup__button_disabled');
  addingCreateButton.setAttribute('disabled', 'true');

  closePopup(addingPopup);
}

//Добавление 6 исходных карточек
initialCards.forEach(item => {
  const card = new Card(item.name, item.link, '#card');
  const cardElement = card.createCard();
  containerCard.append(cardElement);
});

//Добавление слушателей событий
profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);

  nameInput.value = person.textContent;
  jobInput.value = characteristic.textContent;
});
profileAddButton.addEventListener('click', () => {
  openPopup(addingPopup);
});

profileExitButton.addEventListener('click', () => closePopup(profilePopup));
addingExitButton.addEventListener('click', () => closePopup(addingPopup));
viewingExitButton.addEventListener('click', () => closePopup(viewingPopup));

profileForm.addEventListener('submit', handleProfileFormSubmit);
addingForm.addEventListener('submit', handleAddingFormSubmit);

//Слушатель закрытия попапа по нажатию на оверлей (вне формы)
profileOverlay.addEventListener('click', () => closePopup(profilePopup));
addingOverlay.addEventListener('click', () => closePopup(addingPopup));
viewingOverlay.addEventListener('click', () => closePopup(viewingPopup));

//Включаем валидацию форм
const formEditValidation = new _FormValidator(object, profileForm);
formEditValidation.enableValidation();
const formAddValidation = new _FormValidator(object, addingForm);
formAddValidation.enableValidation();