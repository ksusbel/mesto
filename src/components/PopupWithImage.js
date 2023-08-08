import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._image = this._popup.querySelector(".popup__img-full");
        this._title = this._popup.querySelector(".popup__img-title");
    }

    open(name, link) {
        super.open();
        this._image.src = link;
        this._title.textContent = name;
        this._image.alt = name;
    }

    close() {
        super.close();
    }
}
