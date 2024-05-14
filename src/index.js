import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import {
  like,
  deleteCard,
  createCard,
  cardSection,
} from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  cardSection.append(
    createCard(item.link, item.name, deleteCard, like, handleImageClick)
  );
});

// DOM кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

// DOM попапы
const popupName = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");

profileEditButton.addEventListener("click", () => {
  openPopup(popupName);
  fillProfileInputs();
  clearValidation(
    popupName.querySelector(validationConfig.formSelector),
    validationConfig
  );
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupCard);
  clearValidation(
    popupCard.querySelector(validationConfig.formSelector),
    validationConfig
  );
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function handleImageClick(image, text) {
  openPopup(popupTypeImage);
  popupCaption.textContent = text.textContent;
  popupImage.alt = text.textContent;
  popupImage.src = image.src;
}
// попам профиля
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements["name"];
const jobInput = profileForm.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupName);
  profileForm.reset();
  

}
// форма с профилем
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Валидация профиля

//Отображает сообщение об ошибке и добавляет класс ошибки к инпуту
function showInputError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorClass);
}
// удаляет класс ошибки
function hideInputError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = "";
}
// Проверяем валидацию инпута в зависимости от значения отобрадаем или скрываем ошибки
function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// делает проверку формы "живой" за счет 'input' и работает с состоянием кнокпи сохранить
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = document.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    
    });
  });
}

// ищет все формы в DOM и проверяет инпуты на валидацию
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
}
enableValidation();

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// проверяет все инпуты на валидность
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// добавляет класс кнопке в случае если инпут невалиден
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
}

function clearValidation(formElement, validationConfig) {
  const inputErrorList = Array.from(
    formElement.querySelectorAll(`.${validationConfig.inputErrorClass}`)
  );
  inputErrorList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    toggleButtonState(inputList, submitButton);
 
}










// попам места
const formElementNew = document.forms["new-place"];
const inputType = formElementNew.elements["place-name"];
const inputUrl = formElementNew.elements["link"];

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  cardSection.prepend(
    createCard(
      inputUrl.value,
      inputType.value,
      deleteCard,
      like,
      handleImageClick
    )
  );
  formElementNew.reset();
  closePopup(popupCard);
}

// форма с добавлением места
formElementNew.addEventListener("submit", handlePlaceFormSubmit);
