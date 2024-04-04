// @todo: Темплейт карточки
const cardContainer = document.querySelector("#card-template").content;

// @todo: DOM узлы
const card = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(element, deleteButtonCall) {
  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__image").src = element.link;
  cardItem.querySelector(".card__title").textContent = element.name;
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => {
    deleteCard(cardItem);
  });
  return cardItem;

  // Можно мне пояснительную бригаду
  // Сейчас все работает, но я не понимаю, где мы используем второй параметр deleteButtonCall ? или нужно написать вот так ↓ и почему работают оба способа
  //    buttonDelete.addEventListener("click", () => {
  //    deleteButtonCall=deleteCard(cardItem)
  //  });
  //
}
// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  card.append(createCard(item, deleteCard));
});
