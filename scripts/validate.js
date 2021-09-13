const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_state_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_state_visible'
}

const showError = (form, input, errorMessage, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideError = (form, input, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkValidition = (form, input) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, config);
  } else {
    hideError(form, input, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button, config) => {
  if (!hasInvalidInput(inputList)) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled', '');
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', '');
  }
};

const setListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkValidition(form, input);
      toggleButtonState(inputList, button, config);
    });
  });
};

const enableValidation = (config) => {
  const formArray = Array.from(document.querySelectorAll(config.formSelector));
  formArray.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setListeners(form, config);
  });
};

const resetValidation = (element, config) => {
  const form = element.querySelector(config.formSelector);
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    hideError(form, input, config);
  });
};

enableValidation(config);

export { config };
export { resetValidation };
