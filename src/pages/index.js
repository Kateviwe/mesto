//Импорт главного CSS-файла
import './index.css';

//Импорт класса создания карточек Card
import { Card } from '../components/Card.js';
//Импорт класса валидации FormValidator
import { FormValidator } from '../components/FormValidator.js';
//Импорт класса Section, который отвечает за отрисовку элементов на странице
import { Section } from '../components/Section.js';
//Импорты классов, которые наследуют от Popup
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
//Импорт класса UserInfo, который отвечает за управление отображением информации о пользователе на странице
import { UserInfo } from '../components/UserInfo.js';
//Импорт класса Api, который работает с сервером (запросы, ответы)
import { Api } from '../components/Api.js';

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
//Поиск аватара пользователя и попапа по замене аватара в DOM
const profileAvatar = document.querySelector('.profile__icon-edit');
const changeAvatarPopup = document.querySelector('.avatar-popup');
//Поиск форм в DOM
const profileForm = profilePopup.querySelector('.popup__inner_purpose_edit');
const addingForm = addingPopup.querySelector('.popup__inner_purpose_add');
const changeAvatarForm = changeAvatarPopup.querySelector('.popup__inner_purpose_change-avatar');
//Поиск полей форм в DOM
const nameInput = profilePopup.querySelector('.popup__text_purpose_name');
const jobInput = profilePopup.querySelector('.popup__text_purpose_characteristic');

const buttonSubmitProfileInfo = profilePopup.querySelector('.popup__button_purpose_edit');
const buttonSubmitProfileAvatar = changeAvatarPopup.querySelector('.popup__button_purpose_change-avatar');
const buttonSubmitAddingCard = addingPopup.querySelector('.popup__button_purpose_add');


//Создание экземпляра класса Api
const api = new Api({
  url: 'nomoreparties.co/v1/cohort-40'
});

//Данные пользователя
const userInfoClass = new UserInfo({
  nameSelector: '.profile__name',
  characteristicSelector: '.profile__characteristic',
  avatarSelector: '.profile__avatar'
});

const popupWithImage = new PopupWithImage('.viewing-popup');
const popupWithConfirmCardDelete = new PopupWithConfirm({ handleSubmitDeleteCard: (cardInfo) => {
  //Отправляем запрос на удаление карточки
  const deleteCardRequest = (id) => {
    api
    .deleteCard(id)
    .then(() => {
      popupWithConfirmCardDelete.close();
      cardInfo.markupCard.remove(); //Удаляет только разметку
      cardInfo.markupCard = null; //Зануляем текущий объект (элемент с данными) => освобождается память
    })
    .catch((err) => console.log(err));
  };
  deleteCardRequest(cardInfo.idCard);
}},'.delete-confirmation-popup');

//Создаем функцию для удаления карточки
const deleteCard = (cardInfo) => {
  popupWithConfirmCardDelete.open();
  popupWithConfirmCardDelete.chooseDeleteCard(cardInfo);
};

//Функция создания карточки через класс Card
function generateCard (data, nameCard, linkCard, selectorCard, userInfo) {
  const card = new Card({ name: nameCard, link: linkCard,
    handleCardClick: () => {
      popupWithImage.open(nameCard, linkCard, nameCard);
    },
    handleLikeClick: (likeInfo) => {
      if (likeInfo.likeListServer.some((likes) => likes._id === userInfo._id)) {
        const deleteLikeRequest = (id) => {
          api
          .deleteLikeCard(id)
          .then((data) => {
            card.deleteLikes(data);
          })
          .catch((err) => console.log(err));
        };
        deleteLikeRequest(likeInfo.idCard);
      } else {
        const putLikeRequest = (id) => {
          api
          .putLikeCard(id)
          .then((data) => {
            card.putLikes(data);
          })
          .catch((err) => console.log(err));
        };
        putLikeRequest(likeInfo.idCard);
      }
    },
    handleDeleteIconClick: (cardInfo) => {
      deleteCard(cardInfo);
    }
  }, selectorCard, userInfo);
  const cardElement = card.createCard(data);
  return cardElement;
}

//Навесим слушатели событий на попап подтверждения удаления
popupWithConfirmCardDelete.setEventListeners();

//Сначала получим данные пользователя и изначальные карточки, а после - загрузим
Promise.all([api.getInfoFromServer(), api.getCardsFromServer()])
  .then(([userData, data]) => {
    userInfoClass.setUserInfo({
      name: userData.name,
      characteristic: userData.about,
    });
    userInfoClass.setUserAvatar({
      avatar: userData.avatar
    });
    //Загрузка исходных карточек с сервера
    //Добавление исходных карточек
    const cardListSection = new Section({ renderer: item => {
      const card = generateCard(item, item.name, item.link, '#card', userData);
      cardListSection.addItem(card);
    } }, '.photogrid__container');

    //Получим данные по исходным карточкам с сервера
    //Добавляем исходные карточки с помощью класса Section
    cardListSection.renderItems(data.reverse());

    const popupWithFormAdding = new PopupWithForm({ handleSubmitForm: (objectFormValues) => {
      buttonSubmitAddingCard.textContent = 'Сохранение...';
      //Загружаем новые карточки на сервер
      const addNewCardRequest = (newCardInfo) => {
        api
        .addNewCard({
          nameCard: newCardInfo.title,
          linkCard: newCardInfo.src
        })
        .then((data) => {
          const cardFilled = generateCard(data, objectFormValues.title, objectFormValues.src, '#card', userData);
          popupWithFormAdding.close();
          //Добавляем новую карточку
          cardListSection.addItem(cardFilled);
        })
        .catch((err) => console.log(err))
        .finally(() => buttonSubmitAddingCard.textContent = 'Сохранить');
      };
      addNewCardRequest(objectFormValues);
    }}, '.adding-popup');
    profileAddButton.addEventListener('click', () => {
      popupWithFormAdding.open();
    });
    popupWithFormAdding.setEventListeners();
  })
  .catch((err) => console.log(err));

const popupWithFormProfile = new PopupWithForm({ handleSubmitForm: (objectFormValues) => {
  buttonSubmitProfileInfo.textContent = 'Сохранение...';
  const changeUserRequest = () => {
    api
    .changeUserInfo(objectFormValues)
    .then((data) => {
      popupWithFormProfile.close();
      userInfoClass.setUserInfo({
        name: data.name,
        characteristic: data.about
      });
    })
    .catch((err) => console.log(err))
    .finally(() => buttonSubmitProfileInfo.textContent = 'Сохранить');
  };
  changeUserRequest();
}}, '.profile-popup');

//Создадим экземпляр класса PopupWithForm для возможности смены аватара
const popupWithFormProfileAvatar = new PopupWithForm({ handleSubmitForm: (objectFormAvatarValues) => {
  buttonSubmitProfileAvatar.textContent = 'Сохранение...';
  const changeUserAvatarRequest = () => {
    api
    .changeUserAvatar(objectFormAvatarValues)
    .then((userDataAvatar) => {
      popupWithFormProfileAvatar.close();
      userInfoClass.setUserAvatar({
        avatar: userDataAvatar.avatar
      });
    })
    .catch((err) => console.log(err))
    .finally(() => buttonSubmitProfileAvatar.textContent = 'Сохранение');
  };
  //Создание запроса на смену аватара
  changeUserAvatarRequest();
}}, '.avatar-popup');

//Добавление слушателей событий на иконки попапов для их открытия
profileEditButton.addEventListener('click', () => {
  const currentUserInfo = userInfoClass.getUserInfo();
  const currentUserName = currentUserInfo.userName;
  const currentUserCharacteristic = currentUserInfo.userCharacteristic;
  nameInput.value = currentUserName;
  jobInput.value = currentUserCharacteristic;

  formEditValidation.resetValidation();
  popupWithFormProfile.open();
});
profileAddButton.addEventListener('click', () => {
  formAddValidation.resetValidation();
});

//Добавление слушателя нажатия крестика у окна просмотра картинки и слушателя нажатия
//на область подложки для закрытия попапа
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();

//Добавление слушателя события на нажатие на аватар пользователя для его редактирования
profileAvatar.addEventListener('click', () => {
  formchangeAvatarValidation.resetValidation();
  popupWithFormProfileAvatar.open();
});

popupWithFormProfileAvatar.setEventListeners();

//Включаем валидацию форм
const formEditValidation = new FormValidator(object, profileForm);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(object, addingForm);
formAddValidation.enableValidation();
const formchangeAvatarValidation = new FormValidator(object, changeAvatarForm);
formchangeAvatarValidation.enableValidation();