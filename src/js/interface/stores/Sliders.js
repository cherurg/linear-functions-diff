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


const initialButtonStep = 0.05;
const initialSlideStep = 0.01;

let _slidersInitial = {
  [names.pointPosition]: {
    start: (GraphConstants.RIGHT_BORDER + GraphConstants.LEFT_BORDER) / 2,
    min: GraphConstants.LEFT_BORDER,
    max: GraphConstants.RIGHT_BORDER,
    slideStep: initialSlideStep,
    buttonStep: initialButtonStep,
    factor: 4/6,
    label: fmt('Положение точки: #{number}')
  }
};

var _sliders = _.cloneDeep(_slidersInitial);

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

  addZoomListener(cb) {
    this.on('zoom', cb);
  },

  addDropDownListener(cb) {
    this.on('dropDown', cb);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  emitButton: function () {
    this.emit('button');
  },

  emitZoom() {
    this.emit('zoom');
  },

  emitDropDown() {
    this.emit('dropDown');
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

AppDispatcher.register(function (action) {
  let zoom = require('../../graphs/zoom');
  switch (action.actionType) {
    case Constants.SLIDER_SET:
      setValue(action.name, action.value);
      SlidersStore.emitChange();
      break;

    case ButtonConstants.BUTTON_CLICK:
      if (ButtonConstants.SLIDER_PLUS === action.name) {
        setValue(names.pointPosition, parseFloat(SlidersStore.getValue(names.pointPosition)) + _sliders[names.pointPosition].buttonStep);
        SlidersStore.emitButton();

      } else if (ButtonConstants.SLIDER_MINUS === action.name) {
        setValue(names.pointPosition, parseFloat(SlidersStore.getValue(names.pointPosition)) - _sliders[names.pointPosition].buttonStep);
        SlidersStore.emitButton();

      }
      break;

      case Constants.ZOOM_UPDATED:
        _sliders[names.pointPosition].slideStep = zoom.getXRange() / 500;
        _sliders[names.pointPosition].buttonStep = zoom.getXRange() / 100;
        _sliders[names.pointPosition].min = zoom.getLeft();
        _sliders[names.pointPosition].max = zoom.getRight();
        SlidersStore.emitZoom();

      break;

    case DropDownConstants.DROP_DOWN_SELECT:
      if (action.name === DropDownsStore.names.functions) {
        _sliders = _.cloneDeep(_slidersInitial);
        SlidersStore.emitDropDown();
      }
      break;

    default:
      break;
  }
});

export default SlidersStore;