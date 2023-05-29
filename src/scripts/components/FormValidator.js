export class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._buttonElement = form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
  }

  _showError(formInput, errorMessage) {
    const errorElement = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(formInput) {
    const errorElement = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(formInput) {
    if (!formInput.validity.valid) {
      this._showError(formInput, formInput.validationMessage);
    } else {
      this._hideError(formInput);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._form.addEventListener("reset", () => {
      this._disableButton();
    });
    this._inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._checkInputValidity(formInput);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((formInput) => {
      this._hideError(formInput);
    });
    this._disableButton();
  }
}
