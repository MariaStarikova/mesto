export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  getInfoUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  updateUserInfo(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  addNewCard(newCardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCardData)
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  updateUserAvatar(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }
}
