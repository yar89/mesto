import './pages/index.css';

import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { Section } from "./scripts/components/Section.js";
import { UserInfo } from "./scripts/components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  profileEditButton,
  profileAddCardButton,
  profileEditForm,
  cardAddForm,
  popupProfileSelector,
  popupImageSelector,
  cardListSelector,
  nameUserSelector,
  professionUserSelector,
  popupAddCardSelector,
  nameInput,
  jobInput,
} from "./scripts/utils/constants.js";

const userInfo = new UserInfo(nameUserSelector, professionUserSelector);

const popupProfile = new PopupWithForm(
  popupProfileSelector,
  handleEditProfileFormSubmit
);
popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  handleAddCardFormSubmit
);
popupAddCard.setEventListeners();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card-template", popupImage.open);
      return card.generateCard();
    },
  },
  cardListSelector
);
section.renderCardItems();

//создаем экземпляр класса FormValidator для formProfileEditValidator и запускаем валидацию
const formProfileEditValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
formProfileEditValidator.enableValidation();

//создаем экземпляр класса FormValidator для formAddCardValidator и запускаем валидацию
const formAddCardValidator = new FormValidator(validationConfig, cardAddForm);
formAddCardValidator.enableValidation();

// Функция колбэк сабмита формы для редактирования профиля
function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupProfile.close();
}

// Функция колбэк сабмита формы для добавления карточки
function handleAddCardFormSubmit() {
  section.addItem(section.renderer(popupAddCard.getInputValues()));
  popupAddCard.close();
}

//функция открытия попапа редактирования профиля
function handleEditProfileButtonClick() {
  formProfileEditValidator.resetValidation();
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.profession; 
  popupProfile.open();
}

//функция открытия попапа добавления карточки
function handleAddCardButtonClick() {
  formAddCardValidator.resetValidation();
  popupAddCard.open();
}

//обработчики событий
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddCardButton.addEventListener("click", handleAddCardButtonClick);
