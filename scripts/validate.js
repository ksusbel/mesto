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

function disableButton(buttonElement) {
  buttonElement.classList.add("popup__form-save_disabled");
  buttonElement.setAttribute("disabled", true);
}

function activeButton(buttonElement) {
  buttonElement.classList.remove("popup__form-save_disabled");
  buttonElement.removeAttribute("disabled");
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
      disableButton(buttonElement);
  } else {
      activeButton(buttonElement);
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

const enableValidation = (config) => {
  // объявили аргумент с объектом настроек валидации
  const formList = document.querySelectorAll(config.formSelector); // воспользовались объектом настроек
  formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
      });

      formList.forEach((fieldSet) => {
          setEventListeners(fieldSet, config); // передали его дальше, вложенным функциям
      });
  });
};

const validationSettings = {
  // Объявили объект настроек валидации
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__form-save",
  inactiveButtonClass: "popup__form-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-field_invalid",
};

enableValidation(validationSettings); // передали его в функцию включения валидации
