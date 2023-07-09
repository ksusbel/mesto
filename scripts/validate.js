function showInputError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function chekInputValidity(inputElement, formElement, config) {
  inputElement.setCustomValidity("");

  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!isInputValid) {
      showInputError(inputElement, errorElement, config);
  } else {
      hideInputError(inputElement, errorElement, config);
  }
}

function disabledButton(buttonElement, config) {
  buttonElement.disabled = "disabled";
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
      disabledButton(buttonElement, config);
  } else {
      enabledButton(buttonElement, config);
  }
}

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  [...inputList].forEach(function (inputElement) {
      inputElement.addEventListener("input", function () {
          toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
          chekInputValidity(inputElement, formElement, config);
      });
  });

  formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!formElement.checkValidity()) return;
  });
}

function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);

  [...formsList].forEach(function (formElement) {
      setEventListener(formElement, config);
  });
}

const config = {
  // Объявили объект настроек валидации
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__form-save",
  inactiveButtonClass: "popup__form-save_disabled",
  inputErrorClass: "popup__input_type_error",
};

enableValidation(config); // передали его в функцию включения валидации
