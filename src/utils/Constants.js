// ======================== Global ======================== //
/**
 * Prints the error to console.
 * @param err error to print.
 */
export const logError = (err) => console.log(err);

export const BASE_URL = 'https://api.ab-news-explorer.students.nomoreparties.sbs';
//export const BASE_URL = 'http://localhost:3000';

// ======================== NewsApi ======================== //
/**
 * Returns the current time minus the days specified in the parameter.
 * @param daysAgo number of days to subtract.
 * @returns {string}
 */
const getTime = (daysAgo = 0) => {
  const time = new Date();
  time.setDate(time.getDate() - daysAgo);
  return time.toISOString().split('T')[0];
};

//export const NEWS_BASE_URL = 'https://newsapi.org/v2';
export const NEWS_BASE_URL = 'https://nomoreparties.co/news/v2';
export const API_KEY = '3919da503a024dec9982a4020d02154e';
export const FROM = getTime();
export const TO = getTime(7);
export const PAGE_SIZE = 100;

