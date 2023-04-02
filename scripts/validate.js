
//Функция, которая добавляет класс с ошибкой
const showError = (formElement, formInput, errorMessage) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add('popup__input_type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

//Функция, которая удаляет класс с ошибкой
const hideError = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove('popup__input_type-error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

//Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, formInput) => {
    if (!formInput.validity.valid) {
        showError(formElement, formInput, formInput.validationMessage);
    } else {
        hideError(formElement, formInput);
    }
};

//Добавляем слушатель событий всем полям ввода внутри формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        checkInputValidity(formElement, formInput);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 

  //Функция, которая находит и перебирает все формы на странице
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation(); 

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_disabled');
  } else {
    buttonElement.classList.remove('popup__submit-button_disabled');
  }
};


