
import { apiAddLike, apiDeleteLike,deleteCardApi  } from "../components/api";
import { openPopup } from "./modal";
// @todo: Темплейт карточки
const cardContainer = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardSection = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(card, deleteCard, cardLike, handleImageClick, userId) {
  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const buttonLike = cardItem.querySelector(".card__like-button");
  const count = cardItem.querySelector(".card__like-button_count");


  if (card.owner._id !== userId) {
    buttonDelete.remove();
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  count.textContent = card.likes.length;

  buttonLike.addEventListener("click", () => {
    cardLike(buttonLike, count, card._id);
  });
  buttonDelete.addEventListener("click", () => {
    deleteCard(cardItem, card._id);
  });

  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage, cardTitle);
  });

  return cardItem;
}

function deleteCard(card, id) {
  card.remove();
  deleteCardApi(id);
}

function cardLike(button, countLike, cardId) {
  button.classList.toggle("card__like-button_is-active");
  if (button.classList.contains("card__like-button_is-active")) {
    apiAddLike(cardId)
      .then((data) => {
        countLike.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error("mistake", err);
      });
  } else {
    apiDeleteLike(cardId)
      .then((data) => {
        countLike.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error("mistake", err);
      });
  }
}
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function handleImageClick(image, text) {
  openPopup(popupTypeImage);
  popupCaption.textContent = text.textContent;
  popupImage.alt = text.textContent;
  popupImage.src = image.src;
}
export { cardLike, deleteCard, createCard, cardSection, handleImageClick };
