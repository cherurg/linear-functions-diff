import React from 'react';
import Store from '../../stores/DropDowns';
import Actions from '../../actions/DropDown';

class DropDown extends React.Component {
  state = {
    current: Store.getCurrent(this.props.name),
    elements: Store.getElements(this.props.name)
  };

  constructor(props) {
    super(props);
    Store.addChangeListener(() => {
      this.setState({
        current: Store.getCurrent(this.props.name),
        elements: Store.getElements(this.props.name)
      });
    });
  }

  componentDidMount() {
    jQuery('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false // Displays dropdown below the button
      }
    );
  }

  onClick(element) {
    Actions.select(this.props.name, element);
  }

  render() {
    return (
      <div>
        <a className='dropdown-button btn-flat' href='#' style={{color: 'black', backgroundColor: 'gainsboro', opacity: 0.7}} data-activates='dropdown1'>Выбрать функцию</a>
        <ul id='dropdown1' className='dropdown-content'>
          {
            this.state.elements.map((el, i) => {
              return (<li
                  key={i}
                  onClick={this.onClick.bind(this, el)}
                  className={el === this.state.current ? 'indigo lighten-4' : ''}>
                  {el}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default DropDown;