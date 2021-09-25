let openedPopup = null;

/** Function open popup */
export const openPopup = (element) => {
  openedPopup = element;
  element.classList.remove('popup_hidden');
  document.addEventListener('keydown', handleKeyDown);
  element.addEventListener('click', handleRemoteClick);
};

/** Function close popup */
export const closePopup = (element) => {
  element.classList.add('popup_hidden');
  document.removeEventListener('keydown', handleKeyDown);
  element.removeEventListener('click', handleRemoteClick);
};

/** Exit when esc is clicked */
const handleKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};

/** Exit when overlay is clicked */
const handleRemoteClick = (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};
