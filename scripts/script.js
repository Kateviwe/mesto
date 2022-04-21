//Импорт исходного набора карточек
import { initialCards } from './initialCards.js';
//Импорт класса создания карточек Card
import { Card } from './Card.js';
//Импорт класса валидации FormValidator
import { FormValidator } from './FormValidator.js';
//Импорт класса Section, который отвечает за отрисовку элементов на странице
import { Section } from './Section.js';
//Импорты классов, которые наследуют от Popup
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
//Импорт класса UserInfo, который отвечает за управление отображением информации о пользователе на странице
import { UserInfo } from './UserInfo.js';

//Создание объекта настроек для проведения валидации
const object = {
  formSelector: '.popup__inner',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__inner_type_error',
  errorClass: 'popup__text-error_visible'
};

export const ESC_CODE = 'Escape';
//Поиск кнопок и попапа в DOM
const profileEditButton = document.querySelector('.profile__button_purpose_edit');
const profilePopup = document.querySelector('.profile-popup');
//Поиск кнопок и второго попапа, который добавляет изображения в ленту, в DOM
const profileAddButton = document.querySelector('.profile__button_purpose_add');
const addingPopup = document.querySelector('.adding-popup');
//Поиск кнопки и попапа, который открывает просмотр карточек
export const viewingPopup = document.querySelector('.viewing-popup');
//Поиск форм в DOM
const profileForm = profilePopup.querySelector('.popup__inner_purpose_edit');
const addingForm = addingPopup.querySelector('.popup__inner_purpose_add');
//Поиск полей форм в DOM
export const nameInput = profilePopup.querySelector('.popup__text_purpose_name');
export const jobInput = profilePopup.querySelector('.popup__text_purpose_characteristic');
const titleInput = addingPopup.querySelector('.popup__text_purpose_title');
const srcInput = addingPopup.querySelector('.popup__text_purpose_src');
//Поиск контейнера для карточек в DOM
const containerCard = document.querySelector('.photogrid__container');

export const addingCreateButton = addingPopup.querySelector('.popup__button_purpose_add');
//Поиск названия карточки и её картинки у попапа в DOM
export const titleViewCard = viewingPopup.querySelector('.popup__title');
export const srcViewCard = viewingPopup.querySelector('.popup__image');

const popupWithImage = new PopupWithImage(viewingPopup);
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  characteristicSelector: '.profile__characteristic'
});

//Функция создания карточки через класс Card
function generateCard (nameCard, linkCard, selectorCard) {
  const card = new Card({ name: nameCard, link: linkCard,
    handleCardClick: () => {
      popupWithImage.open(nameCard, linkCard, nameCard);
    }
  }, selectorCard);
  const cardElement = card.createCard();
  return cardElement;
}

//Добавление 6 исходных карточек
const initialCardList = new Section({ items: initialCards, renderer: item => {
  const initialCard = generateCard(item.name, item.link, '#card');
  initialCardList.addItem(initialCard);
} }, '.photogrid__container');

//Добавляем исходные карточки с помощью класса Section
initialCardList.renderItems();

const popupWithFormProfile = new PopupWithForm({ handleSubmitForm: () => {
  userInfo.setUserInfo();
}}, profilePopup);

const popupWithFormAdding = new PopupWithForm({ handleSubmitForm: () => {
  const cardFilled = generateCard(titleInput.value, srcInput.value, '#card');
  //Добавляем новую карточку
  containerCard.prepend(cardFilled);
  //Блокируем кнопку отправки
  formAddValidation.blockButtonSubmit();
}}, addingPopup);

//Добавление слушателей событий на иконки попапов для их открытия
profileEditButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  popupWithFormProfile.open();
});
profileAddButton.addEventListener('click', () => {
  popupWithFormAdding.open();
});

//Добавление слушателя нажатия крестика у окна просмотра картинки и слушателя нажатия
//на область подложки для закрытия попапа
popupWithFormProfile.setEventListeners();
popupWithFormAdding.setEventListeners();
popupWithImage.setEventListeners();

//Включаем валидацию форм
const formEditValidation = new FormValidator(object, profileForm);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(object, addingForm);
formAddValidation.enableValidation();