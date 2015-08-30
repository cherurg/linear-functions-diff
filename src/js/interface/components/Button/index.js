import React from 'react';
import AppDispatcher from '../../dispatcher';
import Actions from '../../actions/button';

class Button extends React.Component {
  onClick = () => {
    Actions.click(this.props.name);
  };

  render() {
    return (
      <div style={this.props.style}
           className={this.props.className}
           onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default Button;