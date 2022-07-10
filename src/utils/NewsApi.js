import {
  API_KEY,
  FROM,
  NEWS_BASE_URL,
  PAGE_SIZE,
  TO
} from "./Constants";


class NewsApi {
  constructor() {
    this._baseUrl = NEWS_BASE_URL ;
    this._apiKey = API_KEY;
    this._fromDate = FROM;
    this._toDate = TO;
    this._pageSize = PAGE_SIZE;
  }

  find(keyword) {
    return fetch(
      `${this._baseUrl}`
      + '/everything?'
      + `q=${keyword}&`
      + `apiKey=${this._apiKey}&`
      + `from=${this._fromDate}&`
      + `to=${this._toDate}&`
      + `pageSize=${this._pageSize}`,
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Nothing found'))))
      .then((data) => data.articles);
  }
}

const newsApi = new NewsApi();

export default newsApi;