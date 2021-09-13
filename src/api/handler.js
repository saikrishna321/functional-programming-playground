import { returnResponse, handleError } from '../utils/response.js';
import { BASE_URL } from '../constants/request.js';
import { evolve, merge } from 'ramda';

import fetch from 'node-fetch';

const requestBuilder = (defaultRequestHeaders) => (otherOptions) => {
  return request(
    evolve(
      {
        requestOptions: merge(defaultRequestHeaders),
      },
      otherOptions
    )
  );
};

const request = (options) => () => {
  return fetch(`${BASE_URL}${options.url}`, options.requestOptions);
};

const customRequest = requestBuilder({
  headers: { 'Content-Type': 'application/json' },
});

export const sendGetRequest = (options) =>
  customRequest(options)().then(returnResponse).catch(handleError);

export const sendPostRequest = (options) =>
  customRequest(options)().then(returnResponse).catch(handleError);
