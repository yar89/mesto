// Находим форму в DOM
const profileEditButton = document.querySelector('.profile__edit-button'); 
const profileAddCardButton = document.querySelector('.profile__add-button');
const profileUserName = document.querySelector('.profile__name');
const profileUserProfession = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.cards');
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

const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card-template').content;

//начальный массив изображений
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//отображение начального массива изображений на странице 
initialCards.forEach(function (element) {
  let imageName = element.name; 
  let imageLink = element.link;
  creatFunckCard(imageName,imageLink)
}); 


//функция открытия попапа
function openPopup(popup) {
popup.classList.add('popup_opened');
};

//функция открытия попапа редактирования профиля
function handleEditButton () {
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserProfession.textContent;
    openPopup(profileEditPopup);
}

//функция сохранения внесенных данных при редактировании профиля
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileUserName.textContent = nameInput.value;
  profileUserProfession.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

//функция открытия попапа добавления карточки
function handleAddCardButton () {
  openPopup(cardAddPopup);
};


//функция обработки кнопки submit в cardAddPopup
function handleAddCardForm(evt) {
  evt.preventDefault();
  creatFunckCard(cardName.value, cardLink.value);
  closePopup(cardAddPopup);
  evt.target.reset();
};


 //функция закрытия попапа
function closePopup (popup) {
   popup.classList.remove('popup_opened');
}

//функция добавления карточки на страницу
function creatFunckCard (name, link){
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardList.prepend(cardElement);
  const cardsCloneImage = document.querySelector('.card__image');
  cardsCloneImage.addEventListener('click', function () {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openPopupLargeImage();
  });
}


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

//добавление слушателя событий для удаления карточек
cardsContainer.addEventListener('click', function (evt) {
  deliteCard(evt);
 });

 //добавление слушателя событий для удаления лайков
 cardsContainer.addEventListener('click', function (evt) {
  likeCard(evt);
 });

 // закрытие формы редактирования профиля 
closeProfButton.addEventListener("click", function () {
  closePopup(profileEditPopup);
});

// закрытие формы увеличенной картинки 
closeLargeImageButton.addEventListener("click", function () {
  closePopup(popupLargeImage);
});

// закрытие формы добавления карточки 
closeAddcardButton.addEventListener("click", function () {
  closePopup(cardAddPopup);
});
 
 //обработчики событий
 profileEditButton.addEventListener('click', handleEditButton);
 profileAddCardButton.addEventListener('click', handleAddCardButton);
 profileEditForm.addEventListener('submit', handleFormSubmit);
 cardAddForm.addEventListener('submit', handleAddCardForm);


  

