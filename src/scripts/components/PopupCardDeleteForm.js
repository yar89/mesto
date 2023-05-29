import { Popup } from "./Popup.js";

export class PopupCardDeleteForm extends Popup {
  constructor(popupSelector, submitCallbackFunction) {
    super(popupSelector);
    this._submitCallbackFunction = submitCallbackFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallbackFunction(this._item, this._cardId);
    });
  }

  open = (item, cardId) => {
    super.open();
    this._item = item;
    this._cardId = cardId;
  };
}
