//Поиск кнопок и попапа в DOM
const editButton = document.querySelector('.profile__button_purpose_edit');
const popUp = document.querySelector('.popup');
const exitButton = popUp.querySelector('.popup__exit');
//Поиск кнопок и второго попапа, который добавляет изображения в ленту, в DOM
const addButton = document.querySelector('.profile__button_purpose_add');
const popUpAdd = document.querySelector('.popup_purpose_add');
const exitButtonAdd = popUpAdd.querySelector('.popup__exit_purpose_add');
//Поиск кнопки и попапа, который открывает просмотр карточек
const popUpView = document.querySelector('.popup_purpose_view');
const exitButtonView = popUpView.querySelector('.popup__exit_purpose_view');
//Поиск форм в DOM
const formElement = popUp.querySelector('.popup__inner');
const formElementAdd = popUpAdd.querySelector('.popup__inner_purpose_add');
//Поиск полей форм в DOM
const nameInput = popUp.querySelector('.popup__text_purpose_name');
const jobInput = popUp.querySelector('.popup__text_purpose_characteristic');
const titleInput = popUpAdd.querySelector('.popup__text_purpose_title');
const srcInput = popUpAdd.querySelector('.popup__text_purpose_src');
//Поиск в профиле имени и характеристики пользователя в DOM
const person = document.querySelector('.profile__name');
const characteristic = document.querySelector('.profile__characteristic');
//Поиск контейнера для карточек в DOM
const containerCard = document.querySelector('.photogrid__container');
//Поиск template-тега карточки в DOM
const cardTemplate = document.querySelector('#card').content;
const cardItem = cardTemplate.querySelector('.photogrid__item');
const imageViewCard = document.querySelector('.photogrid__image');

const initialCards = [
    {
      name: 'Тулиновка',
      link: 'https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
      alt: 'Тулиновка'
    },
    {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1560255492-e69e132f19fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
      alt: 'Камчатка'
    },
    {
      name: 'Эльбрус',
      link: 'https://images.unsplash.com/photo-1603736115415-fd1f3473291f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt: 'Эльбрус'
    },
    {
      name: 'Алтай',
      link: 'https://images.unsplash.com/photo-1628534795682-94f707b4ce9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
      alt: 'Алтай'
    },
    {
      name: 'Домбай',
      link: 'https://images.unsplash.com/photo-1637579176819-36455abf2e97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
      alt: 'Домбай'
    },
    {
      name: 'Мурманск',
      link: 'https://images.unsplash.com/photo-1602505121461-963a812e0eae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
      alt: 'Мурманск'
    }
  ];

//При открытии модального окна данные из профиля записываются в форму
function openPopup() {
    popUp.classList.add('popup_opened');
    nameInput.value = person.textContent;
    jobInput.value = characteristic.textContent;
}

//Функция открытия модального окна, которое позволяет добавлять изображения в ленту
function openPopupAdd() {
    popUpAdd.classList.add('popup_opened');
    titleInput.value = '';
    srcInput.value = '';
}

//Закрытие модальных окн
function closePopup() {
  popUp.classList.remove('popup_opened');
}
function closePopupAdd() {
  popUpAdd.classList.remove('popup_opened');
}
function closePopupView() {
  popUpView.classList.remove('popup_opened');
}

//При нажатии кнопки 'Сохранить' данные из формы записываются в профиль и модальное окно закрывается
function formSubmitHandler (evt) {
    evt.preventDefault();

    person.textContent = nameInput.value;
    characteristic.textContent = jobInput.value;

    closePopup();
}

//Функция проставления лайков
function likePhoto(evt) {
  evt.target.classList.toggle('photogrid__like_active');
}

//Функция создания карточки
function createCard(nameNewCard, linkNewCard) {
  //Создадим шаблон template-тега карточки
  const newCardElement = cardItem.cloneNode(true);
  //Поиск ссылки на изображение и заголовка карточки в DOM
  const titleCard = newCardElement.querySelector('.photogrid__heading');
  const imageCard = newCardElement.querySelector('.photogrid__image');
  //Наполняем шаблон
  titleCard.textContent = nameNewCard;
  imageCard.src = linkNewCard;
  imageCard.alt = nameNewCard;

  //Найдем кнопки лайков среди картинок
  const likeCard = newCardElement.querySelector('.photogrid__like');
  likeCard.addEventListener('click', likePhoto);

  //Найдем кнопки удаления картинок
  const urnCard = newCardElement.querySelector('.photogrid__urn');
  urnCard.addEventListener('click', () => {
    const parentClickUrn = urnCard.closest('.photogrid__item');
    parentClickUrn.remove();
  });

  //Отслеживаем клик по изображению карточек
  imageCard.addEventListener('click', evt => {
    popUpView.classList.add('popup_opened');

    const titleViewCard = popUpView.querySelector('.popup__title');
    const imageViewCard = popUpView.querySelector('.popup__image');
    const goal = evt.target;

    titleViewCard.textContent = goal.alt;
    imageViewCard.src = goal.src;
  });

  exitButtonView.addEventListener('click', closePopupView);

  return newCardElement;
}

//При нажатии кнопки 'Создать' добавляется новая карточка в начало ленты и модальное окно закрывается
function formSubmitHandlerAdd (evt) {
  evt.preventDefault();

  const newCard = createCard(titleInput.value, srcInput.value);
  //Добавляем новую карточку
  containerCard.prepend(newCard);

  closePopupAdd();
}

//Добавление 6 исходных карточек
initialCards.forEach(item => {
  //Выводим исходные карточки массива в ленту
  containerCard.append(createCard(item.name, item.link));
  });

//Добавление слушателей событий
editButton.addEventListener('click', openPopup);
exitButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openPopupAdd);
exitButtonAdd.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);