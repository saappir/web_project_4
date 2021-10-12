export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  generateCard = () => {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._setListeners();
    return this._element;
  };

  _setListeners = () => {
    this._element.querySelector('.card__image')
      .addEventListener('click', this._handleCardClick);

    this._element.querySelector('.card__like-button')
      .addEventListener('click', this._handleLikeButton);

    this._element.querySelector('.card__delete-button')
      .addEventListener('click', this._handleDeleteCard);
  };

  _handleLikeButton = () => {
    this._element.querySelector('.card__like-button')
      .classList.toggle('card__like-button_state_active');
  };

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };
}
