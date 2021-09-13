import HTTPResponseError from '../exception/HTTPResponseError.js';

export const returnResponse = (response) => checkStatus(response);

export const handleError = ({ response }) => ({
  error: true,
  response,
});

const checkStatus = (response) => {
  if (response.ok) {
    return {
      error: false,
      response,
    };
  } else {
    throw new HTTPResponseError(response);
  }
};
