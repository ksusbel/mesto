export class PopupWithForm {
    #formElement;
    #submitHandler;

  constructor(formSelector, submitHandler = null) {
//console.log(document.querySelector(formSelector));
    this.#formElement = document.querySelector(formSelector);
    this.#submitHandler = submitHandler;
  }

  setSubmitAction(action) {
    this.#submitHandler = action;
  }

 setEventListener() { 
    this.#formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#submitHandler(e); 
    });
  }

}