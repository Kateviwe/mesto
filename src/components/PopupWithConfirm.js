//Импорт класса Popup, который отвечает за открытие и закрытие попапов
import { Popup } from './Popup.js';

//Класс PopupWithConfirm подтверждает удаление карточки
export class PopupWithConfirm extends Popup {
    constructor({ handleSubmitDeleteCard }, popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._handleSubmitDeleteCard = handleSubmitDeleteCard; //Колбэк сабмита попапа подтверждения
        this._button = this._popupElement.querySelector('.popup__button');
        //Происходит потеря контекста => воспользуемся bind
        this._putSubmit = this._putSubmit.bind(this);
    }

    _putSubmit(evt) {
        evt.preventDefault();
        this._handleSubmitDeleteCard(this._cardInfo);
    }

    setEventListeners(cardInfo) {
        this._cardInfo = cardInfo;
        super.setEventListeners();
        this._button.addEventListener('click', this._putSubmit);   
    }
}