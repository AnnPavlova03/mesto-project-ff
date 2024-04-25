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
  cardSection.append(createCard(item.link, item.name, deleteCard, like, handleImageClick));
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
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupCard);
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

// попам места
const formElementNew = document.forms["new-place"];
const inputType = formElementNew.elements["place-name"];
const inputUrl = formElementNew.elements["link"];


function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  cardSection.prepend(createCard( inputUrl.value, inputType.value, deleteCard, like, handleImageClick));
  formElementNew.reset();
  closePopup(popupCard);
}

// форма с добавлением места
formElementNew.addEventListener("submit", handlePlaceFormSubmit);
