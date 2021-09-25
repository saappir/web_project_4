import { openPopup } from './utils.js';
const imagePopup = document.querySelector('.popup_type_image');
const figureImage = document.querySelector('.popup__figure-image');
const figureCaption = document.querySelector('.popup__figure-caption');

class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#cardTemplate')
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setListeners();
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._element;
  }

  _generatePopup() {
    figureImage.src = this._link;
    figureImage.alt = this._name;
    figureCaption.textContent = this._name;
  }

  _setListeners() {
    this._element.querySelector('.card__image')
      .addEventListener('click', this._handleOpenPopup);

    this._element.querySelector('.card__like-button')
      .addEventListener('click', this._likeCard);

    this._element.querySelector('.card__delete-button')
      .addEventListener('click', this._deleteCard);
  }

  _handleOpenPopup = () => {
    openPopup(imagePopup);
    figureImage.src = this._link;
    figureImage.alt = this._name;
    figureCaption.textContent = this._name;
  }

  _likeCard = () => {
    this._element.querySelector('.card__like-button')
      .classList.toggle('card__like-button_state_active');
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

}

export { Card };
