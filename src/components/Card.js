export class Card {
    constructor( { name, link, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector, user) {
        this._name = name;
        this._link = link;
        this._alt = name;
        this._cardSelector = cardSelector;
        //Функция, которая должна открывать попап с картинкой при клике на карточку
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        //Записываем данные текущего пользователя
        this._user = user;
    }

    //Методы класса
    //Достанем разметку из DOM
    _getTemplate() {
        //Поиск template-тега карточки в DOM
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardItem = cardTemplate.querySelector('.photogrid__item');
        //Создадим шаблон template-тега карточки
        const newCardElement = cardItem.cloneNode(true);
        return newCardElement;
    }

    //Выводим изначальное число лайков на каждой карточке и, если пользователь лайкнул ее, то закрашиваем сердечко
    _initialLikeCard() {
        this._likeNumber.textContent = this.data.likes.length;
        //Нам возвращается объект с данными о карточке (хранится в data),
        //this.data.likes - массив, который состоит из объектов данных пользователей, лайкнувших карточку,
        //some проверяет, есть ли в объекте каждого пользователя в свойстве _id: id текущего пользователя
        if(this.data.likes.some((likes) => likes._id === this._user._id)) {
            this._likeCard.classList.add('photogrid__like_active');
        }
    }

    putLikes(newData) {
        this._likeCard.classList.add('photogrid__like_active');
        this.data.likes = newData.likes;
        //Отображаем число лайков на карточке
        this._likeNumber.textContent = newData.likes.length;
    }

    deleteLikes(newData) {
        this._likeCard.classList.remove('photogrid__like_active');
        this.data.likes = newData.likes;
        //Отображаем число лайков на карточке
        this._likeNumber.textContent = newData.likes.length;
    }

    //Функция создания карточки
    createCard(data) {
        this.data = data;
        this._element = this._getTemplate();
        this._urnCard = this._element.querySelector('.photogrid__urn');
        this._likeCard = this._element.querySelector('.photogrid__like');
        this._likeNumber = this._element.querySelector('.photogrid__like-number');
        //Запись ссылки на изображение и заголовка карточки в DOM
        this._titleCard = this._element.querySelector('.photogrid__heading');
        this._imageCard = this._element.querySelector('.photogrid__image');

        //Наполняем шаблон
        this._titleCard.textContent = this._name;
        this._imageCard.src = this._link;
        this._imageCard.alt = this._alt;

        //Удаляем узел DOM-дерева, который отвечает за иконку корзинки на карточке, если картинка не была создана нами
        if(this.data.owner._id !== this._user._id) {
            this._urnCard.remove();
            this._urnCard = null;
        } else {
            //Навешиваем слушатели событий
            //Слушатель клика по иконке урны на карточке пользователя
            this._urnCard.addEventListener('click', () => {
                this._handleDeleteIconClick({
                    idCard: this.data._id,
                    markupCard: this._element
                });
            });
        }

        //Устанавливаем изначальное число лайков каждой карточки
        this._initialLikeCard();

        //Слушатель клика по иконке лайка/сердечка на карточке
        this._likeCard.addEventListener('click', () => {
            this._handleLikeClick({
                idCard: this.data._id,
                likeListServer: this.data.likes
            });
        });
                
        //Отслеживаем клик по изображению карточек и записываем данные из карточки в эту же карточку в 
        //режиме просмотра (viewing)
        this._imageCard.addEventListener('click', () => {       
            this._handleCardClick({
                name: this._name,
                link: this._link,
                alt: this._alt
            });
        });
    
        return this._element;
    }
}