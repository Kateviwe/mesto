//Создание объекта настроек
const object = {
    formSelector: '.popup__inner',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__inner_type_error',
    errorClass: 'popup__text-error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, someObject) => {
    //Добавление класса с ошибкой (если данные невалидны, то повляется нижняя красная рамка)
    inputElement.classList.add(someObject.inputErrorClass);
    //Вывод сообщений об ошибке
    //Поиск сообщения об ошибке, который относится к соответствующему инпуту
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    //Изменение сообщения об ошибке
    inputError.textContent = errorMessage;
    //Отображение ошибки
    inputError.classList.add(someObject.errorClass);
};

const hideInputError = (formElement, inputElement, someObject) => {
    //Удаление класса с ошибкой
    inputElement.classList.remove(someObject.inputErrorClass);
    //Удаление сообщения об ошибке
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputError.classList.remove(someObject.errorClass);
    inputError.textContent = '';

};

const isValid = (formElement, inputElement, someObject) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, someObject);
    } else {
        hideInputError(formElement, inputElement, someObject);
    }
};

//Проверка валидности инпутов полей для кнопки
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
//Переключение состояния кнопки
const toggleButtonState = (inputList, buttonElement, someObject) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(someObject.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(someObject.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, someObject) => {
    //Создание массива из всех инпутов формы
    const inputList = Array.from(formElement.querySelectorAll(someObject.inputSelector));
    const buttonElement = formElement.querySelector(someObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, someObject);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, someObject);
            toggleButtonState(inputList, buttonElement, someObject);
        });
    });
};

const enableValidation = (someObject) => {
    //Создание массива из всех форм
    const formList = Array.from(document.querySelectorAll(someObject.formSelector));
    //Отмена отправки каждой формы и вызов функции setEventListeners для проверки инпутов формы
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, someObject);
    });
};

enableValidation(object);