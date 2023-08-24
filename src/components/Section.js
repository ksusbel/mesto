export class Section {
    constructor(containerSelector, renderer) {
        this._renderer = renderer;
        this._containerParentElement = document.querySelector(containerSelector);
    }

    // добавить элемент
    addItem(elementNode) {
        this._containerParentElement.prepend(elementNode);
    }

    // получить массив
    renderItems(dataArray) {
        dataArray.forEach((dataItem) => {
            this._renderer(dataItem);
        });
    }
}
