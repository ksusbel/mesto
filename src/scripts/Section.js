export class Section { 
  #renderer;
  #containerParentElement;

  constructor(renderer, containerSelector) {  
    this.#renderer = renderer;
    this.#containerParentElement = document.querySelector(containerSelector);
  }
// добавить элемент
  addItem(elementNode) {    
      this.#containerParentElement.prepend(elementNode);
  }
// получить массив
  renderItems(items) {
    items.forEach( (item) => 
    this.#renderer({ data: item })
    ); 
  }  
}
