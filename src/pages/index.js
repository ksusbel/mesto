import "./index.css";
import { Card } from "../components/Card.js";
import { config, editButton, nameInput, jobInput, addButton, editAvatar } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithDel } from "../components/PopupWithDel.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const formAddElement = document.forms["popup_form_add"];
const formEditElement = document.forms["popup_form_edit"];
const formEditAvatarElement = document.forms["popup_form_edit_avatar"];

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-73",
    headers: {
        authorization: "9c48a9c4-fdc2-4c4d-ac5a-9b5a7851a95e",
        "Content-Type": "application/json",
    },
});

let userId = null;

api.getAllInfo().then(([userData, cardAll]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardSectionInstance.renderItems(cardAll.reverse());
});

const popupFormInstanceAdd = new PopupWithForm("#popup_add_card", handleSubmitAdd);

const popupFormInstanceEdit = new PopupWithForm("#popup_edit_prof", (data) => {
    const dataInfo = {
        name: data.username,
        about: data.job,
    };
    popupFormInstanceEdit.renderLoading(true);
    api.editUserInfo(dataInfo)
        .then((res) => {
            userInfo.setUserInfo(res);
            popupFormInstanceEdit.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupFormInstanceEdit.renderLoading(false);
        });
});

const popupFormInstanceEditAvatar = new PopupWithForm("#popup_edit_avatar", (data) => {
    const dataLink = {
        avatar: data.avatar,
    };
    popupFormInstanceEditAvatar.renderLoading(true);
    api.editAvatar(dataLink)
        .then((res) => {
            userInfo.setUserAvatar(res);
            popupFormInstanceEditAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupFormInstanceEditAvatar.renderLoading(false);
        });
});

const imagePopup = new PopupWithImage("#popup_full_img");
const userInfo = new UserInfo({ username: ".profile__name", job: ".profile__description", avatar: ".profile__avatar" });

function hendleClickImgFull(name, link) {
    imagePopup.open(name, link);
}

function handleClickDelete(cardElement) {
    //  console.log(cardElement);
    deleteCardPopup.open();
    deleteCardPopup.submitCallback(() => {
        api.removeCard(cardElement.getId())
            .then(() => {
                deleteCardPopup.close();
                cardElement.remove();
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

function handleLikeCard(instance) {
    api.changeLike(instance.getId(), instance.isLiked()).then((dataCardFromServer) => {
        instance.setLikesData(dataCardFromServer);
    });
}

function renderNewCard(dataCard) {
    const cardElement = new Card(dataCard, hendleClickImgFull, handleClickDelete, userId, handleLikeCard, "#elements_template");
    return cardElement.createCard();
}

function handleSubmitAdd(dataFromServer) {
    popupFormInstanceAdd.renderLoading(true);
    api.addNewCard(dataFromServer)
        .then((res) => {
            cardSectionInstance.addItem(renderNewCard(res), true);
            popupFormInstanceAdd.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupFormInstanceAdd.renderLoading(false);
        });
}

const cardSectionInstance = new Section(".elements__list", (dataItem) => {
    cardSectionInstance.addItem(renderNewCard(dataItem));
});

editButton.addEventListener("click", function () {
    popupFormInstanceEdit.open();
    const data = userInfo.getUserInfo();
    profileFormValidator.resetValidation();
    nameInput.value = data.username;
    jobInput.value = data.job;
});

editAvatar.addEventListener("click", function () {
    popupFormInstanceEditAvatar.open();
    profileAvatarFormValidator.resetValidation();
});

addButton.addEventListener("click", function () {
    popupFormInstanceAdd.open();
    cardFormValidator.resetValidation();
});

const cardFormValidator = new FormValidator(config, formAddElement);
const profileFormValidator = new FormValidator(config, formEditElement);
const profileAvatarFormValidator = new FormValidator(config, formEditAvatarElement);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
profileAvatarFormValidator.enableValidation();

popupFormInstanceAdd.setEventListeners();
popupFormInstanceEdit.setEventListeners();
popupFormInstanceEditAvatar.setEventListeners();
imagePopup.setEventListeners();

// Создаем попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithDel({ popupSelector: "#popup_delete-card" });
deleteCardPopup.setEventListeners();
