const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "a9e447d0-ee0f-490c-9f9c-792765490c47",
    "Content-Type": "application/json",
  },
};
function handleResponse(res) {
  if (!res.ok) {
    throw new Error("нет ответа от сервера");
  }
  return res.json();
}

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me `, {
    headers: { ...config.headers },
  }).then(handleResponse);
};

const getCardServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: { ...config.headers },
  }).then(handleResponse);
};

const promises = [getUserData(), getCardServer()];

const getDataUserAndCards = () => {
  return Promise.all(promises);
};

const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: { ...config.headers },
  })
    .then(handleResponse)
    .then((data) => {
      return data;
    });
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
    .then(handleResponse)
    .then((data) => {
      return data;
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
    .then(handleResponse)
    .then((data) => {
      return data;
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
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

const apiAddLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: { ...config.headers },
  })
    .then(handleResponse)
    .then((data) => {
      return data;
    });
};

const apiDeleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: { ...config.headers },
  })
    .then(handleResponse)
    .then((data) => {
      return data;
    });
};

export {
  apiAddLike,
  apiDeleteLike,
  deleteCardApi,
  sentMyData,
  sentCardData,
  changeAvatar,
  getDataUserAndCards,
};
