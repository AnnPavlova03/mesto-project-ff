import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
export { inputType, inputUrl, cardContainer, card, deleteClass as remove }; // в card
export { deleteClass, resetform, formElementNew, popupName, popupCard }; // в modal
import { createNewCard, like, deleteCard } from "./components/card.js";
import { closePopup, OpenPopup } from "./components/modal.js";

// @todo: Темплейт карточки
const cardContainer = document.querySelector("#card-template").content;

// @todo: DOM узлы
const card = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(element, deleteButtonCall, like, openPopupImage) {
  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  const cardImages = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");

  cardImages.src = element.link;
  cardTitle.textContent = element.name;

  buttonDelete.addEventListener("click", () => {
    deleteButtonCall(cardItem);
  });
  card.addEventListener("click", like);
  cardImages.addEventListener("click", () => {
    openPopupImage(cardImages, cardTitle);
  });
  return cardItem;
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  card.append(createCard(item, deleteCard, like, openPopupImage));
});

// DOM кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const buttonClose = document.querySelector(".popup__close");

// DOM попапы
const popupName = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");

// открыли по щелчку
profileEditButton.addEventListener("click", OpenPopup);
profileAddButton.addEventListener("click", OpenPopup);

//  Открываю попап по картинке
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function openPopupImage(image, text) {
  popupTypeImage.classList.toggle("popup_is-opened");
  popupTypeImage.classList.toggle("popup_is-animated");

  popupCaption.textContent = text.textContent;
  popupImage.alt = text.textContent;
  popupImage.src = image.src;
}

function deleteClass() {
  popupName.classList.remove("popup_is-opened");
  popupCard.classList.remove("popup_is-opened");
  popupTypeImage.classList.remove("popup_is-opened");
}

function resetform() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

buttonClose.addEventListener("click", closePopup);
document.addEventListener("keydown", closePopup);
document.addEventListener("click", closePopup);

// попам профиля
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// попам места
const formElementNew = document.forms["new-place"];
const inputType = formElementNew.elements["place-name"];
const inputUrl = formElementNew.elements["link"];

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  deleteClass();
}

// форма с профилем
formElement.addEventListener("submit", handleFormSubmit);
// форма с добавлением места
formElementNew.addEventListener("submit", function (evt) {
  createNewCard(evt);
});
