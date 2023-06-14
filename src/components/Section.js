export class Section {
  constructor (renderer,container) {
    this._container = container;
    this._renderer = renderer;
  }

  renderItem (items, user) {
    const itemsReversed = items.reverse()
    itemsReversed.forEach ((item) => {
      const renderedItem = this._renderer(item,user);
      this.addItem (renderedItem);
    });   
  }

  addItem (element) {
    this._container.prepend(element);
  }
}