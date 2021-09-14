import { requestAndEvaluate } from '../utils/evaluateResponse.js';
import { findLast, pipe, prop } from 'ramda';
import faker from 'faker';

export const find = (randomStore) => async (storeId) => {
  const { id } =
    typeof randomStore === 'function' ? await randomStore() : storeId;
  return (
    await requestAndEvaluate({
      url: `/stores/${id}`,
      requestOptions: {
        method: 'GET',
      },
    })
  ).response;
};

export const updateStore = async ({ id }) => {
  const body = JSON.stringify({
    city: `${faker.address.city()}`,
  });
  return await requestAndEvaluate({
    url: `/stores/${id}`,
    requestOptions: {
      method: 'PATCH',
      body,
      redirect: 'follow',
    },
  });
};

export const getRandomStoreId = async () => {
  const { response } = await requestAndEvaluate({
    url: '/stores',
    requestOptions: {
      method: 'GET',
    },
  });
  return pipe(prop('data'), findLast(prop('id')))(response);
};
