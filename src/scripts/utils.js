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
