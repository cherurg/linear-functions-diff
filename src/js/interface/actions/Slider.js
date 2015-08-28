import AppDispatcher from '../dispatcher';
import Constants from '../constants/Slider';

export default {
  set: (name, value) => {
    AppDispatcher.dispatch({
      actionType: Constants.SLIDER_SET,
      name: name,
      value: value
    });
  }
};