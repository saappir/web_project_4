import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { addButton, editButton, settings, nameInput, jobInput, editFormElement, addFormElement, avatarFormElement, profileImageInput, changeImageButton } from '../utils/constants.js';
import { api } from "../components/Api.js";
import { renderLoading } from "../utils/utils.js";
let userId

Promise.all([api.getInitialCards(), api.getUserinfo()])
  .then(([cards, info]) => {
    // console.log(info)
    userId = info._id;
    cardList.renderItems(cards);
    userInfo.setUserInfo({ name: info.name, about: info.about, avatar: info.avatar })
    profileImageInput.value = info.avatar;
  })

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__image');

const editPopup = new PopupWithForm('.popup_type_edit',
  (info) => {
    api.updateUserInfo(info)
      .then(res => {
        console.log('res', res)
        userInfo.updateUserInfo({ name: res.name, about: res.about })

      })
      .finally(() => {
        renderLoading();
        editPopup.close();
      });
  }
);

const editFormValidator = new FormValidator(settings, editFormElement);

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  editPopup.open();
  editFormValidator.resetValidation();
});

const imagePopup = new PopupWithImage('.popup_type_image');

function createCard(data) {
  const newCard = new Card({
    data,
    handleCardClick: () => { imagePopup.open(data) },
    handleDeleteCard: (id) => {
      confirmDelete.open();
      confirmDelete.setAction(() => {
        api.deleteCard(id)
          .then(res => {
            newCard.deleteCard()
            confirmDelete.close();
          })
      })
    },
    handleCardLike: (id) => {
      const isAlreadyLiked = newCard.isLiked()
      if (isAlreadyLiked) {
        api.dislikeCard(id)
          .then(res => {
            newCard.likeCard(res.likes)
          })
      } else {
        api.likeCard(id)
          .then(res => {
            newCard.likeCard(res.likes)
            console.log(res)
          })
      }
    }
  }, '#cardTemplate', userId);


  const card = newCard.generateCard();
  return card;
}

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data));
  },
}, '.cards'
);

const addPopup = new PopupWithForm('.popup_type_add', (data) => {
  api.createCard(data)
    .then(res => {
      cardList.addItem(createCard(res));
    })
    .finally(() => {
      renderLoading();
      addPopup.close();
    });
});

const addFormValidator = new FormValidator(settings, addFormElement);

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addPopup.open();
});

const confirmDelete = new PopupWithSubmit('.popup_type_delete');

const changeImage = new PopupWithForm('.popup_type_avatar', (data) => {
  api.updateProfilePicture(data)
    .then(res => {
      // console.log(res)
      userInfo.updateImage(res);
    })
    .finally(() => {
      renderLoading();
      changeImage.close()
    });
})

const avatarValidator = new FormValidator(settings, avatarFormElement);

changeImageButton.addEventListener('click', () => {
  changeImage.open()
})

imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
confirmDelete.setEventListeners();
changeImage.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarValidator.enableValidation();
