export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfoFromServer() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._getResponseData);
  }

  getCardsFromServer() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._getResponseData);
  }

  setUsersInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.profession,
      }),
    }).then(this._getResponseData);
  }

  updateUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then(this._getResponseData);
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }

  putLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }
}
