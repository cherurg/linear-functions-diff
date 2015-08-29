import React from 'react';
import fmt from 'rssi';
import Slider from '../Slider'
import GraphConstants from '../../../constants';
import SlidersStore from '../../stores/Sliders';

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
      </div>
    );
  }
}

/*        <div className="zoom-buttons" style={{marginRight: '30px'}}>
 <button className="btn waves-effect waves-light indigo lighten-1" style={{}}>-</button>
 <button className="btn waves-effect waves-light indigo lighten-1" style={{marginLeft: '0.5em'}}>+</button>
 </div>*/

export default LeftBottom;