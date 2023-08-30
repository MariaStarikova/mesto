export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    }).then(this._checkResponse);
  }

  getInfoUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    }).then(this._checkResponse);
  }

  updateUserInfo(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(this._checkResponse);
  }

  addNewCard(newCardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCardData)
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._checkResponse);
  }

  updateUserAvatar(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }
}
