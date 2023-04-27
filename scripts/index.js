import { initialCards, validationConfig } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Находим форму в DOM
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddCardButton = document.querySelector(".profile__add-button");
const profileUserName = document.querySelector(".profile__name");
const profileUserProfession = document.querySelector(".profile__description");
const cardList = document.querySelector(".cards__list");
const profileEditPopup = document.querySelector(".popup_type_edit-profile");
const nameInput = profileEditPopup.querySelector(
  ".popup__input_type_profile-name"
);
const jobInput = profileEditPopup.querySelector(
  ".popup__input_type_profile-profession"
);
const cardAddPopup = document.querySelector(".popup_type_add-card");
const cardName = cardAddPopup.querySelector(".popup__input_type_place-name");
const cardLink = cardAddPopup.querySelector(".popup__input_type_link");
const profileEditForm = profileEditPopup.querySelector(
  ".popup__form_edit-profile"
);
const cardAddForm = cardAddPopup.querySelector(".popup__form_add-card");
const closeProfButton = document.querySelector(".popup__close_profile");
const closeAddcardButton = document.querySelector(".popup__close_add-card");
const closeLargeImageButton = document.querySelector(
  ".popup__close_large-image"
);
const popupLargeImage = document.querySelector(".popup_type_large-image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__image-caption");

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

//функция открытия попапа редактирования профиля
function handleEditButtonClick() {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserProfession.textContent;
  openPopup(profileEditPopup);
}

//функция сохранения внесенных данных при редактировании профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserProfession.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

//функция открытия попапа добавления карточки
function handleAddCardButtonClick() {
  openPopup(cardAddPopup);
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

//функция создания карточки
function addNewCard(item) {
  const card = new Card(item, ".card-template", openPopupLargeImage);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
}

//функция обработки кнопки submit в cardAddPopup/добавление новой карточки в разметку
function handleAddCard(evt) {
  evt.preventDefault();
  const newUserCard = { name: cardName.value, link: cardLink.value };
  addNewCard(newUserCard);
  closePopup(cardAddPopup);
  evt.target.reset();
}

//функция открытия увеличенного изображения карточки
function openPopupLargeImage(cardName, cardLink) {
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupImageCaption.textContent = cardName;
  openPopup(popupLargeImage);
}

//обработчики событий
profileEditButton.addEventListener("click", handleEditButtonClick);
profileAddCardButton.addEventListener("click", handleAddCardButtonClick);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
cardAddForm.addEventListener("submit", handleAddCard);

//функция закрытия попапа по нажатию на Escape
function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// закрытие всех попапов на крестик и оверлей
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

//Вывод карточек начального массива
initialCards.forEach((item) => {
  addNewCard(item);
});

//создаем экземпляр класса FormValidator для formProfileEditValidator и запускаем валидацию
const formProfileEditValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
formProfileEditValidator.enableValidation();

//создаем экземпляр класса FormValidator для formAddCardValidator и запускаем валидацию
const formAddCardValidator = new FormValidator(validationConfig, cardAddForm);
formAddCardValidator.enableValidation();

