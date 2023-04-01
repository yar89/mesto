// enableValidation ({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__submit-button',
//     inactiveButtonClass: 'popup__submit-button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// })

//Вынесем все необходимые элементы формы в константы 
//const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelector('.popup__input');


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
    //Удаляем активный класс ошибки с 
    errorElement.classList.remove('popup__error_visible');
    //Очищаем свойство textContent элемента 
    errorElement.textContent = '';
};

//Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, formInput) => {
    if (!formInput.validity.valid) {
        //Если поле не проходит валидацию, показывается ошибка
        showError(formElement, formInput, formInput.validationMessage);
    } else {
        //Если проходит, скроем
        hideError(formElement, formInput);
    }
};

const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    
    // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__submit-button');

    // Обойдём все элементы полученной коллекции
    inputList.forEach((formInput) => {
      // каждому полю добавим обработчик события input
      formInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        checkInputValidity(formElement, formInput);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 

  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation(); 

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((formInput) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !formInput.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__submit-button_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__submit-button_disabled');
  }
};


