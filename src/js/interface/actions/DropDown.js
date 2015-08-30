import AppDispatcher from '../dispatcher';
import ActionConstants from '../constants/DropDown';

let DropDownActions = {
  select(name, value) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.DROP_DOWN_SELECT,
      name: name,
      value: value
    });
  }
};

export default DropDownActions