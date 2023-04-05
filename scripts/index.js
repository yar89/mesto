// Находим форму в DOM


const profileEditButton = document.querySelector('.profile__edit-button'); 
const profileAddCardButton = document.querySelector('.profile__add-button');
const profileUserName = document.querySelector('.profile__name');
const profileUserProfession = document.querySelector('.profile__description');
const cardList = document.querySelector('.cards__list');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const nameInput = profileEditPopup.querySelector('.popup__input_type_profile-name');
const jobInput = profileEditPopup.querySelector('.popup__input_type_profile-profession');
const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardName = cardAddPopup.querySelector('.popup__input_type_place-name');
const cardLink = cardAddPopup.querySelector('.popup__input_type_link');
const cardAddForm = cardAddPopup.querySelector('.popup__form');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const closeProfButton = document.querySelector('.popup__close_profile');
const closeAddcardButton = document.querySelector('.popup__close_add-card');
const closeLargeImageButton = document.querySelector('.popup__close_large-image');
const popupLargeImage = document.querySelector('.popup_type_large-image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');
const cardTemplate = document.querySelector('.card-template');


//отображение начального массива изображений на странице 
initialCards.forEach(function (element) {
  cardList.append(creatFunckCard(element.name, element.link))
}); 


//функция открытия попапа
function openPopup(popup) {
popup.classList.add('popup_opened');
document.addEventListener('keydown', closeByEscape);
};

//функция открытия попапа редактирования профиля
function handleEditButton () {
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserProfession.textContent;
    openPopup(profileEditPopup);
}

//функция сохранения внесенных данных при редактировании профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileUserName.textContent = nameInput.value;
  profileUserProfession.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

//функция открытия попапа добавления карточки
function handleAddCardButton () {
  openPopup(cardAddPopup);
};


 //функция закрытия попапа
function closePopup (popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closeByEscape);
}

//функция создания карточки/установка слушателей 
function creatFunckCard (cardName, cardLink){
     const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
     const cardImage = cardElement.querySelector('.card__image');
     const cardDeliteButton = cardElement.querySelector('.card__delite-button');
     const cardLikeButton = cardElement.querySelector('.card__like-button');
     cardImage.alt = cardName;
     cardElement.querySelector('.card__title').textContent = cardName;
     cardImage.src = cardLink;
    
  //добавление слушателя событий для удаления карточек
  cardDeliteButton.addEventListener('click', function (evt) {
      deliteCard(evt);

  });

  //добавление слушателя событий для удаления лайков
  cardLikeButton.addEventListener('click', function (evt) {
      likeCard(evt);
     });

  cardImage.addEventListener('click', function () {
    popupImage.src = cardLink;
    popupImage.alt = cardName;
    popupImageCaption.textContent = cardName;
    openPopupLargeImage();
   });
  return cardElement;
  };


//функция обработки кнопки submit в cardAddPopup/добавление новой карточки в разметку
function handleAddCardForm(evt) {
  evt.preventDefault();
  cardList.prepend(creatFunckCard(cardName.value, cardLink.value));
  closePopup(cardAddPopup);
  evt.target.reset();
  };

  

 //функция удаления карточек
function deliteCard(event) {
  if (event.target.classList.contains('card__delite-button')) {
    const cardToDelite = event.target.closest('.card');
    cardToDelite.remove();
  }
};

//функция обработки кнопки лайка
function likeCard(event) {
  if (event.target.matches('.card__like-button')) {
    const cardToLike = event.target.closest('.card__like-button');
    cardToLike.classList.toggle('card__like-button_active');
  }
};

//функция открытия увеличенного изображения карточки
function openPopupLargeImage () {
  openPopup(popupLargeImage);
}

//  // закрытие формы редактирования профиля 
// closeProfButton.addEventListener("click", function () {
//   closePopup(profileEditPopup);
// });

// // закрытие формы увеличенной картинки 
// closeLargeImageButton.addEventListener("click", function () {
//   closePopup(popupLargeImage);
// });

// // закрытие формы добавления карточки 
// closeAddcardButton.addEventListener("click", function () {
//   closePopup(cardAddPopup);
// });
 
 //обработчики событий
 profileEditButton.addEventListener('click', handleEditButton);
 profileAddCardButton.addEventListener('click', handleAddCardButton);
 profileEditForm.addEventListener('submit', handleProfileFormSubmit);
 cardAddForm.addEventListener('submit', handleAddCardForm);

 // закрывает попап по клику за его пределами
// const popupList = document.querySelectorAll(".popup"); 
// popupList.forEach((popup) => {
//   popup.addEventListener("click", function (evt) {
//     if (evt.target === popup) {
//       //closePopup (popup);
//       }
//      });
//     //  document.addEventListener('keydown', function (evt) {
//     //    if (evt.key === 'Escape') {
//     //   closePopup (popup);
//     //   };
//     // });  
// });

//функция закрытия попапа по нажатию на Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}


// закрытие всех попапов на крестик и оверлей
 const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    })
})





