import "./index.css";
import { Card } from "../scripts/Card.js";
import { config, initialCards, formAddElement, namePlaceInput, linkPlaceInput, editButton, formEditElement, nameInput, jobInput, addButton } from "../scripts/constants.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { Popup } from "../scripts/Popup.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

const cardSectionInstance = new Section(renderNewCard, ".elements__list");
const popupFormInstanceAdd = new PopupWithForm("#popup_form_add", handleAddFormSubmit);
const popupFormInstanceEdit = new PopupWithForm("#popup_form_edit", handleEditFormSubmit);

const mainPopupAdd = new Popup("#popup_add_card");
const mainPopupEdit = new Popup("#popup_edit_prof");
const imagePopup = new PopupWithImage("#popup_full_img");
const userInfo = new UserInfo({ username: ".profile__name", job: ".profile__description" });

function hendleClickImgFull(name, link) {
    imagePopup.open(name, link);
}

function renderNewCard({ data: { name, link } }) {
    const cardElement = new Card(
        {
            name,
            link,
            hendleClickImgFull,
        },
        "#elements_template"
    ).createCard();
    cardSectionInstance.addItem(cardElement);
}

function handleAddFormSubmit() {
    renderNewCard({ data: { name: namePlaceInput.value, link: linkPlaceInput.value } });
    mainPopupAdd.close();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupFormInstanceAdd.setSubmitAction(handleAddFormSubmit);

editButton.addEventListener("click", function () {
    mainPopupEdit.open();
    const data = userInfo.getUserInfo();
    // Получите значение полей jobInput и nameInput из свойства value
    profileFormValidator.resetValidation();
    // nameInput.value = profileName.textContent;
    // jobInput.value = profileDescription.textContent;
    nameInput.value = data.username;
    jobInput.value = data.job;
});

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleEditFormSubmit() {
    //  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // profileName.textContent = nameInput.value;
    // profileDescription.textContent = jobInput.value;
    const dataInfo = {
        name: nameInput.value,
        about: jobInput.value,
    };
    userInfo.setUserInfo(dataInfo);
    mainPopupEdit.close();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupFormInstanceEdit.setSubmitAction(handleEditFormSubmit);

addButton.addEventListener("click", function () {
    mainPopupAdd.open();
    cardFormValidator.resetValidation();
});

const cardFormValidator = new FormValidator(config, formAddElement);
const profileFormValidator = new FormValidator(config, formEditElement);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardSectionInstance.renderItems(initialCards);
popupFormInstanceAdd.setEventListener();
popupFormInstanceEdit.setEventListener();

mainPopupAdd.setEventListeners();
mainPopupEdit.setEventListeners();
imagePopup.setEventListeners();
