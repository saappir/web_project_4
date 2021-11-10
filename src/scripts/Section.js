export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element)
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
