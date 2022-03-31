import { viewingPopup, titleViewCard, srcViewCard, openPopup } from './script.js';

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

    //Функция создания карточки
    createCard() {
        this._element = this._getTemplate();
        this._urnCard = this._element.querySelector('.photogrid__urn');
        this._likeCard = this._element.querySelector('.photogrid__like');
        //Запись ссылки на изображение и заголовка карточки в DOM
        this._titleCard = this._element.querySelector('.photogrid__heading');
        this._imageCard = this._element.querySelector('.photogrid__image');

        //Наполняем шаблон
        this._titleCard.textContent = this._name;
        this._imageCard.src = this._link;
        this._imageCard.alt = this._alt;

        //Навешиваем слушатели событий
        //Слушатель клика по иконке лайка/сердечка на карточке
        this._likeCard.addEventListener('click', this._likePhoto);
        //Слушатель клика по иконке урны на карточке
        const urn = this._urnCard.addEventListener('click', () => {
            this._element.remove(); //Удаляет только разметку
            this._element = null; //Зануляем текущий объект (элемент с данными, слушателями) => освобождается память
            this._element.removeEventListener('click', urn);
        });
        //Отслеживаем клик по изображению карточек и записываем данные из карточки в эту же карточку в 
        //режиме просмотра (viewing)
        this._imageCard.addEventListener('click', () => {       
            titleViewCard.textContent = this._name;
            srcViewCard.src = this._link;
            srcViewCard.alt = this._alt;
            openPopup(viewingPopup);
        });
    
        return this._element;
    }
}