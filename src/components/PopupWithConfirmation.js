import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
    }

    // принимает коллбэк на удаление карточки
    submitCallback(target) {
        this._target = target;
    }

    // удаление карточки по submit
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._target();
        });
    }
}
