import { expect } from 'chai';
import { always, equals, is } from 'ramda';
import {
  addStore,
  findStoreWith,
  randomId,
  updateStore,
} from '../domain/store.js';

describe('Hello Stores', () => {
  it('Response should return 404', async () => {
    const { status } = await findStoreWith()({ id: '00000' });
    expect(status).to.be.equal(404);
  });

  it('Response should return 200 for valid request', async () => {
    const { status } = await findStoreWith(randomId)();
    expect(status).to.be.equal(200);
  });

  it('Add new store', async () => {
    const {
      status,
      response: { id },
    } = await addStore();
    expect(status).to.be.equal(201);
    expect(is(Number, id)).to.be.true;
  });

  it('Update the Store city', async () => {
    const store = await findStoreWith(randomId)().then((store) =>
      updateStore(store).then(always(store.response))
    );

    const updatedStore = await findStoreWith()(store);
    expect(equals(store.city, updatedStore.city)).to.be.equal(false);
  });
});
