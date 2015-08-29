import AppDispatcher from '../dispatcher';
import ActionConstants from '../constants/Checkbox';

var CheckboxActions = {
  toggle: (name) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.CHECKBOX_TOGGLE,
      name: name
    });
  }
};

export default CheckboxActions;