import {BASE_URL} from "./Constants";

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  /**
   * Checks the status of a request response. Returns corresponding result.
   * @param res request response
   * @returns {any|Promise<never>}
   * @private
   */
  _checkRes(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Error: ${res.status}\n${res.statusText}`);
  }

  /**
   * Returns articles from the server.
   * @returns {Promise<never>}
   */
  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {headers: this._headers})
      .then(this._checkRes);
  }

  /**
   * Returns user's info from the server
   * @returns {Promise<never>}
   */
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
      .then(this._checkRes);
  }

  /**
   * Adds an article to the server
   * @param article
   * @returns {Promise<never>}
   */
  saveArticle(article) {
    return fetch(`${this._baseUrl}/articles`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(article),
    })
      .then(this._checkRes)
  }

  /**
   * Deletes an article from the server
   * @param articleID card id
   * @returns {Promise<never>}
   */
  deleteArticle(articleID) {
    return fetch(`${this._baseUrl}/articles/${articleID}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkRes);
  }

  /**
   * Updates the token.
   * @param token new token
   */
  updateToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  },
});

export default mainApi;