//debugger;
import { Card } from "./Card.js";
import { config, initialCards } from "./constants.js";
import { FormValidator } from "./FormValidator.js";

const cardsList = document.querySelector(".elements__list");
const formAddElement = document.querySelector("#popup_form_add");
const closeButtons = document.querySelectorAll(".popup__close");
const popupMod = document.querySelectorAll(".popup");
const imgPopup = document.querySelector("#popup_full_img");
const imgFull = document.querySelector(".popup__img-full");
const imgTitle = document.querySelector(".popup__img-title");
const namePlaceInput = document.querySelector("#field-name-place");
const linkPlaceInput = document.querySelector("#field-link-place");
// форма Редактировать профиль
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#popup_edit_prof");
// Находим форму в DOM
const formEditElement = document.querySelector("#popup_form_edit");
// Находим поля формы в DOM
const nameInput = document.querySelector("#field-name");
const jobInput = document.querySelector("#field-job");
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
// форма Добавить карточку
const addButton = document.querySelector(".profile__add-button");
const saveEditButton = formEditElement.querySelector(".popup__form-save");
const addPopup = document.querySelector("#popup_add_card");

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupEsc);
}

closeButtons.forEach(function (item) {
    item.addEventListener("click", function (e) {
        const parentModal = this.closest(".popup");
        closePopup(parentModal);
    });
});

popupMod.forEach(function (item) {
    item.addEventListener("click", (evt) => {
        if (evt.target === item.querySelector(".popup__overflow")) {
            closePopup(item);
        }
    });
});

function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function hendleClickDelete(cardElement) {
    console.log("del");
    cardElement.remove();
}

function heldleClickLike(event) {
    console.log("like");
    event.target.classList.toggle("elements__heart_black");
}

function hendleClickImgFull(nameCard, linkCard, cardElement) {
    console.log(nameCard);
    openPopup(imgPopup);
    imgTitle.textContent = cardElement.querySelector(".elements__title").textContent;
    imgFull.src = linkCard;
    imgFull.alt = nameCard;
}

initialCards.forEach(function ({ name, link }) {
    const cardElement = new Card(
        {
            name,
            link,
            hendleClickDelete,
            heldleClickLike,
            hendleClickImgFull,
        },
        "#elements_template"
    ).createCard();

    cardsList.append(cardElement);
});

function renderCard({ name, link }) {
    const cardElement = new Card(
        {
            name,
            link,
            hendleClickDelete,
            heldleClickLike,
            hendleClickImgFull,
        },
        "#elements_template"
    ).createCard();
    cardsList.prepend(cardElement);
}

function handleAddFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    renderCard({ name: namePlaceInput.value, link: linkPlaceInput.value });
    closePopup(addPopup);
    form.reset(e);
}

function enabledButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener("submit", handleAddFormSubmit);

editButton.addEventListener("click", function () {
    openPopup(editPopup);
    // Получите значение полей jobInput и nameInput из свойства value
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    enabledButton(saveEditButton, config);
});

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editPopup);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener("submit", handleEditFormSubmit);

addButton.addEventListener("click", function () {
    openPopup(addPopup);
});

const FormInstanceAdd = new FormValidator(config, formAddElement);
const FormInstanceEdit = new FormValidator(config, formEditElement);
FormInstanceAdd.enableValidation();
FormInstanceEdit.enableValidation();
