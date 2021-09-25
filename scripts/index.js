import { initialCards } from './initialCards.js';
import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';

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
const addFormElement = document.querySelector('.popup__add-form');
const titleInput = addFormElement.querySelector('.popup__input_content_title');
const imageInput = addFormElement.querySelector('.popup__input_content_link');
let openedPopup = null;

/** Function open popup */
const openPopup = (element) => {
  openedPopup = element;
  element.classList.remove('popup_hidden');
  document.addEventListener('keydown', keyHandler);
  element.addEventListener('click', exitPopupOverlay);
};

/** Function close popup */
const closePopup = (element) => {
  element.classList.add('popup_hidden');
  document.removeEventListener('keydown', keyHandler);
  element.removeEventListener('click', exitPopupOverlay);
};

/** Function popup exit button*/
const addExitEventListener = (popupElement) => {
  const exitButton = popupElement.querySelector('.popup__exit-button');
  exitButton.addEventListener('click', () => {
    closePopup(popupElement);
  });
};

/** Exit when esc is clicked */
const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};

/** Exit when overlay is clicked */
const exitPopupOverlay = (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};

/** Function append card */
const renderCard = (card) => { cardsContainer.prepend(card); };

/** Edit profile button */
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.resetValidation();
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
  addFormElement.reset();
  addFormValidator.resetValidation();
});

/** Add place form  */
addFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const element = { name: titleInput.value, link: imageInput.value };
  const card = new Card(element);
  renderCard(card.generateCard(element));
  closePopup(addPopup);

});

/** Preload six cards */
initialCards.forEach(element => {
  const card = new Card(element);
  renderCard(card.generateCard(element));
});

addExitEventListener(editPopup);
addExitEventListener(imagePopup);
addExitEventListener(addPopup);

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_state_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_state_visible'
};

const editFormValidator = new FormValidator(settings, editFormElement);
const addFormValidator = new FormValidator(settings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

export { openPopup };
