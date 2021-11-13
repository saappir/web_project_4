import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  _getInputValues = () => {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitButton.textContent = 'Saving...';
    } else {
      this._submitButton.textContent = text;
    }
  };

  setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.renderLoading(true);
    })
    super.setEventListeners()
  }
}
