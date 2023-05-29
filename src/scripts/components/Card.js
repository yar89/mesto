export class Card {
  constructor(data, templateSelector, handleCardClick, openDeletePopup, changeLikes) {
    this._link = data.link;
    this._name = data.name;
    this._myid = data.myid;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._changeLikes = changeLikes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");
    this._likeButtonElement = this._element.querySelector(".card__like-button");
    this._deleteButtonElement = this._element.querySelector(
      ".card__delite-button"
    );
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    this._showNumberOfLikes();
        
    if (this._ownerId !== this._myid) {
     this._deleteButtonElement.style.display = 'none';
     }; 

    return this._element;
   }

  _likeCard() {
    this._changeLikes(this._likeButtonElement, this._cardId)
  }

  _deleteCard () {
    this._openDeletePopup(this, this._cardId);
  }

  _openLargeImage() {
    this._handleCardClick(this._link, this._name);
  }

  removeCard () {
    this._element.remove();
  }

  toggleLikes(likes) {
    this._likeButtonElement.classList.toggle("card__like-button_active");
    this._likeCounter.textContent = likes.length;
  }
  

  _showNumberOfLikes() {
    this._likes.forEach(element => {
      if (element._id === this._myid) {
        this._likeButtonElement.classList.add("card__like-button_active")
        return 
      }
    })
    this._likeCounter.textContent = this._likesLength;
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