export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      const newCard = this._renderer(item, item.likes.length, item._id);
      this._container.append(newCard);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  addCard(cardElement) {
    const card = this._renderer(cardElement, cardElement.likes.length);
    this._container.prepend(card);
  }
}
