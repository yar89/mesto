export class Card {
  constructor(data, templateSelector, openPopupLargeImage) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openPopupLargeImage = openPopupLargeImage;
  }

  _getTemplate() {
    //забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //вернем  DOM-элемент карточки
    return cardElement;
  }

  //Публичный метод подготовит карточку к публикации
  generateCard() {
    //запишем разметку в приватное поле _element. Так у других эелеинтов появится доступ к ней
    this._element = this._getTemplate();

    //Добавим данные
    this._imageElement = this._element.querySelector(".card__image");
    this._likeButtonElement = this._element.querySelector(".card__like-button");
    this._deleteButtonElement = this._element.querySelector(
      ".card__delite-button"
    );
    this._cardTitle = this._element.querySelector(".card__title");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    //Вернем элемент наружу
    return this._element;
  }

  _likeCard() {
    this._likeButtonElement.classList.toggle("card__like-button_active");
  }

  _deleteCard(event) {
    this._deleteButtonElement = event.target.closest(".card");
    this._element.remove();
  }

  _openLargeImage() {
    this._openPopupLargeImage(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener("click", () => {
      this._likeCard();
    });

    this._deleteButtonElement.addEventListener("click", (event) => {
      this._deleteCard(event);
    });

    this._imageElement.addEventListener("click", () => {
      this._openLargeImage();
    });
  }
}
