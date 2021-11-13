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
    this._popupElement.classList.remove('popup_hidden');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popupElement.classList.add('popup_hidden');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleRemoteClick);
    this._popupElement.querySelector('.popup__exit-button')
      .addEventListener('click', () => this.close());
  }
}
