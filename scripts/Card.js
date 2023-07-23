export class Card {
    #name;
    #link;
    #cardElement;
    #templateSelector;
    #hendleClickDelete;
    #heldleClickLike;
    #hendleClickImgFull;

    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector(".elements__element").cloneNode(true);
    }
    constructor({ name, link, hendleClickDelete, heldleClickLike, hendleClickImgFull }, templateSelector) {
        this.#name = name;
        this.#link = link;
        this.#templateSelector = templateSelector;
        this.#hendleClickDelete = hendleClickDelete;
        this.#heldleClickLike = heldleClickLike;
        this.#hendleClickImgFull = hendleClickImgFull;
    }

    createCard() {
        this.#cardElement = this.#getTemplate();
        const titleCard = this.#cardElement.querySelector(".elements__title");
        const linkCard = this.#cardElement.querySelector(".elements__photo-grid");
        titleCard.textContent = this.#name;
        linkCard.src = this.#link;
        linkCard.alt = this.#name;

        const delButton = this.#cardElement.querySelector(".elements__dell");
        delButton.addEventListener("click", () => this.#hendleClickDelete(this.#cardElement));

        const likeButton = this.#cardElement.querySelector(".elements__heart");
        likeButton.addEventListener("click", this.#heldleClickLike);

        const imgButton = this.#cardElement.querySelector(".elements__photo-grid");
        imgButton.addEventListener("click", () => this.#hendleClickImgFull(this.#name, this.#link, this.#cardElement));

        return this.#cardElement;
    }
}
