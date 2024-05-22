import "./pages/index.css";
import {
  cardLike,
  deleteCard,
  createCard,
  cardSection,
} from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  sentMyData,
  sentCardData,
  changeAvatar,
  getDataUserAndCards,
} from "./components/api.js";
import { validationConfig } from "./components/validation.js";

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
  clearValidation(
    popupName.querySelector(validationConfig.formSelector),
    validationConfig
  );
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupCard);
  clearValidation(
    popupCard.querySelector(validationConfig.formSelector),
    validationConfig
  );
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

//Валидация профиля

enableValidation(validationConfig);

// попам профиля
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements["name"];
const jobInput = profileForm.elements["description"];
const buttonName = profileForm.elements["button-name"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const dislayUserDataAndCards = () => {
  getDataUserAndCards().then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
    cards.forEach((card) => {
      cardSection.append(
        createCard(card, deleteCard, cardLike, handleImageClick, user._id)
      );
    });
  });
};
dislayUserDataAndCards();

function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupName);
  renderLoading(true, buttonName);

  const input = {
    name: nameInput.value,
    about: jobInput.value,
  };
  sentMyData(input)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((error) => {
      console.error("Ошибка. Запрос не выполнен", error);
    })
    .finally(() => {
      renderLoading(false, buttonName);
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// попам места
const formElementNew = document.forms["new-place"];
const inputType = formElementNew.elements["place-name"];
const inputUrl = formElementNew.elements["link"];
const buttonPlace = formElementNew["button-place"];

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const inputValue = {
    name: inputType.value,
    link: inputUrl.value,
  };
  renderLoading(true, buttonPlace);
  sentCardData(inputValue)
    .then((dataAnswer) => {
      cardSection.prepend(
        createCard(
          dataAnswer,
          deleteCard,
          cardLike,
          handleImageClick,
          dataAnswer.owner._id
        )
      );
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    })
    .finally(() => {
      renderLoading(false, buttonPlace);
    });

  formElementNew.reset();
  closePopup(popupCard);
}

// форма с добавлением места
formElementNew.addEventListener("submit", handlePlaceFormSubmit);

const profileAvatarCorrect = document.querySelector(".profile__image_correct");
const popupChangeAvatar = document.querySelector(".popup_type_avatar");
const formEditAvatar = document.forms["edit-avatar"];
const inputUrlAvatar = formEditAvatar.elements["url"];
const buttonAvatar = formEditAvatar.elements["button-avatar"];

profileAvatarCorrect.addEventListener("click", () => {
  openPopup(popupChangeAvatar);
  clearValidation(
    popupChangeAvatar.querySelector(validationConfig.formSelector),
    validationConfig
  );
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, buttonAvatar);
  changeAvatar(inputUrlAvatar.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      console.log(data);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    })
    .finally(() => {
      renderLoading(false, buttonAvatar);
    });

  formEditAvatar.reset();
  closePopup(popupChangeAvatar);
}

formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
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
