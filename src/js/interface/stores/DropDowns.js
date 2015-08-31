import {EventEmitter} from 'events';
import assign from 'object-assign';
import keyMirror from 'keymirror';
import _ from 'lodash';
import AppDispatcher from '../dispatcher';
import Constants from '../constants/DropDown';
let CHANGE_EVENT = 'change';

let names = keyMirror({
  functions: null
});

let dropDowns = {
  [names.functions]: {
    elements: [
      '$f(x) = x^2$',
      '$f(x) = |x|$',
      '$f(x) = sin(x)$',
      '$f(x) = x sin(\\frac{1}{x})$',
      '$f(x) = x^2 sin(\\frac{1}{x})$',
      '$f(x) = |sin(x)|$'
    ],
    func: {
      '$f(x) = x^2$': (x) => x*x,
      '$f(x) = |x|$': (x) => Math.abs(x),
      '$f(x) = sin(x)$': (x) => Math.sin(x),
      '$f(x) = x sin(\\frac{1}{x})$': (x) => x !== 0 ? x * Math.sin(1/x) : 0,
      '$f(x) = x^2 sin(\\frac{1}{x})$': (x) => x !== 0 ? x*x * Math.sin(1/x) : 0,
      '$f(x) = |sin(x)|$': (x) => Math.abs(Math.sin(x))
    },
    current: '$f(x) = x^2$'
  }
};

let setCurrent = (name, current) => {
  dropDowns[name].current = current;
};

let dropDownsStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },


  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
    return dropDowns;
  },

  getCurrent(name) {
    return dropDowns[name].current;
  },

  getElements(name) {
    return dropDowns[name].elements;
  },

  getFunc(name, funcName) {
    return dropDowns[name].func[funcName];
  },

  getCurrentFunc(name) {
    return dropDowns[name].func[dropDowns[name].current];
  },

  names: names
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case Constants.DROP_DOWN_SELECT:
      setCurrent(action.name, action.value);
      dropDownsStore.emitChange();
      break;


    default:
      break;
  }
});

export default dropDownsStore;