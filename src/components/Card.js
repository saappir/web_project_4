export default class Card {
  constructor({ data, handleCardClick, handleDeleteCard, handleCardLike }, cardSelector, userId) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardLike = handleCardLike;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
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
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.card__delete-button').style.display = 'none'
    }

    this._element.querySelector('.card__likes-count').textContent = this._likes.length;
    if (this.isLiked()) {
      this.likeCard(this._likes)
    }

    return this._element;
  }

  _setListeners() {
    this._element.querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick());

    this._element.querySelector('.card__like-button')
      .addEventListener('click', () => this._handleCardLike(this._id));

    this._element.querySelector('.card__delete-button')
      .addEventListener('click', () => this._handleDeleteCard(this._id));
  }

  isLiked() {
    return this._likes.some((person) => person._id == this._userId)
  }

  likeCard(newLikes) {
    this._likes = newLikes;
    this._element.querySelector('.card__likes-count').textContent = this._likes.length;
    this._element.querySelector('.card__like-button')
      .classList.toggle('card__like-button_state_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

}
