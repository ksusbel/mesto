import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._inputList = this._popupForm.querySelectorAll(".popup__form-field");
        this._submitButton = this._popupForm.querySelector(".popup__form-save");
        this._submitButtonCont = this._submitButton.textContent;
    }

    // Получает данные из формы
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    // Устанавливает слушатели формы
    setEventListeners() {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
        super.setEventListeners();
    }

    // Закрытие попапа и сброс инпутов
    close() {
        super.close();
        this._popupForm.reset();
    }

    // Изменяет текст кнопки во время загрузки
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = this._submitButtonCont;
        }
    }
}
