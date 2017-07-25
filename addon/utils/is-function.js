import { typeOf } from '@ember/utils';

export default function isFunction(query) {
  return typeOf(query) === 'function';
}
