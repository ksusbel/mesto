export class Section {   
  constructor(renderer, containerSelector) {  
    this._renderer = renderer;
    this._containerParentElement = document.querySelector(containerSelector);
  }

// добавить элемент
  addItem(elementNode) {  
      this._containerParentElement.prepend(elementNode);
  }

// получить массив
  renderItems(items) {    
    items.forEach( (item) =>     
    this._renderer({ data: item })
    );     
  }  
}
