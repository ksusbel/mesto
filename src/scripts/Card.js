export class Card {
    #name;
    #link;
    #cardElement;
    #templateSelector;
    #hendleClickImgFull;
    #cardImage;

    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector(".elements__element").cloneNode(true);
    }

    #hendleClickDelete() {
        this.#cardElement.remove();
    }

    #heldleClickLike(event) {
        event.target.classList.toggle("elements__heart_black");
    }

    constructor({ name, link, hendleClickImgFull }, templateSelector) {
        this.#name = name;
        this.#link = link;
        this.#templateSelector = templateSelector;
        this.#hendleClickImgFull = hendleClickImgFull;
        this.#cardElement = this.#getTemplate();
        this.#cardImage = this.#cardElement.querySelector(".elements__photo-grid");
    }

    createCard() {
        const titleCard = this.#cardElement.querySelector(".elements__title");
        titleCard.textContent = this.#name;
        this.#cardImage.src = this.#link;
        this.#cardImage.alt = this.#name;
        this.#setEventListeners();
        return this.#cardElement;
    }

    #setEventListeners() {
        const delButton = this.#cardElement.querySelector(".elements__dell");
        delButton.addEventListener("click", () => this.#hendleClickDelete(this.#cardElement));
        const likeButton = this.#cardElement.querySelector(".elements__heart");
        likeButton.addEventListener("click", this.#heldleClickLike);
        this.#cardImage.addEventListener("click", () => this.#hendleClickImgFull(this.#name, this.#link, this.#cardElement));
    }
}
