//debugger;

const template = document.querySelector("#elements_template");
const cardsTemplate = template.content;
const cardConteiner = cardsTemplate.querySelector(".elements__element");
const cardsList = document.querySelector(".elements__list");
const formAddElement = document.querySelector("#popup_form_add");
const closeButtons = document.querySelectorAll(".popup__close");

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

closeButtons.forEach(function (item) {
    item.addEventListener("click", function (e) {
        var parentModal = this.closest(".popup");
        parentModal.classList.remove("popup_opened");
    });
});

initialCards.forEach(function (element) {
    const newCard = createCard(element.name, element.link);
    cardsList.append(newCard);
});

function createCard(name, link) {
    const newCard = cardConteiner.cloneNode(true);

    const titleCard = newCard.querySelector(".elements__title");
    const linkCard = newCard.querySelector(".elements__photo-grid");
    titleCard.textContent = name;
    linkCard.src = link;
    linkCard.alt = name;

    const delButton = newCard.querySelector(".elements__dell");
    delButton.addEventListener("click", function () {
        newCard.remove();
    });

    const likeButton = newCard.querySelector(".elements__heart");
    likeButton.addEventListener("click", function (event) {
        event.target.classList.toggle("elements__heart_black");
    });

    const imgButton = newCard.querySelector(".elements__photo-grid");
    const imgPopup = document.querySelector("#popup_full_img");
    const imgFull = document.querySelector(".popup__img-full");
    const imgTitle = document.querySelector(".popup__img-title");

    imgButton.addEventListener("click", function () {
        openPopup(imgPopup);
        imgTitle.textContent = newCard.querySelector(".elements__title").textContent;
        imgFull.src = newCard.querySelector(".elements__photo-grid").src;
        imgFull.alt = newCard.querySelector(".elements__photo-grid").alt;
    });

    return newCard;
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const newCard = createCard();
    const namePlaceInput = document.querySelector("#popup_form_field_name_place");
    const linkPlaceInput = document.querySelector("#popup_form_field_link_place");

    newCard.querySelector(".elements__title").textContent = namePlaceInput.value;
    newCard.querySelector(".elements__photo-grid").src = linkPlaceInput.value;

    cardsList.prepend(newCard);

    var parentModal = this.closest(".popup");
    parentModal.classList.remove("popup_opened");

    form.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener("submit", handleAddFormSubmit);

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#popup_edit_prof");
// Находим форму в DOM
const formEditElement = document.querySelector("#popup_form_edit");
// Находим поля формы в DOM
const nameInput = document.querySelector("#popup_form_field_name");
const jobInput = document.querySelector("#popup_form_field_job");
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

editButton.addEventListener("click", function () {
    openPopup(editPopup);
});

// Получите значение полей jobInput и nameInput из свойства value
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const form = evt.target;
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    var parentModal = this.closest(".popup");
    parentModal.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener("submit", handleEditFormSubmit);

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector("#popup_add_card");
const closeAddButton = document.querySelector("#popup_close_add");
// Находим форму в DOM

addButton.addEventListener("click", function () {
    openPopup(addPopup);
});
