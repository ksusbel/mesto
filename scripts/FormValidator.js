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

    #showInputError(inputElement) {
        const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.#inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    #hideInputError(inputElement) {
        const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.#inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.textContent = "";
    }

    #chekInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;
        if (!isInputValid) {
            this.#showInputError(inputElement);
        } else {
            this.#hideInputError(inputElement);
        }
    }

    #disabledButton() {
        this.#submitButtonElement.setAttribute("disabled", true);
        this.#submitButtonElement.classList.add(this.#inactiveButtonClass);
    }

    #enabledButton() {
        this.#submitButtonElement.disabled = false;
        this.#submitButtonElement.classList.remove(this.#inactiveButtonClass);
    }

    resetValidation(e) {
        this.#toggleButtonState(); // управляем кнопкой ==

        this.#inputList.forEach((inputElement) => {
            this.#hideInputError(inputElement); // очищаем ошибки ==
            this.#formElement.reset();
        });
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
