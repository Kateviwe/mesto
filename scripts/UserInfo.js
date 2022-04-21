import { nameInput, jobInput } from './script.js';

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
    constructor(info) {
        this._nameSelector = info.nameSelector;
        this._characteristicSelector = info.characteristicSelector;
        this._name = document.querySelector(this._nameSelector);
        this._characteristic = document.querySelector(this._characteristicSelector);
    }

    getUserInfo() {
        nameInput.value = this._name.textContent;
        jobInput.value = this._characteristic.textContent;
             
        this._userValues = {};
        this._userValues[this._nameSelector] = nameInput.value;
        this._userValues[this._characteristicSelector] = jobInput.value;

        return this._userValues;
    }

    setUserInfo() {
        this._name.textContent = nameInput.value;
        this._characteristic.textContent = jobInput.value;
    }
}