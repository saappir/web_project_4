let editButton = document.querySelector('.profile__button_type_edit');
let exitButton = document.querySelector('.popup__exit-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_content_name');
let jobInput = formElement.querySelector('.popup__input_content_description')

function open() {
  popup.classList.remove("popup_hidden");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function close() {
  popup.classList.add("popup_hidden");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.add("popup_hidden");
}

editButton.addEventListener("click", open);
exitButton.addEventListener("click", close);
formElement.addEventListener('submit', handleFormSubmit);
