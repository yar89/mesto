export class Section {
  constructor({ items, renderer }, сontainerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(сontainerSelector);
  }

  renderCardItems() {
    this._items.forEach((item) => {
      this.addItem(this.renderer(item));
    });
  }

  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
