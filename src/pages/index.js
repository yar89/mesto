import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupCardDeleteForm } from "../components/PopupCardDeleteForm.js";
import { Api } from "../components/Api.js";
import {
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
  avatarUserSelector,
  popupAddCardSelector,
  nameInput,
  jobInput,
  popupEditAvatarSelector,
  avatarEditForm,
  profileAvatarEditButton,
  popupDeleteCardSelector,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "99d58a08-6549-45c6-a13a-c7d0e437a4b0",
    "Content-Type": "application/json",
  },
});

//создание экземпляра класса UserInfo
const userInfo = new UserInfo(
  nameUserSelector,
  professionUserSelector,
  avatarUserSelector
);

//создание экземпляра класса PopupWithForm для формы редактирования профиля
const popupProfile = new PopupWithForm(
  popupProfileSelector,
  handleEditProfileFormSubmit
);
popupProfile.setEventListeners();

//создание экземпляра класса PopupWithForm для формы добавления карточек
const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  handleAddCardFormSubmit
);
popupAddCard.setEventListeners();

//создание экземпляра класса PopupWithForm для формы добавления аватара
const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  handleEditAvatarFormSubmit
);
popupEditAvatar.setEventListeners();

//создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//создание экземпляра класса PopupCardDeleteForm для формы удаления карточек
const popupDeleteCard = new PopupCardDeleteForm(
  popupDeleteCardSelector,
  handleDeleteCardFormSubmit
);
popupDeleteCard.setEventListeners();

//создание новой карточки
function createNewCard(item) {
  const card = new Card(
    item,
    ".card-template",
    popupImage.open,
    popupDeleteCard.open,
    (likeButtonElement, cardId) => {
      if (card._isLiked()) {
        api
          .deleteLikeCard(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => console.error(`Ошибка ${err}`));
      } else {
        api
          .putLikeCard(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => console.error(`Ошибка ${err}`));
      }
    }
  );
  return card.generateCard();
}

//создание экземпляра класса Section с начальными карточками и функцией создания разметки карточки
const section = new Section((item) => {
  section.addItem(createNewCard(item));
}, cardListSelector);

//создаем экземпляр класса FormValidator для formProfileEditValidator и запускаем валидацию
const formProfileEditValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
formProfileEditValidator.enableValidation();

//создаем экземпляр класса FormValidator для formAddCardValidator и запускаем валидацию
const formAddCardValidator = new FormValidator(validationConfig, cardAddForm);
formAddCardValidator.enableValidation();

//создаем экземпляр класса  FormValidator для formEditAvatarValidator и запускаем валидацию
const formEditAvatarValidator = new FormValidator(
  validationConfig,
  avatarEditForm
);
formEditAvatarValidator.enableValidation();

// Функция колбэк сабмита формы для редактирования профиля
function handleEditProfileFormSubmit(data) {
  popupProfile.showLoading(true);
  api
    .setUsersInfo(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        profession: res.about,
        avatar: res.avatar,
      });
      popupProfile.close();
    })
    .catch((err) => console.error(`Ошибка редактирования профиля ${err}`))
    .finally(() => {
      popupProfile.showLoading(false);
    });
}

// Функция колбэк сабмита формы для добавления карточки
function handleAddCardFormSubmit(data) {
  popupAddCard.showLoading(true);
  api
    .addNewCard(data)
    .then((dataCard) => {
      dataCard.myid = userInfo.getid();
      section.addItem(createNewCard(dataCard));
      popupAddCard.close();
    })
    .catch((err) =>
      console.error(`Ошибка при добавлении новой карточки ${err}`)
    )
    .finally(() => {
      popupAddCard.showLoading(false);
    });
}

// Функция колбэк сабмита формы для удаления карточек
function handleDeleteCardFormSubmit(item, cardId) {
  api
    .deleteCardFromServer(cardId)
    .then(() => {
      item.removeCard();
      popupDeleteCard.close();
    })
    .catch((err) => console.error(`Ошибка при удалении карточки ${err}`));
}

//Функция колбэк сабмита формы для редактирования аватара
function handleEditAvatarFormSubmit(link) {
  popupEditAvatar.showLoading(true);
  api
    .updateUserAvatar(link)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        profession: res.about,
        avatar: res.avatar,
      });
      popupEditAvatar.close();
    })
    .catch((err) => console.error(`Ошибка редактирования аватара ${err}`))
    .finally(() => {
      popupEditAvatar.showLoading(false);
    });
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

//функция открытия попапа редактирования аватара
function handleEditAvatarButtonClick() {
  formEditAvatarValidator.resetValidation();
  popupEditAvatar.open();
}

//обработчики событий
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddCardButton.addEventListener("click", handleAddCardButtonClick);
profileAvatarEditButton.addEventListener("click", handleEditAvatarButtonClick);

Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()])
  .then(([dataUser, dataCard]) => {
    userInfo.setUserInfo({
      name: dataUser.name,
      profession: dataUser.about,
      avatar: dataUser.avatar,
    });
    userInfo.setid(dataUser._id);
    dataCard.forEach((element) => (element.myid = dataUser._id));
    section.renderCardItems(dataCard.reverse());
  })
  .catch((err) =>
    console.error(`Ошибка редактирования данных страницы ${err}`)
  );
