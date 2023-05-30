export class Section {
  constructor (renderer,container) {
    this._container = container;
    this._renderer = renderer;
  }

  renderItem (items) {
    items.forEach ((item) => {
      const renderedItem = this._renderer(item);
      this.addItem (renderedItem);
    });   
  }

  addItem (element) {
    this._container.prepend(element);
  }
}