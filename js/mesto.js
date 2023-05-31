let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__form-field-name");
let jobInput = document.querySelector(".popup__form-field-job");
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

function popupOpened() {
    popup.classList.add("popup_opened");
}
function popupClose() {
    popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupOpened);
closeButton.addEventListener("click", popupClose);
// Получите значение полей jobInput и nameInput из свойства value
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
