import { inputType, inputUrl, cardContainer, card, remove } from "../index";
export { createNewCard, like, deleteCard };

// Создание карточки
function createNewCard(evt) {
  evt.preventDefault();

  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  const cardImages = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");

  cardImages.src = inputUrl.value;
  cardTitle.textContent = inputType.value;

  buttonDelete.addEventListener("click", () => {
    deleteCard(cardItem);
  });
  cardImages.addEventListener("click", () => {
    openPopupImage(cardImages, cardTitle);
  });

  card.prepend(cardItem);
  remove();
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
