import { isEmpty, propSatisfies } from 'ramda';

export const isValidRequest = () => propSatisfies(isEmpty(), 'body');
