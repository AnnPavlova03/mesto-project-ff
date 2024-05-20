import { cardSection, createCard,deleteCard,cardLike, handleImageClick } from "./card";

const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-13",
    headers: {
      authorization: "a9e447d0-ee0f-490c-9f9c-792765490c47",
      "Content-Type": "application/json",
    },
  };
  

  const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me `, {
      headers: { ...config.headers },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("нет ответа от сервера");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Ошибка. Запрос не выполнен", error);
      });
  };
  

  
  const getCardServer = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: { ...config.headers },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("нет ответа от сервера");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  };

  const promises = [getUserData(), getCardServer()];
  Promise.all(promises)
  
    .then(([user, cards]) => {
        const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
      profileName.textContent = user.name;
      profileDescription.textContent = user.about;
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
  
      cards.forEach((card) => {
        cardSection.append(
          createCard(card, deleteCard, cardLike, handleImageClick, user._id)
        );
      });
    })
    .catch((error) => {
      console.error("Ошибка при выполнении Promise.all", error);
    });
  
  const deleteCardApi = (cardId) => {
    fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: { ...config.headers },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };
  

  
  const sentMyData = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...config.headers },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("нет ответа от сервера");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Ошибка. Запрос не выполнен", error);
      });
  };
  
  const sentCardData = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: { ...config.headers },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("нет ответа от сервера");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Ошибка. Запрос не выполнен", error);
      });
  };
  
  function changeAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...config.headers },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("нет ответа от сервера");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Ошибка. Запрос не выполнен", error);
      });
  }
  
  const apiAddLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: { ...config.headers },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("нет ответа от сервера");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Ошибка. Запрос не выполнен", error);
      });
  };
  
  const apiDeleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: { ...config.headers },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("нет ответа от сервера");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Ошибка. Запрос не выполнен", error);
      });
  };

  export { apiAddLike, apiDeleteLike, deleteCardApi }
export{sentMyData, sentCardData, changeAvatar}