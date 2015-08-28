import fmt from 'rssi';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/Slider';
import assign from 'object-assign';
import globalExport from '../constants/global_export.js';
import keyMirror from 'keymirror';
import _ from 'lodash';

var CHANGE_EVENT = 'change';

var _sliders = {};
_sliders.foundersShare = {
  name: 'foundersShare',
  start: 0,
  min: 0,
  max: 100,
  step: 1,
  label: fmt('Мин. % учредителя: #{number}%')
};
_sliders.maxLinksNumber = {
  name: 'maxLinksNumber',
  start: 50,
  step: 1,
  min: 1,
  max: 500,
  label: fmt('Макс. число связей: #{number}')
};
_sliders.linkLength = {
  min: 20,
  max: 500,
  step: 5,
  start: 150,
  name: 'linkLength',
  label: fmt('Длина линии: #{number}')
};

var setValue = function (name, value) {
  _sliders[name].value = value;
};

var SlidersStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
    return _sliders;
  },

  getNames: function () {
    var names = {};
    for (let name in _sliders) {
      if (!_sliders.hasOwnProperty(name)) continue;
      names[name] = null;
    }

    return keyMirror(names);
  },

  getValue: function (name) {
    var value = _sliders[name].value;
    if (value !== undefined && value !== null) {
      return value;
    }

    return _sliders[name].start;
  },

  getSlider: function (name) {
    return _sliders[name];
  }
});

SlidersStore[Symbol.iterator] = () => {

  var names = _.keys(SlidersStore.getNames());

  var index = 0;

  return {
    next() {

      if (index >= names.length) {
        return {
          done: true
        }
      }

      return {
        value: _sliders[names[index++]]
      };
    }
  };
};

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case Constants.SLIDER_SET:
      setValue(action.name, action.value);
      SlidersStore.emitChange();
      break;

    default:
      break;
  }
});

globalExport(SlidersStore, 'stores.sliders');
export default SlidersStore;