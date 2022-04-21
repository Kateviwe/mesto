//Импорт класса Popup, который отвечает за открытие и закрытие попапов
import { Popup } from './Popup.js';

import { titleViewCard, srcViewCard } from './script.js';

//Класс PopupWithImage открывает карточку и перезаписывает в нее значения из значений, указанных в ленте карточек
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    
    open(name, link, alt) {
        titleViewCard.textContent = name;
        srcViewCard.src = link;
        srcViewCard.alt = alt;
        super.open();
    }
}