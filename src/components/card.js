import { cardContainer, cardSection } from "../index";

// @todo: Функция создания карточки

function createCard(element, deleteButtonCall, cardLike, handleImageClick) {
  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  buttonDelete.addEventListener("click", () => {
    deleteButtonCall(cardItem);
  });
  cardSection.addEventListener("click", cardLike);
  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage, cardTitle);
  });

  return cardItem;
}

// Функция добавления новой карточки
function createNewCard(url, text, { deleteCard, cardLike, handleImageClick }) {
  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");

  cardImage.src = url.value;
  cardImage.alt = text.value;
  cardTitle.textContent = text.value;

  buttonDelete.addEventListener("click", () => {
    deleteCard(cardItem);
  });

  cardSection.prepend(cardItem);

  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage, cardTitle);
  });
  cardSection.addEventListener("click", cardLike);
  return cardItem;
}

//  функциz Like
function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

export { like, deleteCard, createCard, createNewCard };
