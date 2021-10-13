import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues = () => {
    const inputs = [...this._form.querySelectorAll('.popup__input')]
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    })
    super.setEventListeners()
  }
}
