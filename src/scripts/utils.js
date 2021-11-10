let openedPopup = null;

/** Function open popup */
export const open = (element) => {
  openedPopup = element;
  element.classList.remove('popup_hidden');
};

/** Function close popup */
export const close = (element) => {
  element.classList.add('popup_hidden');
};

export const renderLoading = (isLoading = false) => {
  const currentActiveButton = openedPopup.querySelector('.popup__submit-button')

  currentActiveButton.textContent = isLoading ? 'Saving...' : 'Saved';
};
