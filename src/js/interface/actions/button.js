import AppDispatcher from '../dispatcher';
import ActionConstants from '../constants/button';

var ButtonActions = {
  click: (name) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.BUTTON_CLICK,
      name: name
    });
  }
};

export default ButtonActions;