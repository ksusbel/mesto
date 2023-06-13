// debugger;
const cardsList = document.querySelector(".elements__list");
const cardsTemplate = document.querySelector("#elements_template").content;

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

initialCards.forEach(function (element) {
    const cardElement = cardsTemplate.querySelector(".elements__element").cloneNode(true);

    cardElement.querySelector(".elements__title").textContent = element.name;
    cardElement.querySelector(".elements__photo-grid").src = element.link;
    cardsList.append(cardElement);

    const delButton = cardElement.querySelector(".elements__dell");
    delButton.addEventListener("click", function () {
        cardsList.removeChild(cardElement);
    });
    const likeButton = cardElement.querySelector(".elements__hard");
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("elements__hard_black");
        likeButton.classList.toggle("elements__hard_white");
    });

    const imgButton = cardElement.querySelector(".elements__photo-grid");
    const imgPopup = document.querySelector(".popup__full_img");
    const imgFull = document.querySelector(".popup__img-full");
    const imgTitle = document.querySelector(".popup__img-title");
    const closeImgButton = document.querySelector(".popup__close-img");

    function popupImgOpened() {
        imgPopup.classList.remove("popup_fading");
        imgPopup.classList.add("popup_opened");
    }
    function popupImgClose() {
        imgPopup.classList.add("popup_fading");
        setTimeout(() => {
            imgPopup.classList.remove("popup_opened");
        }, 1000);
    }

    imgButton.addEventListener("click", function () {
        popupImgOpened();
        imgTitle.textContent = cardElement.querySelector(".elements__title").textContent;
        imgFull.src = cardElement.querySelector(".elements__photo-grid").src;
    });

    closeImgButton.addEventListener("click", popupImgClose);
});

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup__edit_prof");
const closeEditButton = document.querySelector(".popup__close-edit");
// Находим форму в DOM
const formEditElement = document.querySelector(".popup__form-edit");
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__form-field_name");
const jobInput = document.querySelector(".popup__form-field_job");
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function popupEditOpened() {
    editPopup.classList.remove("popup_fading");
    editPopup.classList.add("popup_opened");
}
function popupEditClose() {
    editPopup.classList.add("popup_fading");
    setTimeout(() => {
        editPopup.classList.remove("popup_opened");
    }, 1000);
}

editButton.addEventListener("click", popupEditOpened);
closeEditButton.addEventListener("click", popupEditClose);
// Получите значение полей jobInput и nameInput из свойства value
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupEditClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener("submit", handleEditFormSubmit);

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup__add_card");
const closeAddButton = document.querySelector(".popup__close-add");
// Находим форму в DOM
const formAddElement = document.querySelector(".popup__form-add");

function popupAddOpened() {
    addPopup.classList.remove("popup_fading");
    addPopup.classList.add("popup_opened");
}
function popupAddClose() {
    addPopup.classList.add("popup_fading");
    setTimeout(() => {
        addPopup.classList.remove("popup_opened");
    }, 1000);
}

addButton.addEventListener("click", popupAddOpened);
closeAddButton.addEventListener("click", popupAddClose);
const cardConteiner = cardsTemplate.querySelector(".elements__element");

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const cardElementNew = cardConteiner.cloneNode(true);

    const namePlaceInput = document.querySelector(".popup__form-field_name-place");
    const linkPlaceInput = document.querySelector(".popup__form-field_link-place");

    cardElementNew.querySelector(".elements__title").textContent = namePlaceInput.value;
    cardElementNew.querySelector(".elements__photo-grid").src = linkPlaceInput.value;

    cardsList.prepend(cardElementNew);
    popupAddClose();
    namePlaceInput.value = "";
    linkPlaceInput.value = "";

    const delButton = cardElementNew.querySelector(".elements__dell");
    delButton.addEventListener("click", function () {
        cardsList.removeChild(cardElementNew);
    });

    const likeButton = cardElementNew.querySelector(".elements__hard");
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("elements__hard_black");
        likeButton.classList.toggle("elements__hard_white");
    });

    const imgButton = cardElementNew.querySelector(".elements__photo-grid");
    const imgPopup = document.querySelector(".popup__full-img");
    const imgFull = document.querySelector(".popup__img-full");
    const imgTitle = document.querySelector(".popup__img-title");
    const closeImgButton = document.querySelector(".popup__close-img");

    function popupImgOpened() {
        imgPopup.classList.remove("popup_fading");
        imgPopup.classList.add("popup_opened");
    }
    function popupImgClose() {
        imgPopup.classList.add("popup_fading");
        setTimeout(() => {
            imgPopup.classList.remove("popup_opened");
        }, 1000);
    }

    imgButton.addEventListener("click", function () {
        popupImgOpened();
        imgTitle.textContent = cardElementNew.querySelector(".elements__title").textContent;
        imgFull.src = cardElementNew.querySelector(".elements__photo-grid").src;
    });

    closeImgButton.addEventListener("click", popupImgClose);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener("submit", handleAddFormSubmit);
