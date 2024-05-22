import { apiAddLike, apiDeleteLike, deleteCardApi } from "../components/api";

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
  } else {
    buttonDelete.addEventListener("click", () => {
      deleteCard(cardItem, card._id);
    });
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  count.textContent = card.likes.length;

  const liked = card.likes.some((like) => like._id === userId);
  if (liked) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", () => {
    cardLike(buttonLike, count, card);
  });

  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage, cardTitle);
  });

  return cardItem;
}

function deleteCard(card, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error("Ошибка. Запрос не выполнен", err);
    });
}

function cardLike(button, countLike, card) {
  const isLiked = button.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? apiDeleteLike : apiAddLike;
  likeMethod(card._id)
    .then((data) => {
      countLike.textContent = data.likes.length;
      button.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}

export { cardLike, deleteCard, createCard, cardSection };
