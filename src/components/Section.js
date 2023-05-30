export class Section {
  constructor(renderer, сontainerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(сontainerSelector);
  }

  renderCardItems(dataCard) {
    dataCard.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
