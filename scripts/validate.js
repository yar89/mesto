
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Функция, которая находит и перебирает все формы на странице
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector))

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
  })
};


//Добавляем слушатель событий всем полям ввода внутри формы
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  formElement.addEventListener('reset', () => {
    disableButton(buttonElement, inactiveButtonClass);
  })
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkInputValidity(formElement, formInput, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass, errorClass);
    });
  });

};

//Функция, которая добавляет класс с ошибкой
const showError = (formElement, formInput, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Функция, которая удаляет класс с ошибкой
const hideError = (formElement, formInput, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};



//Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, formInput, inputErrorClass, errorClass) => {
  if (!formInput.validity.valid) {
    showError(formElement, formInput, formInput.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(formElement, formInput, inputErrorClass, errorClass);
  }
};



// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
};

//функция, деактивирующая кнопку
const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

enableValidation(validationConfig);
