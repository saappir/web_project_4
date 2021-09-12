import { initialCards } from './initialCards.js';
import { resetValidation } from './validate.js';

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const editFormElement = document.querySelector('.popup__edit-form');
const nameInput = editFormElement.querySelector('.popup__input_content_name');
const jobInput = editFormElement.querySelector('.popup__input_content_description');
const cardsContainer = document.querySelector('.cards');
const figImage = document.querySelector('.popup__figure-image');
const figCaption = document.querySelector('.popup__figure-caption');
const cardTemplate = document.querySelector('#cardTemplate');
const addFormElement = document.querySelector('.popup__add-form');
const titleInput = addFormElement.querySelector('.popup__input_content_title');
const imageInput = addFormElement.querySelector('.popup__input_content_link');

/** Function open popup */
const openPopup = (element) => {
  element.classList.remove('popup_hidden');
  element.addEventListener('keydown', keyHandler);
  element.addEventListener('click', exitPopupOverlay);
};

/** Function close popup */
const closePopup = (element) => {
  element.classList.add('popup_hidden');
  resetValidation(element);
};

/** Function popup exit button*/
const addExitEventListener = (popupElement) => {
  const exitButton = popupElement.querySelector('.popup__exit-button');
  exitButton.addEventListener('click', () => {
    closePopup(popupElement);
  });
};

/** Function like */
const like = (element) => { element.classList.toggle('card__like-button_state_active'); };

/** Function append card */
const renderCard = (card) => { cardsContainer.prepend(card); };

/** Exit when esc is clicked */
const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget);
  }
};

/** Exit when overlay is clicked */
const exitPopupOverlay = (evt) => {
  if (!evt.target.closest('.popup__form')) {
    closePopup(evt.currentTarget);
  }
};

/** Create place function */
const createCard = (data) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  let card = cardElement.querySelector('.card');
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
    card = null;
  });
  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    figImage.src = cardImage.src;
    figImage.alt = cardTitle.textContent;
    figCaption.textContent = cardTitle.textContent;
    addExitEventListener(imagePopup);
  });
  closePopup(imagePopup);
  renderCard(card);
};

/** Edit profile button */
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  addExitEventListener(editPopup);
});

/** Edit profile form */
editFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
});

/** Add place button */
addButton.addEventListener('click', function () {
  openPopup(addPopup);
  addExitEventListener(addPopup);
});

/** Add place form  */
addFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let inputArray = [{ name: titleInput.value, link: imageInput.value }];
  inputArray.forEach(element => {
    createCard(element);
  });
  closePopup(addPopup);
});

/** Preload six cards */
initialCards.forEach(element => {
  createCard(element);
});
