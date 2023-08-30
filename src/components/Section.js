export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      const newCard = this._renderer(item, item.likes.length, item._id);
      this._container.append(newCard);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
