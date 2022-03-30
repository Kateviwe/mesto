import {openPopup} from './script.js';

export class Card {
    constructor(nameNewCard, linkNewCard, cardSelector) {
        this._name = nameNewCard;
        this._link = linkNewCard;
        this._alt = nameNewCard;
        this._cardSelector = cardSelector;
    }

    //Методы класса
    //Достанем разметку из DOM
    _getTemplate() {
        //Поиск template-тега карточки в DOM
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardItem = cardTemplate.querySelector('.photogrid__item');
        //Создадим шаблон template-тега карточки
        const newCardElement = cardItem.cloneNode(true);
        return newCardElement;
    }

    //Функция проставления лайков
    _likePhoto(evt) {
        evt.target.classList.toggle('photogrid__like_active');
    }

    //Найдем кнопки лайков среди картинок
    _handleLikeCardClick() {
        const likeCard = this._element.querySelector('.photogrid__like');
        likeCard.addEventListener('click', this._likePhoto);
    }
    //Найдем кнопки удаления картинок
    _handleDeleteCardClick() {
        const urnCard = this._element.querySelector('.photogrid__urn');
        urnCard.addEventListener('click', () => {
        const parentClickUrn = this._element.closest('.photogrid__item');
        parentClickUrn.remove();
        });
    }

    //Отслеживаем клик по изображению карточек и записываем данные из карточки в эту же карточку в 
    //режиме просмотра (viewing)
    _handleClickOnCard() {
        
        const viewingPopup = document.querySelector('.viewing-popup');
        const imageCard = this._element.querySelector('.photogrid__image');

        imageCard.addEventListener('click', evt => {
        openPopup(viewingPopup);
        const titleViewCard = viewingPopup.querySelector('.popup__title');
        const srcViewCard = viewingPopup.querySelector('.popup__image');
    
        const goal = evt.target;
    
        titleViewCard.textContent = goal.alt;
        srcViewCard.src = goal.src;
        srcViewCard.alt = goal.alt;
        });
    }

    //Функция создания карточки
    createCard() {
        this._element = this._getTemplate();
        //Поиск ссылки на изображение и заголовка карточки в DOM
        const titleCard = this._element.querySelector('.photogrid__heading');
        const imageCard = this._element.querySelector('.photogrid__image');
        //Наполняем шаблон
        titleCard.textContent = this._name;
        imageCard.src = this._link;
        imageCard.alt = this._alt;
    
        this._handleLikeCardClick();
        this._handleDeleteCardClick();
        this._handleClickOnCard();
    
        return this._element;
    }
}