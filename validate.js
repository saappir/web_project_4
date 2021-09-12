const showError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}_error`);
  input.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error_state_visible');
};

const hideError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}_error`);
  input.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input_error_state_visible');
  errorElement.textContent = '';
};

const checkValidition = (form, input) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button) => {
  if (!hasInvalidInput(inputList)) {
    button.classList.remove('popup__submit-button_state_inactive');
    button.removeAttribute('disabled', '');
  } else {
    button.classList.add('popup__submit-button_state_inactive');
    button.setAttribute('disabled', '');
  }
};

const setListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__submit-button');
  toggleButtonState(inputList, button);
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkValidition(form, input);
      toggleButtonState(inputList, button);
    });
  });
};

const enableValidation = () => {
  const formArray = Array.from(document.querySelectorAll('.popup__form'));
  formArray.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setListeners(form);
  });
};

const resetValidation = (element) => {
  if (element.querySelector('.popup__form')) {
    const form = element.querySelector('.popup__form');
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    form.reset();
    inputList.forEach((input) => { hideError(form, input); });
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_state_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_error_state_visible'
});

export { resetValidation };
