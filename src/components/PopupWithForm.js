//Импорт класса Popup, который отвечает за открытие и закрытие попапов
import { Popup } from './Popup.js';

//Класс PopupWithForm собирает данные из всех инпутов переданной формы в некоторый объект в виде:
//name_инпута = введенное пользователем значение, сбрасывает форму при закрытии попапа,
//при сабмите формы класс обрабатывает её в зависимости от переданного ей handleSubmitForm
export class PopupWithForm extends Popup {
    constructor({ handleSubmitForm }, popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._handleSubmitForm = handleSubmitForm; //Колбэк сабмита формы
        this._form = this._popupElement.querySelector('.popup__inner');
        //Создание массива из всех полей (инпутов) формы
        this._inputFormList = Array.from(this._form.querySelectorAll('.popup__text'));
    }

    _getInputValues() {
        //Задаем пустой объект инпутов формы
        const formValues = {};
        this._inputFormList.forEach(inputElement => {
            //Добавляем в объект formValues введенные значения в инпуты с ключами, которые являются их именами в разметке
            formValues[inputElement.name] = inputElement.value;
        });
        return formValues;
    }

    close() {
        //Сбрасываем форму при закрытии попапа
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        //При сабмите формы происходит обработка формы в зависимости от переданного handleSubmitForm
        this._form.addEventListener('submit', () => {
            this._handleSubmitForm(this._getInputValues());
            this.close();
        });
        
    }
}