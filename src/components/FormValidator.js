export class FormValidator {
    constructor(someObject, formElement) {
        this._inputSelector = someObject.inputSelector;
        this._submitButtonSelector = someObject.submitButtonSelector;
        this._inactiveButtonClass = someObject.inactiveButtonClass;
        this._inputErrorClass = someObject.inputErrorClass;
        this._errorClass = someObject.errorClass;
        this._formElement = formElement;
    }

    //Методы класса
    //Функция отображения, подчеркивания заданной ошибки определенного инпута
    _showInputError(inputElement, errorMessage) {
        //Добавление класса с ошибкой (если данные невалидны, то повляется нижняя красная рамка)
        inputElement.classList.add(this._inputErrorClass);
        //Вывод сообщений об ошибке
        //Поиск сообщения об ошибке, который относится к соответствующему инпуту
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
        //Изменение сообщения об ошибке
        inputError.textContent = errorMessage;
        //Отображение ошибки
        inputError.classList.add(this._errorClass);
    }

    //Функция сокрытия ошибки определенного инпута
    _hideInputError(inputElement) {
        //Удаление класса с ошибкой
        inputElement.classList.remove(this._inputErrorClass);
        //Удаление сообщения об ошибке
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = '';
    }

    //Функция проверки валидности инпута (если не валиден, то показываем ошибку, иначе - скрываем)
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    //Проверка валидности всех инпутов полей для управления активностью кнопки
    //(если все поля валидны - кнопка активна, иначе - нет)
    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    //Организация переключения состояния кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this._inactiveButtonClass);
            this.buttonElement.setAttribute('disabled', 'true');
        } else {
            this.buttonElement.classList.remove(this._inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled');
        }
    }

    resetValidation() {
        this._toggleButtonState(); //Управляем состоянием кнопки

        //Очищаем ошибки, которые могли быть, если пользователь ввел что-то некорректное в форму и закрыл ее
        this.inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
    }

    //Слушаем изменения инпутов, меняем состояние кнопки в зависимости от наличия/отсутствия ошибок
    _setEventListeners() {
        //Создание массива из всех полей (инпутов) формы
        this.inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this.buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    //Проводим полноценную валидацию (публичный метод)
    enableValidation() {    
        //На каждой форме вызываем проверку всех её инпутов
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}