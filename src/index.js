import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import {
  like,
  deleteCard,
  createCard,
  createNewCard,
} from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";

// @todo: Темплейт карточки
const cardContainer = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardSection = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  cardSection.append(createCard(item, deleteCard, like, handleImageClick));
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
  resetForm();
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupCard);
});
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(popupCard);
    closePopup(popupName);
    closePopup(popupTypeImage);
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

function resetForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// попам профиля
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements["name"];
const jobInput = profileForm.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// попам места
const formElementNew = document.forms["new-place"];
const inputType = formElementNew.elements["place-name"];
const inputUrl = formElementNew.elements["link"];

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupName);
  profileForm.reset();
}
function chandlePlaceFormSubmit(evt) {
  evt.preventDefault();
  createNewCard(inputUrl, inputType, { deleteCard, like, handleImageClick });
  formElementNew.reset();
  closePopup(popupCard);
}
// форма с профилем
profileForm.addEventListener("submit", handleProfileFormSubmit);
// форма с добавлением места
formElementNew.addEventListener("submit", chandlePlaceFormSubmit);

export { cardContainer, cardSection }; // в card
