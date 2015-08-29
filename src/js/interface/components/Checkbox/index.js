import React from 'react';
import AppDispatcher from '../../dispatcher';
import CheckboxActions from '../../actions/Checkbox';
import Store from '../../stores/Checkboxes';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    Store.addChangeListener(() => this.setState(Store.getAll()[this.props.name]))
  }

  state = Store.getAll()[this.props.name];

  onChange = () => {
    CheckboxActions.toggle(this.props.name);
  };

  render() {
    let id = 'checkbox' + this.props.name;

    return (
      <form action="#">
        <input
          type="checkbox"
          id={id}
          onChange={this.onChange}
          checked={this.state.isChecked}/>
        <label htmlFor={id}>
          {this.props.children}
        </label>
      </form>
    );
  }
}

export default Checkbox;