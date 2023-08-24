export class Card {
  _getTemplate() {
      return document.querySelector(this._templateSelector).content.querySelector(".elements__element").cloneNode(true);
  }

  constructor(data, hendleClickImgFull, handleClickDelete, userId, handleLikeCard, templateSelector) {
      this._data = data;
      this._templateSelector = templateSelector;
      this._likes = data.likes;
      this._owner = data.owner;
      this._id = data._id;
      this._userId = userId;
      this._hendleClickImgFull = hendleClickImgFull;
      this._cardElement = this._getTemplate();
      this._cardImage = this._cardElement.querySelector(".elements__photo-grid");
      this._handleClickDelete = handleClickDelete;
      this._handleLikeCard = handleLikeCard;
  }

  getId() {
      return this._data._id;
  }

  isLiked() {
      return this._data?.likes?.some((item) => {
          return item._id === this._userId;
      });
  }

  _updateLike() {
      this._likesCounter.textContent = this._data?.likes?.length;

      if (this.isLiked()) {
          this._likeButton.classList.add("elements__heart_black");
      } else {
          this._likeButton.classList.remove("elements__heart_black");
      }
  }

  setLikesData(data) {
      this._data.likes = data.likes;
      this._updateLike();
  }

  _hendleClickDelete() {
      this._cardElement.remove();
      this._cardElement = null;
  }

  createCard() {
      const titleCard = this._cardElement.querySelector(".elements__title");
      const delButton = this._cardElement.querySelector(".elements__dell");

      titleCard.textContent = this._data.name;
      this._cardImage.src = this._data.link;
      this._cardImage.alt = this._data.name;

      this._likesCounter = this._cardElement.querySelector(".elements__likes-amount");
      this._likeButton = this._cardElement.querySelector(".elements__heart");

      this._updateLike();

      if (this._owner._id !== this._userId) {
          this._cardElement.querySelector(".elements__dell").remove();
      }

      delButton.addEventListener("click", () => this._handleClickDelete(this));

      this._likeButton.addEventListener("click", () => this._handleLikeCard(this));

      this._cardImage.addEventListener("click", () => this._hendleClickImgFull(this._data.name, this._data.link, this._cardElement));
      return this._cardElement;
  }

  getData() {
      const { name, _id, Link } = this._data;
      return { name, _id, Link };
  }

  remove() {
      this._cardElement.remove();
      this._cardElement = null;
  }
}
