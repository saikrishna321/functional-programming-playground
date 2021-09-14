import { requestAndEvaluate } from '../utils/evaluateResponse.js';
import { expect } from 'chai';
import { always, equals, is } from 'ramda';
import { find, getRandomStoreId, updateStore } from '../domain/store.js';

describe('Hello Stores', () => {
  it('Response should return 404', async () => {
    const { status } = await requestAndEvaluate({
      url: '/stores/4yyy',
      requestOptions: {
        method: 'GET',
      },
    });
    expect(status).to.be.equal(404);
  });

  it('Response should return 200 for valid request', async () => {
    const { status } = await requestAndEvaluate({
      url: '/stores/4',
      requestOptions: {
        method: 'GET',
      },
    });
    expect(status).to.be.equal(200);
  });

  it('Add new store', async () => {
    let body = JSON.stringify({
      name: 'Bangalore',
      type: 'Cleaning',
      address: 'Bangalore City',
      city: 'Bangalore',
      state: 'KARNATAKA',
      zip: '560009',
    });
    const { status, response } = await requestAndEvaluate({
      url: '/stores',
      requestOptions: {
        body,
        method: 'POST',
      },
    });
    expect(status).to.be.equal(201);
    expect(is(Number, response.id)).to.be.true;
  });

  it('Update the Store city', async () => {
    const store = await find(getRandomStoreId)().then((store) =>
      updateStore(store).then(always(store))
    );

    const updatedStore = await find()(store);
    expect(equals(store.city, updatedStore.city)).to.be.equal(false);
  });
});
