export class PopupWithForm {
  #formElement;
  #submitHandler;

  constructor(formSelector, submitHandler = null) {
      this.#formElement = document.querySelector(formSelector);
      this.#submitHandler = submitHandler;
  }

  setSubmitAction(action) {
      this.#submitHandler = action;
  }

  setEventListener() {
      this.#formElement.addEventListener("submit", (e) => {
          e.preventDefault();
          this.#submitHandler(e);
      });
  }
}
