//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
    constructor(info) {
        this._name = document.querySelector(info.nameSelector);
        this._characteristic = document.querySelector(info.characteristicSelector);
    }

    getUserInfo() {
        const userInfo = {
            userName: this._name.textContent,
            userCharacteristic: this._characteristic.textContent
        };
        return userInfo;
    }

    setUserInfo(newUserInfo) {
        this._name.textContent = newUserInfo.userName;
        this._characteristic.textContent = newUserInfo.userCharacteristic;
    }
}