export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputSelector = this._config.inputSelector;
        this._submitButtonSelector = this._config.submitButtonSelector;
        this._inactiveButtonClass = this._config.inactiveButtonClass;
        this._inputErrorClass = this._config.inputErrorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.textContent = "";
    }

    _chekInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;
        if (!isInputValid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _disabledButton() {
        this._submitButtonElement.setAttribute("disabled", true);
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }

    _enabledButton() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    }

    resetValidation() {
        this._toggleButtonState(); // управляем кнопкой
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement); // очищаем ошибки
        });
    }

    _toggleButtonState(isActive) {
        if (!isActive) {
            this._disabledButton();
        } else {
            this._enabledButton();
        }
    }

    _setEventListener() {
        this._toggleButtonState(this._submitButtonElement, this._formElement.checkValidity());

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._toggleButtonState(this._submitButtonElement, this._formElement.checkValidity());
                this._chekInputValidity(inputElement);
            });
        });

        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            if (!this._formElement.checkValidity()) return;
        });
    }

    enableValidation() {
        this._setEventListener();
    }
}
