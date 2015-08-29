import React from 'react';
import fmt from 'rssi';
import Slider from '../Slider'
import GraphConstants from '../../../constants';
import SliderConstants from '../../constants/Slider';

class LeftBottom extends React.Component {
  render() {
    return (
      <Slider {...{
          name: SliderConstants.names.pointPosition,
          start: (GraphConstants.RIGHT_BORDER + GraphConstants.LEFT_BORDER) / 2,
          min: GraphConstants.LEFT_BORDER,
          max: GraphConstants.RIGHT_BORDER,
          step: 0.01,
          label: fmt('Положение точки: #{number}')
        }}/>
    );
  }
}

export default LeftBottom;