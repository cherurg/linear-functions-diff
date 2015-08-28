import {getRootProperty} from './global_export';
let rootProperty = getRootProperty();

export default (name) => {
  let path = name.split('.');
  let pastObject = window[rootProperty];
  while (path.length > 0) {
    pastObject = pastObject[path.shift()];
  }

  return pastObject;
};