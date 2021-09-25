class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
  }

  _showError = (input, errorMessage) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideError = (input) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _checkValidation = (input) => {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _hasInvalidInput = () => {
    return this.inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState = () => {
    const { inactiveButtonClass, submitButtonSelector } = this._settings;
    const button = this._form.querySelector(submitButtonSelector);

    if (this._hasInvalidInput()) {
      button.classList.add(inactiveButtonClass);
      button.classList.remove('button-cursor');
      button.setAttribute('disabled', true);
    }
    else {
      button.classList.remove(inactiveButtonClass);
      button.classList.add('button-cursor')
      button.removeAttribute('disabled');
    }
  }

  _setListeners = () => {
    const { inputSelector } = this._settings;
    this.inputList = Array.from(this._form.querySelectorAll(inputSelector));
    this._toggleButtonState();
    this.inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidation(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this.inputList.forEach(this._hideError);
  }
}

export { FormValidator };
