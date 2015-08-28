var rootProperty = 'LinearFunctionsDiff';

var setRootProperty = (prop) => {
  rootProperty = prop;
};

var getRootProperty = () => {
  return rootProperty;
};

var initRootProperty = () => {
  window[rootProperty] = window[rootProperty] || {};
};

var isObjectTreeEmpty = (str) => {
  return str === '';
};

export default (object, name) => {
  initRootProperty();
  if (isObjectTreeEmpty(name)) {
    return;
  }

  var objTree = name.split('.');
  var pastObject = window[rootProperty];
  while (objTree.length > 1) {
    let property = objTree.shift();
    pastObject[property] = pastObject[property] || {};
    pastObject = pastObject[property];
  }

  pastObject[objTree.shift()] = object;
};

export {getRootProperty, setRootProperty};