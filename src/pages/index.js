import "./index.css";
import { initialCards } from '../scripts/initialCards.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { Section } from '../scripts/Section.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { addButton, editButton, settings, nameInput, jobInput, editFormElement, addFormElement } from '../scripts/constants.js';

const userInfo = new UserInfo('.profile__name', '.profile__description');

const editPopup = new PopupWithForm('.popup_type_edit',
  () => {
    userInfo.setUserInfo();
    editPopup.close();
  }
);

editPopup.setEventListeners();

const editFormValidator = new FormValidator(settings, editFormElement);

editFormValidator.enableValidation();

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  editPopup.open();
  editFormValidator.resetValidation();
});

const imagePopup = new PopupWithImage('.popup_type_image');

imagePopup.setEventListeners();

function createCard(data) {
  const newCard = new Card(data, '#cardTemplate', {
    handleCardClick: () => imagePopup.open(data)
  });

  const card = newCard.generateCard();
  return card;
}

const cardList = new Section({
  data: initialCards,
  renderer: (element) => {
    cardList.addItem(createCard(element));
  },
},
  '.cards'
);

const addPopup = new PopupWithForm('.popup_type_add', (data) => {
  cardList.addItem(createCard(data));
  addPopup.close();
});

cardList.renderItems();

addPopup.setEventListeners();

const addFormValidator = new FormValidator(settings, addFormElement);

addFormValidator.enableValidation();

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addPopup.open();
});