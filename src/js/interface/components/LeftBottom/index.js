import React from 'react';
import fmt from 'rssi';
import Slider from '../Slider'
import GraphConstants from '../../../constants';
import SlidersStore from '../../stores/Sliders';
import Button from '../Button';
import ButtonConstants from '../../constants/button';

class LeftBottom extends React.Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <Slider {...{
          name: SlidersStore.names.pointPosition,
          start: (GraphConstants.RIGHT_BORDER + GraphConstants.LEFT_BORDER) / 2,
          min: GraphConstants.LEFT_BORDER,
          max: GraphConstants.RIGHT_BORDER,
          step: 0.01,
          label: fmt('Положение точки: #{number}')
        }}/>

        <div className="slider-buttons" style={{marginRight: '30px'}}>
          <Button
            className="btn-flat waves-effect"
            style={{color: 'black', backgroundColor: 'gainsboro', opacity: 0.7, borderRadius: '5px'}}
            name={ButtonConstants.SLIDER_MINUS}>
            -
          </Button>
          <Button
            className="btn-flat waves-effect"
            style={{marginLeft: '0.5em', color: 'black', backgroundColor: 'gainsboro', opacity: 0.7, borderRadius: '5px'}}
            name={ButtonConstants.SLIDER_PLUS}>
            +
          </Button>
        </div>
      </div>

    );
  }
}

export default LeftBottom;