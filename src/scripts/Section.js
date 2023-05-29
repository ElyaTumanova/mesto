export class Section {
  constructor ({items,renderer},container) {
    this._items = items;
    this._container = container;
    this._renderer = renderer;
  }

  renderItem () {
    console.log(this._items);
    this._items.forEach ((item) => {
      const renderedItem = this._renderer(item);
      this.addItem (renderedItem);
    });   
  }

  addItem (element) {
    this._container.prepend(element);
  }
}