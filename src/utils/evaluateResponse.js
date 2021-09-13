import { ifElse, propEq } from 'ramda';

const returnErrorDataObject = (message) => (data) => ({
  error: data.error,
  message,
  status: data.response.status,
  statusText: data.response.statusText,
});

const returnDataObject = async (data) => ({
  error: data.error,
  status: data.response.status,
  statusText: data.response.statusText,
  response: await data.response.json(),
});

const hasError = propEq('error', true);

export const evaluateApiResponses = ifElse(
  hasError,
  returnErrorDataObject('API Failed'),
  returnDataObject
);
