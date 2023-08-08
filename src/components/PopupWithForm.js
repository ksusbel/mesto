import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._inputList = this._popupForm.querySelectorAll(".popup__form-field");
    }

    // Получаем данные из формы
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    // Устанавливаем слушатели формы
    setEventListeners() {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
        super.setEventListeners();
    }

    // Закрытие попапа + сброс инпутов
    close() {
        super.close();
        this._popupForm.reset();
    }
}
