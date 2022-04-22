export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        //Происходит потеря контекста, чтобы это исключить используем метод bind()
        this._handleEscClose = this._handleEscClose.bind(this);
        this._exitButton = this._popupElement.querySelector('.popup__exit');
        this._overlay = this._popupElement.querySelector('.popup__overlay');
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //Метод, который содержит логику закрытия попапа клавишей Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
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