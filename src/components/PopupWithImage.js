//Импорт класса Popup, который отвечает за открытие и закрытие попапов
import { Popup } from './Popup.js';

//Класс PopupWithImage открывает карточку и перезаписывает в нее значения из значений, указанных в ленте карточек
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        //Поиск названия карточки и её картинки у попапа в DOM
        this._titleViewCard = this._popupElement.querySelector('.popup__title');
        this._srcViewCard = this._popupElement.querySelector('.popup__image');
    }
    
    open(name, link, alt) {
        this._titleViewCard.textContent = name;
        this._srcViewCard.src = link;
        this._srcViewCard.alt = alt;
        super.open();
    }
}