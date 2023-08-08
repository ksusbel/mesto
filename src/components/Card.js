export class Card {    

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector(".elements__element").cloneNode(true);
    }

    _hendleClickDelete() {
        this._cardElement.remove();
    }

    _heldleClickLike(event) {
        event.target.classList.toggle("elements__heart_black");
    }

    constructor({ name, link, hendleClickImgFull }, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._hendleClickImgFull = hendleClickImgFull;
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".elements__photo-grid");
    }

    createCard() {
        const titleCard = this._cardElement.querySelector(".elements__title");
        titleCard.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._cardElement;
    }

    _setEventListeners() {
        const delButton = this._cardElement.querySelector(".elements__dell");
        delButton.addEventListener("click", () => 
            this._hendleClickDelete(this._cardElement)
            );
        const likeButton = this._cardElement.querySelector(".elements__heart");
        likeButton.addEventListener("click", this._heldleClickLike);
        this._cardImage.addEventListener("click", () => 
            this._hendleClickImgFull(this._name, this._link, this._cardElement)
        );
    }
}
