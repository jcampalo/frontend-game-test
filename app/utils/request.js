/* eslint-disable no-param-reassign */

import 'whatwg-fetch';

const parseJSON = response => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const request = (url, { body, ...options }) => {
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
};

export default request;
