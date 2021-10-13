export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element)
  }

  renderItems() {
    this._initialArray.forEach(this._renderer)
  }
}
