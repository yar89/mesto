import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallbackFunction) {
    super(popupSelector);
    this._submitCallbackFunction = submitCallbackFunction;
    this._form = this._popup.querySelector(".popup__form");
    this._formInputList = this._form.querySelectorAll(".popup__input");
  }

  getInputValues() {
    const formInputValues = {};
    this._formInputList.forEach((formInput) => {
      formInputValues[formInput.name] = formInput.value;
    });
    return formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallbackFunction(this.getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
