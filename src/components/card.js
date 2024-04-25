
// @todo: Темплейт карточки
const cardContainer = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardSection = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(link, title, deleteButtonCall, cardLike, handleImageClick) {
  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const buttonLike = cardItem.querySelector(".card__like-button")

  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;
 
  buttonDelete.addEventListener("click", () => {
    deleteButtonCall(cardItem);
  });
  buttonLike.addEventListener("click", cardLike);
  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage, cardTitle);
  });

  return cardItem;
}

//  функциz Like
function like(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

export { like, deleteCard, createCard, cardSection};
