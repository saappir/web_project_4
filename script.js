import { initialCards } from './initialCards.js';
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const editFormElement = document.querySelector('.popup__edit-form');
const addFormElement = document.querySelector('.popup__add-form');
const nameInput = editFormElement.querySelector('.popup__input_content_name');
const jobInput = editFormElement.querySelector('.popup__input_content_description');
const cardsContainer = document.querySelector('.cards');
const imagePopup = document.querySelector('.popup_type_image');
const figImage = document.querySelector('.popup__figure-image');
const figCaption = document.querySelector('.popup__figure-caption');
const cardTemplate = document.querySelector('#cardTemplate');
const titleInput = addFormElement.querySelector('.popup__input_content_title');
const imageInput = addFormElement.querySelector('.popup__input_content_link');

/** function open popup */
function openPopup(element) {
  element.classList.remove('popup_hidden')
}

/** function close popup */
function closePopup(element) {
  const exitButton = element.querySelector('.popup__exit-button');
  exitButton.addEventListener('click', function () {
    element.classList.add('popup_hidden');
  });
}
/** function close on submit */
function submitClose(element) {
  element.classList.add('popup_hidden')
}

/** function like */
function like(element) {
  element.classList.toggle('card__like-button_state_active');
}

/** function append card */
function renderCard(card) {
  cardsContainer.prepend(card);
}

/** edit profile button */
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  closePopup(editPopup);
});

/** edit form */
editFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  submitClose(editPopup);
});

/** add place button */
addButton.addEventListener('click', function () {
  openPopup(addPopup);
  closePopup(addPopup);
});

addFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  createCard(titleInput.value, imageInput.value);
  submitClose(addPopup);
  addFormElement.reset();
});

/** create place function */
function createCard(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = cardTitle.textContent;
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    like(likeButton);
  });
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    card.remove();
    return null;
  });
  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    figImage.src = cardImage.src;
    figImage.alt = cardTitle.textContent;
    figCaption.textContent = cardTitle.textContent;
    closePopup(imagePopup);
  });
  submitClose(imagePopup);
  renderCard(card);
}

/** preload six cards */
initialCards.forEach(element => {
  createCard(element);
});
