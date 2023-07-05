const popupForm = document.querySelectorAll(".popup__form");

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__form-field_invalid");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__form-error");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__form-field_invalid");
    errorElement.classList.remove("popup__form-error");
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__form-save_disabled");
    } else {
        buttonElement.classList.remove("popup__form-save_disabled");
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__form-field"));
    const buttonElement = formElement.querySelector(".popup__form-save");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(popupForm);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        formList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
};

enableValidation(popupForm);
