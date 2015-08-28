import React from 'react';
import noUiSlider from 'nouislider';
import Actions from '../../actions/Slider';

var getFormatted = function (number) {
  var len = number.toString().length;
  return number.toString().slice(0, len);
};

var bindSlider = function (slider) {
  noUiSlider.create(slider, {
    start: this.props.start,
    step: this.props.step,
    connect: 'lower',
    range: {
      min: this.props.min,
      max: this.props.max
    }
  });

  slider.noUiSlider.on('slide', () => {
    this.setState({
      number: getFormatted(slider.noUiSlider.get())
    });
  });

  slider.noUiSlider.on('set', () => {
    Actions.set(this.props.name, getFormatted(slider.noUiSlider.get()));
  });

  return slider.noUiSlider;
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: {
        get: () => 0
      }
    };
  }

  componentDidMount() {
    var slider = bindSlider.call(this, React.findDOMNode(this)
      .querySelector('.slider__element'));

    this.setState({
      number: getFormatted(slider.get())
    });
  }

  render() {

    return (
      <div className='slider'>
        <span
          className='slider__name'>
          {this.props.label({number: this.state.number})}
        </span>

        <div className='slider__element'></div>
      </div>
    );
  }
}

export default Slider;