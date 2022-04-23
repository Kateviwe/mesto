//Импорт главного CSS-файла
import './index.css';

//Импорт исходного набора карточек
import { initialCards } from '../components/initialCards.js';
//Импорт класса создания карточек Card
import { Card } from '../components/Card.js';
//Импорт класса валидации FormValidator
import { FormValidator } from '../components/FormValidator.js';
//Импорт класса Section, который отвечает за отрисовку элементов на странице
import { Section } from '../components/Section.js';
//Импорты классов, которые наследуют от Popup
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
//Импорт класса UserInfo, который отвечает за управление отображением информации о пользователе на странице
import { UserInfo } from '../components/UserInfo.js';

//Создание объекта настроек для проведения валидации
const object = {
  formSelector: '.popup__inner',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__inner_type_error',
  errorClass: 'popup__text-error_visible'
};

//Поиск кнопок и попапа в DOM
const profileEditButton = document.querySelector('.profile__button_purpose_edit');
const profilePopup = document.querySelector('.profile-popup');
//Поиск кнопок и второго попапа, который добавляет изображения в ленту, в DOM
const profileAddButton = document.querySelector('.profile__button_purpose_add');
const addingPopup = document.querySelector('.adding-popup');
//Поиск форм в DOM
const profileForm = profilePopup.querySelector('.popup__inner_purpose_edit');
const addingForm = addingPopup.querySelector('.popup__inner_purpose_add');
//Поиск полей форм в DOM
const nameInput = profilePopup.querySelector('.popup__text_purpose_name');
const jobInput = profilePopup.querySelector('.popup__text_purpose_characteristic');

const popupWithImage = new PopupWithImage('.viewing-popup');
const userInfoClass = new UserInfo({
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
const cardListSection = new Section({ items: initialCards, renderer: item => {
  const card = generateCard(item.name, item.link, '#card');
  cardListSection.addItem(card);
} }, '.photogrid__container');

//Добавляем исходные карточки с помощью класса Section
cardListSection.renderItems();

const popupWithFormProfile = new PopupWithForm({ handleSubmitForm: (objectFormValues) => {
  userInfoClass.setUserInfo({
    userName: objectFormValues.name,
    userCharacteristic: objectFormValues.characteristic
  });
}}, '.profile-popup');

const popupWithFormAdding = new PopupWithForm({ handleSubmitForm: (objectFormValues) => {

  const cardFilled = generateCard(objectFormValues.title, objectFormValues.src, '#card');
  //Добавляем новую карточку
  cardListSection.addItem(cardFilled);
}}, '.adding-popup');

//Добавление слушателей событий на иконки попапов для их открытия
profileEditButton.addEventListener('click', () => {
  const currentUserInfo = userInfoClass.getUserInfo();
  const currentUserName = currentUserInfo.userName;
  const currentUserCharacteristic = currentUserInfo.userCharacteristic;
  nameInput.value = currentUserName;
  jobInput.value = currentUserCharacteristic;

  formEditValidation.toggleButtonState();
  popupWithFormProfile.open();
});
profileAddButton.addEventListener('click', () => {
  formAddValidation.toggleButtonState();
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