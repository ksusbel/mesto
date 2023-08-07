import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    #image;
    #title;
    #popup;

    constructor(popupSelector) {
        super(popupSelector);
        this.#popup = document.querySelector(popupSelector);
        this.#image = this.#popup.querySelector(".popup__img-full");
        this.#title = this.#popup.querySelector(".popup__img-title");
    }

    open(name, link) {
        super.open();
        this.#image.src = link;
        this.#title.textContent = name;
        this.#image.alt = name;
    }
}
