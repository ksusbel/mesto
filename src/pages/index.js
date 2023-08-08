import "./index.css";
import { Card } from "../components/Card.js";
import { config, initialCards, namePlaceInput, linkPlaceInput, editButton, formEditElement, nameInput, jobInput, addButton } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
//import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

export const formAddElement = document.forms["popup_form_add"];

const cardSectionInstance = new Section(renderNewCard, ".elements__list");
const popupFormInstanceAdd = new PopupWithForm("#popup_add_card", (data) => {  
    renderNewCard({ data: { 
        name: data.name, 
        link: data.link 
        } 
    });
    popupFormInstanceAdd.close();
});

const popupFormInstanceEdit = new PopupWithForm('#popup_edit_prof', (data) => {    
      const dataInfo = {
              name: data.username,
              about: data.job,
          };
          userInfo.setUserInfo(dataInfo);
      popupFormInstanceEdit.close();
  });

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

editButton.addEventListener("click", function () {
    popupFormInstanceEdit.open();
    const data = userInfo.getUserInfo();    
    profileFormValidator.resetValidation();   
    nameInput.value = data.username;
    jobInput.value = data.job;
});

addButton.addEventListener("click", function () {
    popupFormInstanceAdd.open();
    cardFormValidator.resetValidation();
});

const cardFormValidator = new FormValidator(config, formAddElement);
const profileFormValidator = new FormValidator(config, formEditElement);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardSectionInstance.renderItems(initialCards);
popupFormInstanceAdd.setEventListeners();
popupFormInstanceEdit.setEventListeners();
imagePopup.setEventListeners();
