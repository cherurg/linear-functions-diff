import fmt from 'rssi';
import AppDispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/Slider';
import assign from 'object-assign';
import globalExport from '../constants/global_export.js';
import keyMirror from 'keymirror';
import _ from 'lodash';
import SliderConstants from '../constants/Slider';
import GraphConstants from '../../constants';
import ButtonConstants from '../constants/button';
import DropDownsStore from './DropDowns';
import DropDownConstants from '../constants/DropDown';

var CHANGE_EVENT = 'change';

let names = keyMirror({
  pointPosition: null
});

var _sliders = {
  [names.pointPosition]: {
    start: (GraphConstants.RIGHT_BORDER + GraphConstants.LEFT_BORDER) / 2,
    min: GraphConstants.LEFT_BORDER,
    max: GraphConstants.RIGHT_BORDER,
    step: 0.01,
    label: fmt('Положение точки: #{number}')
  }
};

var setValue = function (name, value) {
  _sliders[name].value = value;
};

var SlidersStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  addButtonListener(cb) {
    this.on('button', cb);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  emitButton: function () {
    this.emit('button');
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
  },

  names: names
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

let move = 0.01;
let factor = 4/5;
AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case Constants.SLIDER_SET:
      setValue(action.name, action.value);
      SlidersStore.emitChange();
      break;

    case ButtonConstants.BUTTON_CLICK:
      if (ButtonConstants.SLIDER_PLUS === action.name) {
        setValue(names.pointPosition, parseFloat(SlidersStore.getValue(names.pointPosition)) + move);
        SlidersStore.emitButton();

      } else if (ButtonConstants.SLIDER_MINUS === action.name) {
        setValue(names.pointPosition, parseFloat(SlidersStore.getValue(names.pointPosition)) - move);
        SlidersStore.emitButton();

      } else if (ButtonConstants.ZOOM_IN === action.name) {
        move *= factor;

      } else if (ButtonConstants.ZOOM_OUT === action.name) {
        move /= factor;

      } else if (ButtonConstants.ZOOM_FULL_OUT === action.name) {
        move = 0.01;
      }
      break;

    case DropDownConstants.DROP_DOWN_SELECT:
      if (action.name === DropDownsStore.names.functions) {
        move = 0.01;
      }

    default:
      break;
  }
});

export default SlidersStore;