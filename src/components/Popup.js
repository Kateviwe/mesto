import { ESC_CODE } from '../pages/index.js';

export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        //Происходит потеря контекста, чтобы это исключить используем метод bind()
        this._handleEscClose = this._handleEscClose.bind(this);
        this._exitButton = this._popupSelector.querySelector('.popup__exit');
        this._overlay = this._popupSelector.querySelector('.popup__overlay');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //Метод, который содержит логику закрытия попапа клавишей Esc
    _handleEscClose(evt) {
        if (evt.key === ESC_CODE) {
            this.close();
        }
    }

    //Метод, который добавляет слушатель клика иконке закрытия попапа,
    //модальное окно также закрывается при клике на затемнённую область вокруг формы
    setEventListeners() {
        this._exitButton.addEventListener('click', () => this.close());
        this._overlay.addEventListener('click', () => this.close());
    }
}