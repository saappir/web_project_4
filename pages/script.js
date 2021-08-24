let editButton = document.querySelector('.profile__button_type_edit');
let exitButton = document.querySelector('.popup__button_type_exit');
let popup = document.querySelector('.popup')
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form')

function open() {
  popup.classList.remove("popup__hidden");

  nameInput.value = profileName.value;
  jobInput.value = profileJob.value;
}

editButton.addEventListener("click", open);

function close() {
  popup.classList.add("popup__hidden");
}

exitButton.addEventListener("click", close);


function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector('.popup__input_content_name');
  let jobInput = formElement.querySelector('.popup__input_content_description')

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

}

formElement.addEventListener('submit', handleFormSubmit);
