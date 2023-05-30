import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallbackFunction) {
    super(popupSelector);
    this._submitCallbackFunction = submitCallbackFunction;
    this._form = this._popup.querySelector(".popup__form");
    this._formInputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit-button");
  }

  getInputValues() {
    const formInputValues = {};
    this._formInputList.forEach((formInput) => {
      formInputValues[formInput.name] = formInput.value;
    });

    return formInputValues;
  }

  setInputsValues(dataUser) {
    this._formInputList.forEach((formInput) => {
      formInput.value = dataUser[formInput.name];
    });
  }

  showLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранить";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallbackFunction(this.getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
