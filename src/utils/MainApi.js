import {BASE_URL} from "./Constants";

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /**
   * Updates the token.
   * @param token new token
   */
  updateToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  },
});

export default api;