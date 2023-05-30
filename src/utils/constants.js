export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type-error",
  errorClass: "popup__error_visible",
};

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddCardButton = document.querySelector(
  ".profile__add-button"
);
export const profileEditForm = document.querySelector(
  ".popup__form_edit-profile"
);
export const cardAddForm = document.querySelector(".popup__form_add-card");

export const nameInput = document.querySelector(
  ".popup__input_type_profile-name"
);
export const jobInput = document.querySelector(
  ".popup__input_type_profile-profession"
);
export const avatarEditForm = document.querySelector(
  ".popup__form_edit-avatar"
);
export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-overlay"
);

export const popupProfileSelector = ".popup_type_edit-profile";
export const popupImageSelector = ".popup_type_large-image";
export const cardListSelector = ".cards__list";
export const nameUserSelector = ".profile__name";
export const professionUserSelector = ".profile__description";
export const avatarUserSelector = ".profile__avatar";
export const popupAddCardSelector = ".popup_type_add-card";
export const popupEditAvatarSelector = ".popup_type_edit-avatar";
export const popupDeleteCardSelector = ".popup_type_delete-card";
