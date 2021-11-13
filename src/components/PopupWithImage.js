import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open = (data) => {
    this._figureImage = this._popupElement.querySelector('.popup__figure-image');
    this._figureCaption = this._popupElement.querySelector('.popup__figure-caption');
    this._figureImage.src = data.link;
    this._figureImage.alt = data.name;
    this._figureCaption.textContent = data.name;
    super.open();
  }
}
