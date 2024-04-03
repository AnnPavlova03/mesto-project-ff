// @todo: Темплейт карточки
const cardContainer = document.querySelector("#card-template").content;

// @todo: DOM узлы
const card = document.querySelector(".places__list");

// @todo: Функция создания карточки

function CreateCard(element, DeleteButtonCall) {
  const cardItem = cardContainer.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__image").src = element.link;
  cardItem.querySelector(".card__title").textContent = element.name;
  cardItem
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      DeleteButtonCall = DeleteCard();
    });

  return cardItem;
}
// @todo: Функция удаления карточки

function DeleteCard() {
  document.querySelector(".places__item").remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  card.append(CreateCard(item));
});
