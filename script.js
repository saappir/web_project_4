import { reversed } from './initialCards.js';
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const editPopup = document.querySelector('.popup__edit');
const addPopup = document.querySelector('.popup__add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const editFormElement = document.querySelector('.popup__edit-form');
const addFormElement = document.querySelector('.popup__add-form');
const nameInput = editFormElement.querySelector('.popup__input_content_name');
const jobInput = editFormElement.querySelector('.popup__input_content_description');
const cardsContainer = document.querySelector('.cards');
const imagePopup = document.querySelector('.popup__image-container');
const figImage = document.querySelector('.popup__fig-image');
const figCaption = document.querySelector('.popup__fig-caption');
const cardTemplate = document.querySelector('#cardTemplate');


// edit profile button //
editButton.addEventListener('click', function () {
  editPopup.classList.remove('popup_hidden');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const exitButton = editPopup.querySelector('.popup__exit-button');
  exitButton.addEventListener('click', function () {
    editPopup.classList.add('popup_hidden');
  });
});

// edit form //
editFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editPopup.classList.add('popup_hidden');
});

// add place button //
addButton.addEventListener('click', function () {
  addPopup.classList.remove('popup_hidden');
  const exitButton = addPopup.querySelector('.popup__exit-button');
  exitButton.addEventListener('click', function () {
    addPopup.classList.add('popup_hidden');
  });
});

addFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const titleInput = addFormElement.querySelector('.popup__input_content_title');
  const imageInput = addFormElement.querySelector('.popup__input_content_link');

  createCard(titleInput.value, imageInput.value);
  addPopup.classList.add('popup_hidden');
  imageInput.value = '';
  titleInput.value = '';
});

// create place function //
function createCard(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardTitle.textContent = name;
  cardImage.src = link;

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_state_active');
  });

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    card.remove();
  });

  cardImage.addEventListener('click', function () {
    imagePopup.classList.remove('popup_hidden');
    figImage.src = cardImage.src;
    figCaption.textContent = cardTitle.textContent;
  });

  const exitButton = imagePopup.querySelector('.popup__exit-button');
  exitButton.addEventListener('click', function () {
    imagePopup.classList.add('popup_hidden');
  });

  renderCard(card);
}

// append card //
function renderCard(card) {
  cardsContainer.prepend(card)
}

// preload six cards //
reversed.forEach(element => {
  createCard(element.name, element.link);
});
