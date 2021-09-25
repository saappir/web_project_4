import { openPopup } from './index.js';
const imagePopup = document.querySelector('.popup_type_image');
const figImage = document.querySelector('.popup__figure-image');
const figCaption = document.querySelector('.popup__figure-caption');

class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    let cardElement = document
      .querySelector('#cardTemplate')
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setListeners();
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    return this._element;
  }

  _generatePopup() {
    figImage.src = this._link;
    figImage.alt = this._name;
    figCaption.textContent = this._name;
  }

  _setListeners() {
    this._element.querySelector('.card__image')
      .addEventListener('click', () => {
        this._handleOpenPopup();
      });

    this._element.querySelector('.card__like-button')
      .addEventListener('click', () => {
        this._likeCard();
      });

    this._element.querySelector('.card__delete-button')
      .addEventListener('click', () => {
        this._deleteCard();
      });
  }

  _handleOpenPopup() {
    openPopup(imagePopup);
    figImage.src = this._link;
    figImage.alt = this._name;
    figCaption.textContent = this._name;
  }

  _likeCard() {
    this._element.querySelector('.card__like-button')
      .classList.toggle('card__like-button_state_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export { Card };
