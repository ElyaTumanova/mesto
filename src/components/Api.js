export class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  }

  getCards () {
    return fetch (`${this._url}/cards`,
    {
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
    })
    .then(this._handleResponse)
  }

  addCard (card) {
    return fetch (`${this._url}/cards`,
    {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
    .then(this._handleResponse)
  }

  deleteCard (cardId) {
    return fetch (`${this._url}/cards/${cardId}`, 
    {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
    })
    .then(this._handleResponse)
  }

  likeCard (cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`,
    {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
    })
    .then(this._handleResponse)
  }

  deleteLikeCard (cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`,
    {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
    })
    .then(this._handleResponse)
  }


  getUserInfo () {
    return fetch (`${this._url}/users/me`,
    {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
    })
    .then(this._handleResponse)
  }

  upadateUserInfo (userData) {
    return fetch (`${this._url}/users/me`,
    {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.profileName,
        about: userData.profileDesccription
      })
    })
    .then(this._handleResponse)
  }

  changeAvatar (avatarLink) {
    return fetch (`${this._url}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(this._handleResponse)
  }

  _handleResponse (res) {
    if (res.ok) {
      return res.json()
     } else {
       return Promise.reject(`Ошибка: ${res.status}`)
     }
  }
}