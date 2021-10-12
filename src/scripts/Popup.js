import { open, close } from "./utils.js"

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleRemoteClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.close();
    }
  };

  open() {
    open(this._popupElement)
  };

  close() {
    close(this._popupElement)
  };


  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('click', this._handleRemoteClick);
    this._popupElement.querySelector('.popup__exit-button')
      .addEventListener('click', () => this.close());
  }
}
