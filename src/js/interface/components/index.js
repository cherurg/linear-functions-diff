import React from 'react';
import Slider from './Slider'
import fmt from 'rssi';
import GraphConstants from '../../constants';
import SliderConstants from '../constants/Slider';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="over-grid">
          <div className="grid"></div>
          <div className="grid"></div>
        </div>
        <div className="graphs over-grid">
          <div id="left-plotter" className="grid"/>
          <div id="right-plotter" className="grid"/>
        </div>
        <div className="over-grid">
          <div className="grid">
            <Slider
              {...{
                name: SliderConstants.names.pointPosition,
                start: (GraphConstants.RIGHT_BORDER + GraphConstants.LEFT_BORDER) / 2,
                min: GraphConstants.LEFT_BORDER,
                max: GraphConstants.RIGHT_BORDER,
                step: 0.01,
                label: fmt('Положение точки: #{number}')
              }}/>
          </div>
          <div className="grid"></div>
        </div>
      </div>
    );
  }
}

export default App;