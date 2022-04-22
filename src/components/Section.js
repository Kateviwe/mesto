export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._arrayItems = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItems() {
        this._arrayItems.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }
}