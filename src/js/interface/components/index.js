import React from 'react';
import Slider from './Slider'
import fmt from 'rssi';
import constants from '../../constants';

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
                name: 'pointPosition',
                start: (constants.RIGHT_BORDER + constants.LEFT_BORDER) / 2,
                min: constants.LEFT_BORDER,
                max: constants.RIGHT_BORDER,
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