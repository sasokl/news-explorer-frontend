import {BASE_URL, logError} from "./Constants";

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
    /*.then((response) => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .catch(logError)*/
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then((response) => {
      if (!response.ok) return response
        .text()
        .then(text => {
        throw new Error(text)
      })
      return response.json();
    })
    .then((res) => {
      if (res) {
        localStorage.setItem('jwt', res.token);
        return res;
      }
    })
    .catch(logError);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      if (!response.ok) return response
        .text()
        .then(text => {
        throw new Error(text)
      })
      return response.json();
    })
    .catch(logError);
}