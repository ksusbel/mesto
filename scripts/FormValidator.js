export class FormValidator {
  #config;
  #formElement;
  #inputSelector;
  #submitButtonSelector;
  #inputList;
  #submitButtonElement;
  #inactiveButtonClass;
  #inputErrorClass;

  constructor(config, formElement) {
      this.#config = config;
      this.#formElement = formElement;
      this.#inputSelector = this.#config.inputSelector;
      this.#submitButtonSelector = this.#config.submitButtonSelector;
      this.#inactiveButtonClass = this.#config.inactiveButtonClass;
      this.#inputErrorClass = this.#config.inputErrorClass;
      this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
      this.#submitButtonElement = this.#formElement.querySelector(this.#submitButtonSelector);
  }

  #showInputError(inputElement, errorElement) {
      inputElement.classList.add(this.#inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
  }

  #hideInputError(inputElement, errorElement) {
      inputElement.classList.remove(this.#inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
  }

  #chekInputValidity(inputElement) {
      inputElement.setCustomValidity("");

      const isInputValid = inputElement.validity.valid;
      const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);

      if (!isInputValid) {
          this.#showInputError(inputElement, errorElement);
      } else {
          this.#hideInputError(inputElement, errorElement);
      }
  }

  #disabledButton(buttonElement) {
      buttonElement.disabled = "disabled";
      buttonElement.classList.add(this.#inactiveButtonClass);
  }

  #enabledButton(buttonElement) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.#inactiveButtonClass);
  }

  #toggleButtonState(buttonElement, isActive) {
      if (!isActive) {
          this.#disabledButton(buttonElement);
      } else {
          this.#enabledButton(buttonElement);
      }
  }

  #setEventListener() {
      this.#toggleButtonState(this.#submitButtonElement, this.#formElement.checkValidity());

      this.#inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
              this.#toggleButtonState(this.#submitButtonElement, this.#formElement.checkValidity());
              this.#chekInputValidity(inputElement);
          });
      });

      this.#formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
          if (!this.#formElement.checkValidity()) return;
      });
  }

  enableValidation() {
      this.#setEventListener();
  }
}
