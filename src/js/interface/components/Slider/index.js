import React from 'react';
import noUiSlider from 'nouislider';
import Actions from '../../actions/Slider';
import SlidersStore from '../../stores/Sliders';

class Slider extends React.Component {

  state = {
    slider: {
      get: () => 0
    },

    label: SlidersStore.getSlider(SlidersStore.names.pointPosition).label
  };

  bindSlider(slider) {
    noUiSlider.create(slider, {
      start: SlidersStore.getSlider(SlidersStore.names.pointPosition).start,
      step: SlidersStore.getSlider(SlidersStore.names.pointPosition).step,
      connect: 'lower',
      range: {
        min: SlidersStore.getSlider(SlidersStore.names.pointPosition).min,
        max: SlidersStore.getSlider(SlidersStore.names.pointPosition).max
      },
      format: {
        to: function ( value ) {
          return parseFloat(value).toFixed(4) - 0;
        },
        from: function ( value ) {
          return parseFloat(value).toFixed(4) - 0;
        }
      }
    });

    slider.noUiSlider.on('slide', () => {
      let value = slider.noUiSlider.get();
      this.setState({
        number: value
      });
      Actions.slide(this.props.name, value);
    });

    slider.noUiSlider.on('set', () => {
      let value = slider.noUiSlider.get();
      this.setState({
        number: value
      });
      if (slider.noUiSlider.wereSetManually) {
        delete slider.noUiSlider.wereSetManually;
        return;
      }
      Actions.set(this.props.name, slider.noUiSlider.get());
    });

    return slider.noUiSlider;
  }

  componentDidMount() {
    var slider = this.bindSlider(React.findDOMNode(this).querySelector('.slider__element'));

    SlidersStore.addButtonListener(() => {

      if (this.props.name === SlidersStore.names.pointPosition) {
        slider.wereSetManually = true;
        slider.set(SlidersStore.getValue(SlidersStore.names.pointPosition));
      }
    });

    SlidersStore.addZoomListener(() => {
      slider.destroy();
      SlidersStore.getSlider(SlidersStore.names.pointPosition).start = parseFloat(slider.get());
      slider = this.bindSlider(React.findDOMNode(this).querySelector('.slider__element'));
      this.setState({
        number: slider.get()
      });
    });

    SlidersStore.addDropDownListener(() => {
      slider.destroy();
      slider = this.bindSlider(React.findDOMNode(this).querySelector('.slider__element'));
      this.setState({
        number: slider.get()
      });
    });

    this.setState({
      number: slider.get()
    });
  }

  render() {

    return (
      <div className='slider'>
        <span
          className='slider__name'>
          {this.state.label({number: this.state.number})}
        </span>

        <div className='slider__element'></div>
      </div>
    );
  }
}

export default Slider;