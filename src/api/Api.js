import { sendGetRequest, sendPostRequest } from './handler.js';
import { equals, prop } from 'ramda';

export const request = (options) => {
  return determineApiCall(options);
};

const determineApiCall = (options) =>
  isPostMethod(options) ? sendPostRequest(options) : sendGetRequest(options);

const isPostMethod = ({ requestOptions }) =>
  equals(prop('method')(requestOptions), 'POST');
