import { requestAndEvaluate } from '../utils/evaluateResponse.js';
import { findLast, pipe, prop } from 'ramda';
import faker from 'faker';

export const findStoreWith = (randomStore) => async (response) => {
  const { id } =
    typeof randomStore === 'function' ? await randomStore() : response;
  return await requestAndEvaluate({
    url: `/stores/${id}`,
    requestOptions: {
      method: 'GET',
    },
  });
};

export const updateStore = async ({ response }) => {
  const body = JSON.stringify({
    city: `${faker.address.city()}`,
  });
  return await requestAndEvaluate({
    url: `/stores/${response.id}`,
    requestOptions: {
      method: 'PATCH',
      body,
      redirect: 'follow',
    },
  });
};

export const randomId = async () => {
  const { response } = await requestAndEvaluate({
    url: '/stores',
    requestOptions: {
      method: 'GET',
    },
  });
  return pipe(prop('data'), findLast(prop('id')))(response);
};

export const addStore = async () => {
  let address = faker.address;
  let name = faker.name;
  let body = JSON.stringify({
    name: name.firstName(),
    type: name.jobType(),
    address: address.streetName(),
    city: address.city(),
    state: address.state(),
    zip: address.zipCode(),
  });
  return await requestAndEvaluate({
    url: '/stores',
    requestOptions: {
      body,
      method: 'POST',
    },
  });
};
