export { closePopup, OpenPopup };
import {
  deleteClass,
  resetform,
  formElementNew,
  popupName,
  popupCard,
} from "../index";

function closePopup(evt) {
  if (evt.key === "Escape") {
    deleteClass();
    formElementNew.reset();
  }
  if (evt.target.classList.contains("popup_is-opened")) {
    deleteClass();
  }
  if (evt.target.classList.contains("popup__close")) {
    deleteClass();
    formElementNew.reset();
  }
}

function OpenPopup(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    popupName.classList.toggle("popup_is-opened");
    popupName.classList.toggle("popup_is-animated");
    resetform();
  }
  if (evt.target.classList.contains("profile__add-button")) {
    popupCard.classList.toggle("popup_is-opened");
    popupCard.classList.toggle("popup_is-animated");
  }
}
