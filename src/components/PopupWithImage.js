import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open = (data) => {
    const figureImage = this._popupElement.querySelector('.popup__figure-image');
    const figureCaption = this._popupElement.querySelector('.popup__figure-caption');
    figureImage.src = data.link;
    figureImage.alt = data.name;
    figureCaption.textContent = data.name;
    super.open();
  }
}
