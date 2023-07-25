//debugger;
import { Card } from "./Card.js";
import { config, initialCards } from "./constants.js";
import { FormValidator } from "./FormValidator.js";

const cardsList = document.querySelector(".elements__list");
const formAddElement = document.forms["popup_form_add"];
const closeButtons = document.querySelectorAll(".popup__close");
const popupMods = document.querySelectorAll(".popup");
const imgPopup = document.querySelector("#popup_full_img");
const imgFull = document.querySelector(".popup__img-full");
const imgTitle = document.querySelector(".popup__img-title");
const namePlaceInput = document.querySelector("#field-name-place");
const linkPlaceInput = document.querySelector("#field-link-place");
// форма Редактировать профиль
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#popup_edit_prof");
// Находим форму в DOM
const formEditElement = document.forms["popup_form_edit"];
// Находим поля формы в DOM
const nameInput = document.querySelector("#field-name");
const jobInput = document.querySelector("#field-job");
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
// форма Добавить карточку
const addButton = document.querySelector(".profile__add-button");
//const saveEditButton = formEditElement.querySelector(".popup__form-save");
const addPopup = document.querySelector("#popup_add_card");

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupEsc);
}

popupMods.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup__overflow")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close")) {
            closePopup(popup);
        }
    });
});

function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function hendleClickImgFull(nameCard, linkCard, cardElement) {
    // console.log(nameCard);
    openPopup(imgPopup);
    imgTitle.textContent = cardElement.querySelector(".elements__title").textContent;
    imgFull.src = linkCard;
    imgFull.alt = nameCard;
}

function createCard({ name, link }) {
    const cardElement = new Card(
        {
            name,
            link,
            hendleClickImgFull,
        },
        "#elements_template"
    ).createCard();
    return cardElement;
}

initialCards.forEach(function (item) {
    const cardElement = createCard(item);
    cardsList.append(cardElement);
});

function renderCard(item) {
    const cardElement = createCard(item);
    cardsList.prepend(cardElement);
}

function handleAddFormSubmit(e) {
    e.preventDefault();
    renderCard({ name: namePlaceInput.value, link: linkPlaceInput.value });
    closePopup(addPopup);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener("submit", handleAddFormSubmit);

editButton.addEventListener("click", function () {
    openPopup(editPopup);
    // Получите значение полей jobInput и nameInput из свойства value
    profileFormValidator.resetValidation();
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
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
    cardFormValidator.resetValidation();
});

const cardFormValidator = new FormValidator(config, formAddElement);
const profileFormValidator = new FormValidator(config, formEditElement);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
