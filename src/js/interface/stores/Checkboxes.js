import AppDispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import ActionConstants from '../constants/Checkbox';
import assign from 'object-assign';
import keyMirror from 'keymirror';

var CHANGE_EVENT = 'change';

let names = keyMirror({
  EnableDashedLine: null,
  ZoomGraphs: null
});

let _checkboxes = {
  [names.EnableDashedLine]: {
    isChecked: false
  },

  [names.ZoomGraphs]: {
    isChecked: false
  }
};

var toggle = (name) => {
  _checkboxes[name].isChecked = !_checkboxes[name].isChecked;
};

var CheckboxesStore = assign({}, EventEmitter.prototype, {
  isChecked: (name) => {
    return _checkboxes[name].isChecked;
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: () => {
    return _checkboxes;
  },

  getNames: () => {
    var names = {};
    for (let name in _checkboxes) {
      if (!_checkboxes.hasOwnProperty(name)) continue;
      names[name] = null;
    }

    return keyMirror(names);
  },

  at: (name) => {
    return _checkboxes[name];
  },

  names: names
});

CheckboxesStore[Symbol.iterator] = () => {

  var names = _.keys(CheckboxesStore.getNames());

  var index = 0;

  return {
    next() {

      if (index >= names.length) {
        return {
          done: true
        }
      }

      return {
        value: _checkboxes[names[index++]]
      };
    }
  };
};

AppDispatcher.register((action) => {

  switch (action.actionType) {
    case ActionConstants.CHECKBOX_TOGGLE:
      toggle(action.name);
      CheckboxesStore.emitChange();
      break;

    default:
      break;
  }

});

export default CheckboxesStore;


