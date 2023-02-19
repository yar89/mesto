// Находим форму в DOM
let editProfileButton = document.querySelector('.profile__edit-button'); 
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type-name');
let jobInput = popup.querySelector('.popup__input_type-profession');
let profileUserName = document.querySelector('.profile__name');
let profileUserProfession = document.querySelector('.profile__description');

let handleEditButtonClick = () => {
    popup.classList.add('popup_opened');
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserProfession.textContent;
}

let handleCloseButtonClick = () => {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileUserName.textContent = nameInput.value;
    profileUserProfession.textContent = jobInput.value;
    handleCloseButtonClick();
}

editProfileButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popupForm.addEventListener('submit', handleFormSubmit);

